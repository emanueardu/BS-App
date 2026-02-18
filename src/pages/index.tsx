import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { SHOW_PROJECTS_SECTION } from "@/data/site";
import {
  ArrowLongRightIcon,
  BoltIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
const portfolio = [
  {
    title: "Vivienda inteligente",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    tag: "Domotica",
  },
  {
    title: "Oficinas eficientes",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    tag: "Industria",
  },
  {
    title: "Reforma premium",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1100&q=80",
    tag: "Residencial",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>BS | Portal de clientes</title>
        <meta
          name="description"
          content="Portal publico y app privada para clientes de BS Electricidad & Domotica."
        />
      </Head>

      <section className="relative isolate -mx-6 overflow-hidden rounded-none bg-gradient-to-br from-slate-900/70 via-slate-900/60 to-slate-800/60 p-6 shadow-2xl shadow-slate-900/30 backdrop-blur-sm lg:-mx-10 lg:rounded-3xl lg:p-12">
        <div className="relative">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-orange-200">
              <SparklesIcon className="h-5 w-5" />
              Servicio tecnico + portal de cliente
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Electricidad segura, domotica a medida y seguimiento en linea.
            </h1>
            <p className="max-w-3xl text-lg text-slate-100/80">
              Diseñamos y ejecutamos tu instalacion electrica y domotica con un
              panel privado para ver presupuestos, avances y documentacion.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-400/40 transition hover:-translate-y-0.5 hover:bg-orange-400"
              >
                Pedir visita tecnica
                <ArrowLongRightIcon className="h-5 w-5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-orange-200 hover:text-orange-100"
              >
                Ingresar a mi panel
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Visitas coordinadas", value: "<24h" },
                { label: "Obras activas", value: "30+" },
                { label: "Satisfaccion", value: "4.9/5" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-sm"
                >
                  <p className="text-2xl font-bold text-orange-300">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-100/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-slate-900/30">
              <div className="flex items-center justify-between bg-white/10 px-6 py-4 text-white backdrop-blur">
                <div>
                  <p className="text-sm uppercase tracking-wide text-orange-200">
                    Seguimiento en vivo
                  </p>
                  <p className="text-lg font-semibold">
                    Panel de avance de obra
                  </p>
                </div>
                <div className="rounded-full bg-orange-500 px-4 py-1 text-xs font-semibold">
                  Cliente
                </div>
              </div>
              <div className="space-y-4 px-6 py-6">
                {["Provisions tableros", "Canalizaciones", "Automatizacion"].map(
                  (item, idx) => (
                    <div key={item}>
                      <div className="flex items-center justify-between text-sm font-semibold text-white">
                        <span>{item}</span>
                        <span>{[80, 55, 30][idx]}%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-white/10">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-300"
                          style={{ width: `${[80, 55, 30][idx]}%` }}
                        />
                      </div>
                    </div>
                  )
                )}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white">
                    <p className="text-xs text-white/70">Proxima visita</p>
                    <p className="text-base font-semibold">Martes 10:00</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white">
                    <p className="text-xs text-white/70">Documentos</p>
                    <p className="text-base font-semibold">12 disponibles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {SHOW_PROJECTS_SECTION && (
        <section className="mt-14">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
                Obras
              </p>
              <h3 className="text-2xl font-semibold text-slate-900">
                Proyectos destacados
              </h3>
              <p className="text-sm text-slate-600">
                Residenciales e industriales con control inteligente y ahorro
                energetico.
              </p>
            </div>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-slate-900 bg-white/60 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur-sm transition hover:bg-slate-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
            >
              Agendar asesoria
              <ArrowLongRightIcon className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {portfolio.map((item) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-2xl border border-slate-300 bg-white/60 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800">
                    {item.tag}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-base font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="text-sm text-slate-600">
                    Integracion de tableros inteligentes, redes y sensorica.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-14 grid gap-6 rounded-3xl bg-slate-900 px-8 py-10 text-white shadow-lg shadow-slate-900/20 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-200">
            Panel privado
          </p>
          <h3 className="text-3xl font-semibold">
            Presupuestos, avance y documentos en un mismo lugar.
          </h3>
          <p className="text-base text-slate-200">
            Cada cliente accede con su usuario a un dashboard donde puede seguir
            el progreso, descargar planos, notas de obra y fotos actualizadas.
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-slate-200">
            <span className="rounded-full border border-slate-700 px-3 py-1">
              Presupuestos firmados digitalmente
            </span>
            <span className="rounded-full border border-slate-700 px-3 py-1">
              Checklist de visitas tecnicas
            </span>
            <span className="rounded-full border border-slate-700 px-3 py-1">
              Descarga de planos y memorias
            </span>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              title: "Presupuestos",
              description: "Firma y seguimiento de aprobaciones.",
              icon: DocumentTextIcon,
            },
            {
              title: "Avance de obra",
              description: "Checklist por etapas y fechas de visita.",
              icon: BoltIcon,
            },
            {
              title: "Documentos",
              description: "Planos, certificaciones y fotos en la nube.",
              icon: ShieldCheckIcon,
            },
            {
              title: "Chat Volti",
              description: "Consultas rapidas sobre el proyecto.",
              icon: SparklesIcon,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 text-orange-200">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-base font-semibold text-white">
                  {item.title}
                </p>
                <p className="text-sm text-slate-200">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-14 rounded-3xl bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-10 text-slate-900 shadow-lg shadow-orange-300/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide">
              ¿Listo para empezar?
            </p>
            <h3 className="text-2xl font-semibold">
              Agenda una visita tecnica y recibe tu propuesta digital.
            </h3>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:text-white hover:bg-slate-800 focus-visible:text-white active:text-white"
            >
              Pedir visita
              <ArrowLongRightIcon className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-900 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white/70"
            >
              Ingresar al panel
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
