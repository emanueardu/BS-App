import Link from "next/link";
import { Service } from "@/data/services";

type Props = {
  service: Service;
};

export function ServicePageTemplate({ service }: Props) {
  return (
    <div className="space-y-12 px-6 py-10 sm:px-10 lg:px-16">
      <section className="rounded-3xl bg-brand-navy/80 p-8 text-brand-text-on-dark shadow-lg backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-sand">
          Servicios
        </p>
        <h1 className="mt-4 text-3xl font-semibold">{service.title}</h1>
        {service.subtitle && (
          <p className="mt-2 text-base text-brand-text-on-dark/85">{service.subtitle}</p>
        )}
      </section>

      <section className="rounded-3xl border border-brand-border bg-brand-surface/70 p-8 shadow-sm backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-brand-text">
          DescripciÃ³n del servicio
        </h2>
        <p className="mt-3 text-sm text-brand-text-muted">
          En proceso de armado. AquÃ­ podrÃ¡s describir quÃ© hace y cÃ³mo se diferencia
          cada opciÃ³n cuando estÃ© listo.
        </p>
      </section>

      <section className="rounded-3xl border border-brand-border bg-brand-surface/70 p-8 shadow-sm backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-brand-text">QuÃ© incluye</h2>
        <p className="mt-3 text-sm text-brand-text-muted">
          Pronto listaremos cada Ã­tem. Mientras tanto, mantÃ©n el foco en puntos clave
          como tiempos, entregables y servicios adicionales.
        </p>
      </section>

      <section className="rounded-3xl border border-brand-border bg-brand-surface/70 p-8 shadow-sm backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-brand-text">GalerÃ­a</h2>
        <p className="mt-3 text-sm text-brand-text-muted">
          Espacio reservado para imÃ¡genes o ejemplos del servicio.
        </p>
      </section>

      <section className="rounded-3xl border border-brand-border bg-brand-surface/70 p-8 shadow-sm backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-brand-text">Consultar</h2>
        <p className="mt-3 text-sm text-brand-text-muted">
          Compartiremos prÃ³ximamente el formulario o contacto especÃ­fico. Por ahora
          puedes usar el botÃ³n de abajo para escribirnos.
        </p>
        <Link
          href="/contacto"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-brand-copper px-6 py-3 text-sm font-semibold text-brand-text-on-dark transition hover:bg-brand-copper"
        >
          Consultar este servicio
        </Link>
      </section>
    </div>
  );
}
