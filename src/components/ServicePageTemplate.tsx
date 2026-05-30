import Link from "next/link";
import { Service } from "@/data/services";

type Props = {
  service: Service;
};

export function ServicePageTemplate({ service }: Props) {
  return (
    <div className="space-y-8 px-0 py-8">
      <section className="section-shell-dark px-8 py-10">
        <p className="eyebrow eyebrow-dark">Servicios</p>
        <h1 className="mt-3 text-3xl font-semibold text-brand-text-on-dark">
          {service.title}
        </h1>
        {service.subtitle ? (
          <p className="mt-3 text-base text-brand-text-on-dark/82">{service.subtitle}</p>
        ) : null}
      </section>

      <section className="section-shell px-8 py-8">
        <h2 className="text-xl font-semibold text-brand-text">Descripcion del servicio</h2>
        <p className="mt-3 text-sm leading-6 text-brand-text-muted">
          En proceso de armado. Aqui podremos describir que hace y como se diferencia
          cada opcion cuando el detalle este completo.
        </p>
      </section>

      <section className="section-shell px-8 py-8">
        <h2 className="text-xl font-semibold text-brand-text">Que incluye</h2>
        <p className="mt-3 text-sm leading-6 text-brand-text-muted">
          Pronto listaremos cada item con mas detalle. Por ahora mantenemos foco en
          tiempos, entregables y servicios adicionales.
        </p>
      </section>

      <section className="section-shell px-8 py-8">
        <h2 className="text-xl font-semibold text-brand-text">Galeria</h2>
        <p className="mt-3 text-sm leading-6 text-brand-text-muted">
          Espacio reservado para imagenes o ejemplos del servicio.
        </p>
      </section>

      <section className="section-shell px-8 py-8">
        <h2 className="text-xl font-semibold text-brand-text">Consultar</h2>
        <p className="mt-3 text-sm leading-6 text-brand-text-muted">
          Compartiremos proximamente el formulario o contacto especifico. Por ahora
          puedes escribirnos desde el boton de abajo.
        </p>
        <Link href="/contacto" className="btn btn-primary mt-5">
          Consultar este servicio
        </Link>
      </section>
    </div>
  );
}
