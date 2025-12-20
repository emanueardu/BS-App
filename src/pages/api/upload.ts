import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { Buffer } from "node:buffer";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const serverClient =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!serverClient) {
    return res.status(500).json({
      error:
        "Missing Supabase credentials. Add SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL.",
    });
  }

  const { fileName, file, projectId } = req.body as {
    fileName?: string;
    file?: string; // base64
    projectId?: string;
  };

  if (!fileName || !file) {
    return res.status(400).json({ error: "fileName y file son requeridos" });
  }

  const buffer = Buffer.from(file, "base64");
  const path = `${projectId ?? "general"}/${Date.now()}-${fileName}`;

  const { data, error } = await serverClient.storage
    .from("documents")
    .upload(path, buffer, {
      contentType: req.headers["content-type"]?.toString() || "application/octet-stream",
      upsert: false,
    });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const publicUrl =
    serverClient.storage.from("documents").getPublicUrl(path).data.publicUrl;

  return res.status(200).json({ path: data?.path, publicUrl });
}
