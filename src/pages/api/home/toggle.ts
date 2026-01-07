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

type ToggleRequest = {
  deviceId?: string;
  nextState?: boolean;
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

  const { deviceId, nextState, homeId } = req.body as ToggleRequest;
  if (!deviceId || typeof nextState !== "boolean") {
    return res.status(400).json({
      error: "deviceId and nextState (boolean) are required",
    });
  }

  const { data: deviceRow, error: deviceError } = await adminClient
    .from("devices")
    .select("id,home_id,room_id,is_on,last_changed_at")
    .eq("id", deviceId)
    .single();

  if (deviceError || !deviceRow) {
    return res.status(404).json({ error: "Device not found" });
  }

  if (homeId && String(deviceRow.home_id) !== homeId) {
    return res.status(403).json({ error: "Device does not belong to this home" });
  }

  const { data: homeRow } = await adminClient
    .from("homes")
    .select("id,owner_user_id")
    .eq("id", deviceRow.home_id)
    .single();

  if (homeRow && homeRow.owner_user_id && homeRow.owner_user_id !== user.id) {
    return res.status(403).json({ error: "Device not owned by this user" });
  }

  const { data: updated, error: updateError } = await adminClient
    .from("devices")
    .update({
      is_on: nextState,
      last_changed_at: new Date().toISOString(),
    })
    .eq("id", deviceId)
    .select(
      "id,home_id,room_id,type,name,position,is_on,last_changed_at"
    )
    .single();

  if (updateError || !updated) {
    return res.status(500).json({ error: updateError?.message ?? "Update failed" });
  }

  return res.status(200).json({ device: updated });
}
