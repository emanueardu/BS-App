import Head from "next/head";
import Link from "next/link";
import { plans } from "@/data/site";
import { openVoltiChat } from "@/utils/volti";

export default function Soporte() {
  return (
    <>
      <Head>
        <title>Planes de soporte | BS</title>
      </Head>
      <section className="rounded-3xl bg-white/90 p-8 shadow-sm shadow-orange-100">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          Planes de soporte
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Essential, Care y Premium. Soporte por portal y Volti.
        </h1>
        <p className="text-sm text-slate-600">
          Respuesta clara, sin prometer lo que no se puede cumplir. Si no se
          puede hacer bien, no se hace.
        </p>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
              {plan.priceHint}
            </p>
            <h2 className="text-xl font-semibold text-slate-900">
              {plan.name}
            </h2>
            <p className="text-sm text-slate-600">
              Respuesta: {plan.response}. Canales: {plan.channels.join(" + ")}.
            </p>
            <div className="mt-3 space-y-1 text-sm text-slate-700">
              <p className="font-semibold">Incluye</p>
              {plan.includes.map((item) => (
                <div key={item}>• {item}</div>
              ))}
            </div>
            <div className="mt-3 space-y-1 text-sm text-slate-700">
              <p className="font-semibold">No incluye</p>
              {plan.excludes.map((item) => (
                <div key={item}>• {item}</div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/contacto"
                className="rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Quiero este plan
              </Link>
              <button
                onClick={openVoltiChat}
                className="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-700"
              >
                Hablar con Volti
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
