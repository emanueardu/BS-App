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
        <title>Servicios | SUR INGENIERÍA</title>
        <meta
          name="description"
          content="Servicios eléctricos, domóticos y de seguridad con seguimiento premium."
        />
      </Head>

      <section className="space-y-10 rounded-3xl bg-brand-surface/60 backdrop-blur-sm p-8 shadow-sm shadow-brand-sand">
        <div className="space-y-3 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-copper">
            Servicios
          </p>
          <h1 className="text-3xl font-semibold text-brand-text">
            Instalaciones eléctricas, domótica y sistemas inteligentes a medida.
          </h1>
          <p className="text-base text-brand-text-muted">
            Ejecutamos cada etapa con documentación actualizada, materiales certificados y seguimiento digital para
            que tengas visibilidad completa del avance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
            className="flex flex-col overflow-hidden rounded-3xl border border-white/30 bg-brand-navy/80 text-brand-text-on-dark shadow-lg transition hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm"
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
                  <p className="max-w-xs text-xs font-semibold uppercase tracking-widest text-brand-sand">
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
                  className="rounded-full bg-brand-surface/80 px-4 py-2 text-sm font-semibold text-brand-text transition hover:bg-brand-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sand"
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
            className="rounded-3xl border border-brand-border bg-brand-surface/60 p-6 shadow-sm backdrop-blur-sm"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-wide text-brand-copper">
                    {service.subtitle}
                  </p>
                  <h2 className="text-2xl font-semibold text-brand-text">{service.title}</h2>
                  <p className="text-base text-brand-text-muted">{service.description}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contacto"
                    aria-label={`Consultar por ${service.title}`}
                    className="inline-flex items-center justify-center rounded-full border border-brand-navy px-5 py-3 text-sm font-semibold text-brand-text transition hover:bg-brand-navy hover:text-brand-text-on-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sand"
                  >
                    Consultar
                  </Link>
                  <Link
                    href={`/servicios/${service.slug}`}
                    aria-label={`Ver más detalles de ${service.title}`}
                    className="inline-flex items-center justify-center rounded-full bg-brand-copper px-5 py-3 text-sm font-semibold text-brand-text-on-dark transition hover:bg-brand-copper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sand"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-brand-text-muted sm:grid-cols-2 lg:grid-cols-3">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span aria-hidden className="text-brand-copper">
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
