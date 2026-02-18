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
        <title>Cómo trabajamos | BS</title>
      </Head>
      <section className="rounded-3xl bg-white/60 p-8 shadow-sm shadow-orange-100 backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          Proceso
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Si no se puede hacer bien, no se hace.
        </h1>
        <p className="text-sm text-slate-600">
          Seguridad, calidad, cumplimiento normativo (AEA/IRAM) y documentación
          entregable.
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

      <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.title}
            className="rounded-2xl border border-slate-300 bg-white/60 p-5 shadow-sm backdrop-blur-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
              {getIcon(step.icon)}
            </div>
            <h3 className="mt-3 text-base font-semibold text-slate-900">
              {step.title}
            </h3>
            <p className="text-sm text-slate-600">{step.detail}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Presupuesto claro
          </h2>
          <p className="text-sm text-slate-600">
            Incluimos y excluimos explicitamente materiales, terminaciones y
            alcances para evitar sorpresas.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>• Incluye: materiales certificados, mano de obra, puesta en marcha.</li>
            <li>• Excluye: equipos no aprobados, trabajos sin plano o sin checklist.</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Documentación mínima entregada
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {docs.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
