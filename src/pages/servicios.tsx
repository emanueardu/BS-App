import Head from "next/head";
import Link from "next/link";
import { useCallback } from "react";
import { services } from "@/data/services";

const scrollToService = (serviceId: string) => {
  if (typeof document === "undefined") return;
  const target = document.getElementById(serviceId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default function Servicios() {
  const onCardClick = useCallback((id: string) => scrollToService(id), []);

  return (
    <>
      <Head>
        <title>Servicios | BS</title>
        <meta
          name="description"
          content="Servicios eléctricos, domóticos y de seguridad con seguimiento premium."
        />
      </Head>

      <section className="space-y-10 rounded-3xl bg-white/60 backdrop-blur-sm p-8 shadow-sm shadow-orange-100">
        <div className="space-y-3 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
            Servicios
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Instalaciones eléctricas, domótica y sistemas inteligentes a medida.
          </h1>
          <p className="text-base text-slate-700">
            Ejecutamos cada etapa con documentación actualizada, materiales certificados y seguimiento digital para
            que tengas visibilidad completa del avance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
            className="flex flex-col overflow-hidden rounded-3xl border border-white/30 bg-slate-900/80 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm"
            >
              <div
                className="relative h-56 w-full transition duration-300"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.15), rgba(2,6,23,0.85)), url(${service.imageSrc})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  <p className="max-w-xs text-xs font-semibold uppercase tracking-widest text-orange-200">
                    {service.subtitle}
                  </p>
                  <h2 className="text-2xl font-semibold leading-tight">{service.title}</h2>
                </div>
              </div>
              <div className="flex flex-1 items-end justify-start border-t border-white/10 px-5 py-4">
                <button
                  type="button"
                  onClick={() => onCardClick(service.id)}
                  aria-label={`Ver más sobre ${service.title}`}
                  className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
                >
                  Ver más
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="space-y-8">
          {services.map((service) => (
            <article
              key={service.id}
              id={service.id}
            className="rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
                    {service.subtitle}
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-900">{service.title}</h2>
                  <p className="text-base text-slate-600">{service.description}</p>
                </div>
                <Link
                  href="/contacto"
                  aria-label={`Consultar por ${service.title}`}
                  className="inline-flex items-center justify-center rounded-full border border-slate-900 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
                >
                  Consultar
                </Link>
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span aria-hidden className="text-orange-500">
                      •
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
