import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { projects } from "@/data/site";
import { openVoltiChat } from "@/utils/volti";

const gallery = ["Vista general", "Tablero", "Domotica", "Documentacion"];

export default function ProyectoDetalle() {
  const router = useRouter();
  const { id } = router.query;
  const project = projects.find((p) => p.id === id) ?? projects[0];

  return (
    <>
      <Head>
        <title>{project.title} | BS</title>
      </Head>

      <section className="rounded-3xl bg-white/60 p-8 shadow-sm shadow-orange-100 backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          {project.category}
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          {project.title}
        </h1>
        <p className="text-sm text-slate-600">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-300/70 bg-white/50 px-2 py-1 text-xs text-slate-700 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contacto"
            className="rounded-full bg-orange-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
          >
            Pedir relevamiento
          </Link>
          <button
            onClick={openVoltiChat}
            className="rounded-full border border-slate-900 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
          >
            Hablar con Volti
          </button>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-slate-900">Alcance</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>• Relevamiento y diseño aprobado por el cliente.</li>
            <li>• Ejecución con materiales certificados.</li>
            <li>• Checklist y evidencias cargadas en portal.</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-slate-900">Entregables</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>• Planos y esquemas as-built.</li>
            <li>• Manual de uso y accesos.</li>
            <li>• Certificados / mediciones (si aplica).</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-slate-900">
          Galería (placeholder)
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {gallery.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-dashed border-slate-300 bg-white/50 px-3 py-6 text-center text-sm text-slate-600 backdrop-blur-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
