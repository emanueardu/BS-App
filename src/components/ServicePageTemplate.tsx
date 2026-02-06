import Link from "next/link";
import { Service } from "@/data/services";

type Props = {
  service: Service;
};

export function ServicePageTemplate({ service }: Props) {
  return (
    <div className="space-y-12 px-6 py-10 sm:px-10 lg:px-16">
      <section className="rounded-3xl bg-slate-900/80 p-8 text-white shadow-lg backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-200">
          Servicios
        </p>
        <h1 className="mt-4 text-3xl font-semibold">{service.title}</h1>
        {service.subtitle && (
          <p className="mt-2 text-base text-slate-200">{service.subtitle}</p>
        )}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Descripción del servicio
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          En proceso de armado. Aquí podrás describir qué hace y cómo se diferencia
          cada opción cuando esté listo.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-slate-900">Qué incluye</h2>
        <p className="mt-3 text-sm text-slate-600">
          Pronto listaremos cada ítem. Mientras tanto, mantén el foco en puntos clave
          como tiempos, entregables y servicios adicionales.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-slate-900">Galería</h2>
        <p className="mt-3 text-sm text-slate-600">
          Espacio reservado para imágenes o ejemplos del servicio.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-slate-900">Consultar</h2>
        <p className="mt-3 text-sm text-slate-600">
          Compartiremos próximamente el formulario o contacto específico. Por ahora
          puedes usar el botón de abajo para escribirnos.
        </p>
        <Link
          href="/contacto"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
        >
          Consultar este servicio
        </Link>
      </section>
    </div>
  );
}
