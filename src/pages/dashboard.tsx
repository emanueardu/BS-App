import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { supabase } from "@/lib/supabaseClient";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  status: "En ejecución" | "Finalizado" | "Planificado" | string;
  progress: number;
  next_visit?: string | null;
};

type ProjectRow = {
  id: string | number;
  name?: string | null;
  status?: string | null;
  progress?: number | null;
  next_visit?: string | null;
};

const fallbackProjects: Project[] = [
  {
    id: "demo-1",
    name: "Obra domótica - Casa Martínez",
    status: "En ejecución",
    progress: 68,
    next_visit: "Martes 10:00",
  },
  {
    id: "demo-2",
    name: "Oficinas zona norte - Tablero BT",
    status: "Planificado",
    progress: 25,
    next_visit: "A coordinar",
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case "En ejecución":
      return "bg-brand-sand text-brand-blue";
    case "Finalizado":
      return "bg-emerald-100 text-emerald-800";
    default:
      return "bg-brand-bg-alt text-brand-text";
  }
};

export default function Dashboard() {
  const { user, loading } = useProtectedRoute();
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;
      setFetching(true);
      const { data, error: queryError } = await supabase
        .from("projects")
        .select("id,name,status,progress,next_visit")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (queryError) {
        console.warn("Using demo projects:", queryError.message);
        setError("No pudimos cargar tus proyectos, mostramos datos de ejemplo.");
      } else if (data && data.length > 0) {
        setProjects(
          (data as ProjectRow[]).map((item) => ({
            id: String(item.id),
            name: item.name ?? "Proyecto",
            status: item.status ?? "En ejecución",
            progress: Number(item.progress ?? 0),
            next_visit: item.next_visit ?? "A coordinar",
          }))
        );
      }

      setFetching(false);
    };

    fetchProjects();
  }, [user]);

  return (
    <>
      <Head>
        <title>Dashboard | SUR INGENIERÍA</title>
      </Head>
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-copper">
              Tus proyectos
            </p>
            <h1 className="text-3xl font-semibold text-brand-text">
              Seguimiento de obra
            </h1>
            <p className="text-sm text-brand-text-muted">
              Accede a presupuestos, avance y documentos de cada obra.
            </p>
          </div>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-full border border-brand-navy bg-brand-surface/60 px-4 py-2 text-sm font-semibold text-brand-text backdrop-blur-sm transition hover:bg-brand-navy hover:text-brand-text-on-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sand"
          >
            Agendar visita
          </Link>
        </div>

        {error && (
          <p className="rounded-lg bg-brand-bg-alt px-3 py-2 text-sm text-brand-copper">
            {error}
          </p>
        )}

        {fetching || loading ? (
          <p className="text-sm text-brand-text-muted">Cargando tus proyectos...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/proyecto/${project.id}`}
                className="group block rounded-2xl border border-brand-border bg-brand-surface/60 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-sand"
              >
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-brand-text">
                    {project.name}
                  </p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(project.status)}`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-brand-text-muted">
                  Próxima visita: {project.next_visit ?? "A coordinar"}
                </p>
                <div className="mt-3 h-2 rounded-full bg-brand-bg-alt">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-brand-copper to-brand-copper-soft"
                    style={{ width: `${Math.min(project.progress, 100)}%` }}
                  />
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm text-brand-text-muted">
                  <span className="font-semibold">
                    Avance {Math.min(project.progress, 100)}%
                  </span>
                  <span className="text-xs text-brand-text-muted group-hover:text-brand-copper">
                    Ver detalle →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
