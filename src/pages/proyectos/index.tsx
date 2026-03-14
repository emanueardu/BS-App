import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { projects, SHOW_PROJECTS_SECTION } from "@/data/site";
import { openVoltiChat } from "@/utils/volti";

const categories = ["Todos", "Electrica", "Domótica", "Seguridad", "Automatizacion"] as const;

export default function Proyectos() {
  return (
    <>
      <Head>
        <title>Proyectos | SUR INGENIERÍA</title>
      </Head>
      <section className="rounded-3xl bg-brand-surface/60 p-8 shadow-sm shadow-brand-sand backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-copper">
          Proyectos
        </p>
        <h1 className="text-3xl font-semibold text-brand-text">
          Obras destacadas y casos de referencia.
        </h1>
        <p className="text-sm text-brand-text-muted">
          Seguridad, prolijidad y documentaciÃ³n. Si no estamos orgullosos, no lo entregamos.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contacto"
            className="rounded-full bg-brand-copper px-5 py-2 text-sm font-semibold text-brand-text-on-dark transition hover:bg-brand-copper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sand"
          >
            Pedir relevamiento
          </Link>
          <button
            onClick={openVoltiChat}
            className="rounded-full border border-brand-navy px-5 py-2 text-sm font-semibold text-brand-text transition hover:bg-brand-navy hover:text-brand-text-on-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sand"
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
              className="rounded-full border border-brand-border bg-brand-surface/50 px-3 py-1 text-xs font-semibold text-brand-text-muted backdrop-blur-sm"
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
              className="rounded-2xl border border-brand-border bg-brand-surface/60 p-4 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-sand"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-copper">
                <span>{project.category}</span>
              </div>
              <p className="mt-2 text-lg font-semibold text-brand-text">
                {project.title}
              </p>
              <p className="text-sm text-brand-text-muted">{project.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-brand-bg-alt px-2 py-1 text-xs text-brand-text-muted"
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

export const getServerSideProps: GetServerSideProps = async () => {
  if (!SHOW_PROJECTS_SECTION) {
    return { notFound: true };
  }

  return { props: {} };
};
