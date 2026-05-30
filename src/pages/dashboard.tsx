import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { supabase } from "@/lib/supabaseClient";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  status: "En ejecucion" | "Finalizado" | "Planificado" | string;
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
    name: "Obra domotica - Casa Martinez",
    status: "En ejecucion",
    progress: 68,
    next_visit: "Martes 10:00",
  },
  {
    id: "demo-2",
    name: "Tablero BT - oficinas zona norte",
    status: "Planificado",
    progress: 25,
    next_visit: "A coordinar",
  },
];

const statusClass = (status: string) => {
  switch (status) {
    case "En ejecucion":
      return "status-pill status-pill-climate";
    case "Finalizado":
      return "status-pill status-pill-on";
    default:
      return "status-pill status-pill-neutral";
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
            status: item.status ?? "En ejecucion",
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
        <title>Dashboard | SUR INGENIERIA</title>
      </Head>
      <div className="space-y-6 pt-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Tus proyectos</p>
            <h1 className="mt-2 text-3xl font-semibold text-brand-text">
              Seguimiento de obra
            </h1>
            <p className="mt-2 text-sm text-brand-text-muted">
              Accede a presupuestos, avance y documentos de cada obra.
            </p>
          </div>
          <Link href="/contacto" className="btn btn-outline">
            Agendar visita
          </Link>
        </div>

        {error ? (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}

        {fetching || loading ? (
          <p className="text-sm text-brand-text-muted">Cargando tus proyectos...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/proyecto/${project.id}`}
                className="surface-card block p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-brand-text">{project.name}</p>
                    <p className="mt-1 text-sm text-brand-text-muted">
                      Proxima visita: {project.next_visit ?? "A coordinar"}
                    </p>
                  </div>
                  <span className={statusClass(project.status)}>{project.status}</span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-brand-bg-alt">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-brand-copper to-brand-energy"
                    style={{ width: `${Math.min(project.progress, 100)}%` }}
                  />
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm text-brand-text-muted">
                  <span className="font-semibold text-brand-text">
                    Avance {Math.min(project.progress, 100)}%
                  </span>
                  <span className="text-brand-copper">Ver detalle</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
