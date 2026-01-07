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
      <section className="rounded-3xl bg-white/90 p-8 shadow-sm shadow-orange-100">
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
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
          >
            Ver demo del portal
          </Link>
          <button
            onClick={openVoltiChat}
            className="rounded-full border border-orange-200 px-5 py-2 text-sm font-semibold text-orange-700"
          >
            Hablar con Volti
          </button>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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
