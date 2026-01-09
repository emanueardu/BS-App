import { isInternalUser } from "@/utils/auth";
import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

const adminClient =
  supabaseUrl && supabaseServiceRole
    ? createClient(supabaseUrl, supabaseServiceRole)
    : null;

const buildAuthedClient = (accessToken: string) =>
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: `Bearer ${accessToken}` } },
      })
    : null;

type RoutineRequest = {
  action?: "toggle" | "run";
  routineId?: string;
  status?: "active" | "paused";
  homeId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!adminClient || !supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({
      error: "Supabase credentials missing. Check .env.local.",
    });
  }

  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.replace("Bearer ", "");
  if (!accessToken) {
    return res.status(401).json({ error: "Missing authorization token" });
  }

  const client = buildAuthedClient(accessToken);
  if (!client) {
    return res.status(500).json({ error: "Supabase client not initialized" });
  }

  const { data: userData, error: userError } = await client.auth.getUser(
    accessToken
  );

  if (userError || !userData?.user) {
    return res.status(401).json({ error: "Invalid session" });
  }

  const user = userData.user;
  const isInternal = isInternalUser(user);
  if (!isInternal) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { action, routineId, status, homeId } = req.body as RoutineRequest;
  if (!routineId || !action) {
    return res.status(400).json({ error: "action and routineId are required" });
  }

  const { data: routineRow, error: routineError } = await adminClient
    .from("routines")
    .select("id,home_id,actions,status")
    .eq("id", routineId)
    .single();

  if (routineError || !routineRow) {
    return res.status(404).json({ error: "Routine not found" });
  }

  if (homeId && String(routineRow.home_id) !== homeId) {
    return res.status(403).json({ error: "Routine does not belong to this home" });
  }

  if (action === "toggle") {
    const { data: updated, error: updateError } = await adminClient
      .from("routines")
      .update({
        status: status ?? routineRow.status ?? "active",
      })
      .eq("id", routineId)
      .select("id,home_id,name,description,status,cadence,next_run_at,last_run_at,actions,sort_order")
      .single();

    if (updateError || !updated) {
      return res.status(500).json({ error: updateError?.message ?? "Update failed" });
    }

    return res.status(200).json({ routine: updated });
  }

  if (action === "run") {
    // Apply actions to devices (lights/ac) if configured
    const actions = Array.isArray(routineRow.actions)
      ? (routineRow.actions as Array<{
          rooms?: string[];
          device_types?: string[];
          set_state?: boolean;
        }>)
      : [];

    if (actions.length > 0) {
      // Resolve room ids by slug
      const roomSlugs = Array.from(
        new Set(actions.flatMap((a) => a.rooms || []))
      );

      const { data: rooms } = await adminClient
        .from("rooms")
        .select("id,slug")
        .eq("home_id", routineRow.home_id)
        .in("slug", roomSlugs);

      const roomIdBySlug =
        rooms?.reduce<Record<string, string>>((acc, room) => {
          if (room.slug) acc[String(room.slug)] = String(room.id);
          return acc;
        }, {}) ?? {};

      for (const routineAction of actions) {
        const targetTypes = routineAction.device_types ?? [];
        const targetRoomIds =
          routineAction.rooms?.map((slug) => roomIdBySlug[slug]).filter(Boolean) ??
          [];

        if (targetTypes.length === 0 || targetRoomIds.length === 0) continue;

        await adminClient
          .from("devices")
          .update({
            is_on:
              typeof routineAction.set_state === "boolean"
                ? routineAction.set_state
                : false,
            last_changed_at: new Date().toISOString(),
          })
          .eq("home_id", routineRow.home_id)
          .in("room_id", targetRoomIds)
          .in("type", targetTypes);
      }
    }

    const { data: devices } = await adminClient
      .from("devices")
      .select(
        "id,home_id,room_id,type,name,position,is_on,last_changed_at"
      )
      .eq("home_id", routineRow.home_id);

    const { data: updatedRoutine } = await adminClient
      .from("routines")
      .update({
        last_run_at: new Date().toISOString(),
        next_run_at: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(),
      })
      .eq("id", routineId)
      .select(
        "id,home_id,name,description,status,cadence,next_run_at,last_run_at,actions,sort_order"
      )
      .single();

    return res.status(200).json({
      devices: devices ?? [],
      routines: updatedRoutine ? [updatedRoutine] : undefined,
    });
  }

  return res.status(400).json({ error: "Unknown action" });
}
