import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { supabase } from "@/lib/supabaseClient";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ProgressItem = {
  title: string;
  percent: number;
  note?: string | null;
};

type DocumentItem = {
  id: string;
  title: string;
  url: string;
};

type ProjectDetail = {
  id: string;
  name: string;
  status: string;
  progress: number;
  summary?: string | null;
  progress_items?: ProgressItem[];
  documents?: DocumentItem[];
};

type ProjectRow = {
  id: string | number;
  name?: string | null;
  status?: string | null;
  progress?: number | null;
  summary?: string | null;
  user_id?: string;
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

const fallbackProject: ProjectDetail = {
  id: "demo-1",
  name: "Obra domótica - Casa Martínez",
  status: "En ejecución",
  progress: 68,
  summary:
    "Instalación de tablero inteligente, cableado estructurado y configuración de escenas de iluminación.",
  progress_items: [
    { title: "Tableros y protecciones", percent: 80, note: "Falta señalética" },
    { title: "Canalizaciones y tendido", percent: 55, note: "Cableado en curso" },
    { title: "Automatización", percent: 30, note: "Configuración inicial" },
  ],
  documents: [
    { id: "doc-1", title: "Plano eléctrico.pdf", url: "#" },
    { id: "doc-2", title: "Memoria técnica.docx", url: "#" },
  ],
};

export default function ProyectoDetalle() {
  const router = useRouter();
  const { id } = router.query;
  const { user, loading } = useProtectedRoute();
  const [project, setProject] = useState<ProjectDetail>(fallbackProject);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id || typeof id !== "string" || !user) return;
      setFetching(true);
      setError(null);

      const { data, error: projectError } = await supabase
        .from("projects")
        .select("id,name,status,progress,summary")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      const { data: progressData } = await supabase
        .from("progress")
        .select("title,percent,note,project_id")
        .eq("project_id", id)
        .order("created_at", { ascending: true });

      const { data: documentsData } = await supabase
        .from("documents")
        .select("id,title,url,project_id")
        .eq("project_id", id)
        .order("created_at", { ascending: false });

      if (projectError) {
        console.warn("Using fallback project:", projectError.message);
        setError("No pudimos obtener el proyecto, mostramos un ejemplo.");
      } else if (data) {
        setProject({
          id: String((data as ProjectRow).id),
          name: (data as ProjectRow).name ?? "Proyecto",
          status: (data as ProjectRow).status ?? "En ejecución",
          progress: Number((data as ProjectRow).progress ?? 0),
          summary: (data as ProjectRow).summary ?? "",
          progress_items: (progressData as ProgressRow[] | null)?.map((item) => ({
            title: item.title ?? "Etapa",
            percent: Number(item.percent ?? 0),
            note: item.note ?? "",
          })),
          documents: (documentsData as DocumentRow[] | null)?.map((doc) => ({
            id: String(doc.id ?? ""),
            title: doc.title ?? "Documento",
            url: doc.url ?? "#",
          })),
        });
      }
      setFetching(false);
    };

    fetchProject();
  }, [id, user]);

  return (
    <>
      <Head>
        <title>Proyecto | BS</title>
      </Head>

      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
              Proyecto
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              {project.name}
            </h1>
            <p className="text-sm text-slate-600">
              Estado: {project.status} · Avance {project.progress}%
            </p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-orange-200 hover:text-orange-700"
          >
            ← Volver al dashboard
          </Link>
        </div>

        {error && (
          <p className="rounded-lg bg-orange-50 px-3 py-2 text-sm text-orange-700">
            {error}
          </p>
        )}

        {fetching || loading ? (
          <p className="text-sm text-slate-600">Cargando proyecto...</p>
        ) : (
          <>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="h-3 w-full rounded-full bg-slate-100">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                  style={{ width: `${Math.min(project.progress, 100)}%` }}
                />
              </div>
              {project.summary && (
                <p className="mt-4 text-sm text-slate-700">{project.summary}</p>
              )}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Avance por etapas
                  </h2>
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                    Checklist
                  </span>
                </div>
                <div className="space-y-3">
                  {(project.progress_items ?? fallbackProject.progress_items).map(
                    (item) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                      >
                        <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
                          <span>{item.title}</span>
                          <span>{Math.min(item.percent, 100)}%</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-white">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                            style={{ width: `${Math.min(item.percent, 100)}%` }}
                          />
                        </div>
                        {item.note && (
                          <p className="mt-2 text-xs text-slate-600">
                            {item.note}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Documentos
                  </h2>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    Storage
                  </span>
                </div>
                <div className="space-y-3">
                  {(project.documents ?? fallbackProject.documents)?.map(
                    (doc) => (
                      <a
                        key={doc.id}
                        href={doc.url}
                        className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-orange-200 hover:text-orange-700"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {doc.title}
                        <span className="text-xs text-orange-600">Descargar</span>
                      </a>
                    )
                  )}
                  {!project.documents && (
                    <p className="text-sm text-slate-600">
                      Carga documentos desde el panel de administración o arrastra
                      archivos al Storage de Supabase.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
