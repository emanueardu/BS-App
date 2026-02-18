import Head from "next/head";
import Link from "next/link";
import { projects } from "@/data/site";
import { openVoltiChat } from "@/utils/volti";

const categories = ["Todos", "Electrica", "Domotica", "Seguridad", "Automatizacion"] as const;

export default function Proyectos() {
  return (
    <>
      <Head>
        <title>Proyectos | BS</title>
      </Head>
      <section className="rounded-3xl bg-white/60 p-8 shadow-sm shadow-orange-100 backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          Proyectos
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Obras destacadas y casos de referencia.
        </h1>
        <p className="text-sm text-slate-600">
          Seguridad, prolijidad y documentación. Si no estamos orgullosos, no lo entregamos.
        </p>
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

      <section className="mt-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-slate-300 bg-white/50 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur-sm"
            >
              {cat}
            </span>
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/proyectos/${project.id}`}
              className="rounded-2xl border border-slate-300 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-100"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-orange-600">
                <span>{project.category}</span>
              </div>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {project.title}
              </p>
              <p className="text-sm text-slate-600">{project.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
