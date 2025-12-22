import { supabase } from "@/lib/supabaseClient";
import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

type VoltiRequest = {
  message?: string;
  userId?: string;
  projectId?: string;
};

type ProjectRow = {
  id: string | number;
  user_id?: string;
  name?: string | null;
  status?: string | null;
  progress?: number | null;
  next_visit?: string | null;
  summary?: string | null;
};

type ProgressRow = {
  title?: string | null;
  percent?: number | null;
  note?: string | null;
  project_id?: string | number | null;
};

type DocumentRow = {
  id?: string | number;
  title?: string | null;
  url?: string | null;
  project_id?: string | number | null;
};

const openaiApiKey = process.env.OPENAI_API_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const openai = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;

const supabaseServer =
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

  if (!openai) {
    return res
      .status(500)
      .json({ error: "Missing OPENAI_API_KEY in environment." });
  }

  const { message, userId, projectId } = req.body as VoltiRequest;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "message es requerido" });
  }

  // Build project context from Supabase (service key preferred, fallback to anon supabase client)
  const client = supabaseServer ?? supabase;
  let contextText = "";

  if (client && userId) {
    const { data: projects } = await client
      .from("projects")
      .select("id,name,status,progress,next_visit,summary")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (projects && projects.length > 0) {
      const targetProjectId =
        projectId ??
        (projects.length === 1 ? String(projects[0].id) : undefined);

      const summaryList = projects
        .map(
          (p: ProjectRow) =>
            `Proyecto ${p.id}: ${p.name ?? "Sin nombre"} | Estado: ${
              p.status ?? "N/D"
            } | Avance: ${p.progress ?? 0}% | Próxima visita: ${
              p.next_visit ?? "No agendada"
            }${p.summary ? ` | Resumen: ${p.summary}` : ""}`
        )
        .join("\n");

      contextText += `Proyectos del usuario:\n${summaryList}\n`;

      if (targetProjectId) {
        const { data: progressData } = await client
          .from("progress")
          .select("title,percent,note,project_id")
          .eq("project_id", targetProjectId)
          .order("created_at", { ascending: true })
          .limit(20);

        if (progressData && progressData.length > 0) {
          contextText += `\nEtapas del proyecto ${targetProjectId}:\n`;
          contextText += (progressData as ProgressRow[])
            .map(
              (row) =>
                `- ${row.title ?? "Etapa"}: ${row.percent ?? 0}%${
                  row.note ? ` (${row.note})` : ""
                }`
            )
            .join("\n");
        }

        const { data: docsData } = await client
          .from("documents")
          .select("id,title,url,project_id")
          .eq("project_id", targetProjectId)
          .order("created_at", { ascending: false })
          .limit(10);

        if (docsData && docsData.length > 0) {
          contextText += `\nDocumentos del proyecto ${targetProjectId}:\n`;
          contextText += (docsData as DocumentRow[])
            .map(
              (doc) =>
                `- ${doc.title ?? "Documento"} -> ${doc.url ?? "sin URL"}`
            )
            .join("\n");
        }
      }
    }
  }

  const systemPrompt = `
Eres Volti, asistente de BS Electricidad & Domótica.
- Responde en español, breve y accionable.
- Si el usuario pide estado de su obra, usa el contexto de proyectos.
- Si hay links de documentos, invítalo a descargarlos.
- Si no hay datos, responde con cortesía y ofrece conectar con soporte humano.
`;

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    {
      role: "system",
      content: `Contexto de proyectos:\n${contextText || "Sin datos de proyecto."}`,
    },
    { role: "user", content: message },
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.2,
      max_tokens: 300,
    });

    const reply =
      completion.choices[0]?.message?.content ??
      "No pude generar una respuesta en este momento.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Volti error:", error);
    return res
      .status(500)
      .json({ error: "No se pudo responder, intenta más tarde." });
  }
}
