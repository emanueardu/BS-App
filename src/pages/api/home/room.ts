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

type RoomUpdateRequest = {
  roomId?: string;
  homeId?: string;
  polygon?: Array<{ x: number; y: number }>;
  bbox?: { x: number; y: number; width: number; height: number } | null;
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

  const { roomId, polygon, bbox, homeId } = req.body as RoomUpdateRequest;
  if (!roomId || !Array.isArray(polygon)) {
    return res.status(400).json({ error: "roomId and polygon are required" });
  }

  const { data: roomRow, error: roomError } = await adminClient
    .from("rooms")
    .select("id,home_id")
    .eq("id", roomId)
    .single();

  if (roomError || !roomRow) {
    return res.status(404).json({ error: "Room not found" });
  }

  if (homeId && String(roomRow.home_id) !== homeId) {
    return res.status(403).json({ error: "Room does not belong to this home" });
  }

  const { data: updated, error: updateError } = await adminClient
    .from("rooms")
    .update({
      polygon,
      bbox,
    })
    .eq("id", roomId)
    .select("id,home_id,name,slug,polygon,bbox,plan_asset_url,detail_image_url,sort_order")
    .single();

  if (updateError || !updated) {
    return res.status(500).json({ error: updateError?.message ?? "Update failed" });
  }

  return res.status(200).json({ room: updated });
}
