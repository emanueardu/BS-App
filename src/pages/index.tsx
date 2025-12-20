import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLongRightIcon,
  BoltIcon,
  DocumentTextIcon,
  HomeModernIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    title: "Instalación eléctrica segura",
    description:
      "Cableado certificado, tableros inteligentes y auditoría completa de tu obra.",
    icon: BoltIcon,
  },
  {
    title: "Preparación domótica",
    description:
      "Infraestructura lista para IoT, sensores y automatización por escenarios.",
    icon: HomeModernIcon,
  },
  {
    title: "Domótica integral",
    description:
      "Control de iluminación, climatización y accesos con monitoreo en tiempo real.",
    icon: ShieldCheckIcon,
  },
];

const portfolio = [
  {
    title: "Vivienda inteligente en Nordelta",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80",
    tag: "Domótica",
  },
  {
    title: "Oficinas energéticamente eficientes",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80",
    tag: "Industria",
  },
  {
    title: "Reforma eléctrica premium",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
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
          content="Portal público y app privada para clientes de BS Electricidad & Domótica."
        />
      </Head>

      <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
            <SparklesIcon className="h-5 w-5" />
            Servicio técnico + portal de seguimiento
          </div>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Electricidad segura y domótica a medida con seguimiento en línea.
          </h1>
          <p className="max-w-2xl text-lg text-slate-700">
            Coordinamos visitas técnicas, diseñamos la instalación y te damos
            acceso a un panel privado para ver presupuestos, avances y
            documentos de tu obra.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-300/40 transition hover:-translate-y-0.5 hover:bg-orange-500"
            >
              Pedir visita técnica
              <ArrowLongRightIcon className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-orange-200 hover:text-orange-700"
            >
              Ingresar a mi panel
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Tiempo de respuesta", value: "<24h" },
              { label: "Proyectos activos", value: "120+" },
              { label: "Satisfacción", value: "4.9/5" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-orange-100 bg-white px-4 py-3 shadow-sm"
              >
                <p className="text-2xl font-bold text-orange-600">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-orange-100">
            <div className="flex items-center justify-between bg-slate-900 px-6 py-4 text-white">
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
              {["Provisión tableros", "Canalizaciones", "Automatización"].map(
                (item, idx) => (
                  <div key={item}>
                    <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
                      <span>{item}</span>
                      <span>{[80, 55, 30][idx]}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                        style={{ width: `${[80, 55, 30][idx]}%` }}
                      />
                    </div>
                  </div>
                )
              )}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs text-slate-500">Próxima visita</p>
                  <p className="text-base font-semibold text-slate-900">
                    Martes 10:00
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs text-slate-500">Documentos</p>
                  <p className="text-base font-semibold text-slate-900">
                    12 disponibles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-10 rounded-3xl bg-white/80 p-8 shadow-sm shadow-orange-100 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
            Quiénes somos
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Equipo especializado en seguridad eléctrica y hogares conectados.
          </h2>
          <p className="text-base text-slate-700">
            Auditamos tu instalación, diseñamos tableros, gestionamos domótica y
            centralizamos toda la documentación en un panel privado para que
            tengas visibilidad real del proyecto.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-sm text-slate-500">Certificaciones</p>
              <p className="text-lg font-semibold text-slate-900">
                IRAM, TÜV, KNX Partner
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-sm text-slate-500">Zona de cobertura</p>
              <p className="text-lg font-semibold text-slate-900">
                AMBA y proyectos especiales
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com"
              className="text-sm font-semibold text-slate-700 underline"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com"
              className="text-sm font-semibold text-slate-700 underline"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
              Portfolio
            </p>
            <h3 className="text-2xl font-semibold text-slate-900">
              Obras destacadas
            </h3>
            <p className="text-sm text-slate-600">
              Galería de trabajos recientes para clientes residenciales e
              industriales.
            </p>
          </div>
          <Link
            href="/contacto"
            className="hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-orange-200 hover:text-orange-700 sm:inline-flex"
          >
            Agendar asesoría
            <ArrowLongRightIcon className="h-5 w-5" />
          </Link>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {portfolio.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100"
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
                  Integración de tableros inteligentes, redes y sensórica.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 rounded-3xl bg-slate-900 px-8 py-10 text-white shadow-lg shadow-slate-900/20 lg:grid-cols-[1.1fr_0.9fr]">
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
              Checklist de visitas técnicas
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
              description: "Consultas rápidas sobre el proyecto.",
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
    </>
  );
}
