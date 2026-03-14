import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { projects, SHOW_PROJECTS_SECTION } from "@/data/site";
import { openVoltiChat } from "@/utils/volti";

const gallery = ["Vista general", "Tablero", "Domótica", "Documentacion"];

export default function ProyectoDetalle() {
  const router = useRouter();
  const { id } = router.query;
  const project = projects.find((p) => p.id === id) ?? projects[0];

  return (
    <>
      <Head>
        <title>{project.title} | SUR INGENIERÍA</title>
      </Head>

      <section className="rounded-3xl bg-brand-surface/60 p-8 shadow-sm shadow-brand-sand backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-copper">
          {project.category}
        </p>
        <h1 className="text-3xl font-semibold text-brand-text">
          {project.title}
        </h1>
        <p className="text-sm text-brand-text-muted">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-brand-border/70 bg-brand-surface/50 px-2 py-1 text-xs text-brand-text-muted backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
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

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-brand-border bg-brand-surface/60 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-brand-text">Alcance</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-text-muted">
            <li>• Relevamiento y diseño aprobado por el cliente.</li>
            <li>• Ejecución con materiales certificados.</li>
            <li>• Checklist y evidencias cargadas en portal.</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-brand-border bg-brand-surface/60 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-brand-text">Entregables</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-text-muted">
            <li>• Planos y esquemas as-built.</li>
            <li>• Manual de uso y accesos.</li>
            <li>• Certificados / mediciones (si aplica).</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-brand-border bg-brand-surface/60 p-6 shadow-sm backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-brand-text">
          Galería (placeholder)
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {gallery.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-dashed border-brand-border bg-brand-surface/50 px-3 py-6 text-center text-sm text-brand-text-muted backdrop-blur-sm"
            >
              {item}
            </div>
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
