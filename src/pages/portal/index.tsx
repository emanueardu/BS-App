import Head from "next/head";
import Link from "next/link";
import { portalFeatures } from "@/data/site";
import { openVoltiChat } from "@/utils/volti";

export default function PortalLanding() {
  return (
    <>
      <Head>
        <title>Área Clientes | BS</title>
      </Head>
      <section className="rounded-3xl bg-white/60 p-8 shadow-sm shadow-orange-100 backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          Área Clientes
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Portal con avances, evidencias y documentos en un solo lugar.
        </h1>
        <p className="text-sm text-slate-600">
          Cada cliente sigue su obra por etapas, descarga planos y certificados,
          y abre tickets de soporte. Si no se puede hacer bien, no se hace.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/portal/demo"
            className="rounded-full bg-orange-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
          >
            Ver demo del portal
          </Link>
          <button
            onClick={openVoltiChat}
            className="rounded-full border border-slate-900 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
          >
            Hablar con Volti
          </button>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Qué ve el cliente
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {portalFeatures.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
