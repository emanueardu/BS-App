import Head from "next/head";
import Link from "next/link";
import { steps } from "@/data/site";
import { openVoltiChat } from "@/utils/volti";
import { icons } from "@/data/site";

const getIcon = (name: keyof typeof icons) => {
  const Icon = icons[name];
  return Icon ? <Icon className="h-6 w-6" /> : null;
};

const docs = [
  "Esquema unifilar y cuadro de cargas",
  "Checklist tablero/protecciones",
  "Fotos y as-built",
  "Manual de uso",
];

export default function Proceso() {
  return (
    <>
      <Head>
        <title>CÃ³mo trabajamos | SUR INGENIERÍA</title>
      </Head>
      <section className="rounded-3xl bg-brand-surface/60 p-8 shadow-sm shadow-brand-sand backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-copper">
          Proceso
        </p>
        <h1 className="text-3xl font-semibold text-brand-text">
          Proceso tecnico claro y documentado de principio a fin.
        </h1>
        <p className="text-sm text-brand-text-muted">
          Seguridad, calidad, cumplimiento normativo (AEA/IRAM) y documentaciÃ³n
          entregable.
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

      <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.title}
            className="rounded-2xl border border-brand-border bg-brand-surface/60 p-5 shadow-sm backdrop-blur-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-bg-alt text-brand-copper">
              {getIcon(step.icon)}
            </div>
            <h3 className="mt-3 text-base font-semibold text-brand-text">
              {step.title}
            </h3>
            <p className="text-sm text-brand-text-muted">{step.detail}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-brand-border bg-brand-surface/60 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-brand-text">
            Presupuesto claro
          </h2>
          <p className="text-sm text-brand-text-muted">
            Incluimos y excluimos explicitamente materiales, terminaciones y
            alcances para evitar sorpresas.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-brand-text-muted">
            <li>â€¢ Incluye: materiales certificados, mano de obra, puesta en marcha.</li>
            <li>â€¢ Excluye: equipos no aprobados, trabajos sin plano o sin checklist.</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-brand-border bg-brand-surface/60 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-brand-text">
            DocumentaciÃ³n mÃ­nima entregada
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-text-muted">
            {docs.map((item) => (
              <li key={item}>â€¢ {item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
