import Head from "next/head";
import Link from "next/link";
import { services } from "@/data/site";
import { openVoltiChat } from "@/utils/volti";
import { icons } from "@/data/site";

const getIcon = (name: keyof typeof icons) => {
  const Icon = icons[name];
  return Icon ? <Icon className="h-6 w-6" /> : null;
};

export default function Servicios() {
  return (
    <>
      <Head>
        <title>Servicios | BS</title>
      </Head>
      <section className="rounded-3xl bg-white/90 p-8 shadow-sm shadow-orange-100">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          Servicios
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Instalacion electrica, domotica y seguimiento premium.
        </h1>
        <p className="text-sm text-slate-600">
          Si no se puede hacer bien, no se hace. Cumplimiento AEA/IRAM y
          materiales certificados.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contacto"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
          >
            Pedir relevamiento
          </Link>
          <button
            onClick={openVoltiChat}
            className="rounded-full border border-orange-200 px-5 py-2 text-sm font-semibold text-orange-700"
          >
            Hablar con Volti
          </button>
        </div>
      </section>

      <section className="mt-10 space-y-10">
        {services.map((service) => (
          <div
            key={service.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                {getIcon(service.icon)}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {service.title}
                </h2>
                <p className="text-sm text-slate-600">{service.description}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Para quién es
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  {service.for.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Qué incluye
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  {service.includes.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Qué no incluye
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  {service.excludes.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Entregables
                </p>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  {service.deliverables.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/contacto"
                className="rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Pedir relevamiento
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
