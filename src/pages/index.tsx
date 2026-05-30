import { VideoHero } from "@/components/VideoHero";
import { services } from "@/data/services";
import { SHOW_PROJECTS_SECTION } from "@/data/site";
import {
  ArrowRight,
  FileText,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const portfolio = [
  {
    title: "Vivienda inteligente",
    img: "/images/services/domotica.jpg",
    tag: "Domotica",
  },
  {
    title: "Tableros y distribucion",
    img: "/images/services/instalaciones-electricas.jpg",
    tag: "Electricidad",
  },
  {
    title: "Proyecto y documentacion",
    img: "/images/services/planos-y-proyectos.jpg",
    tag: "Proyecto",
  },
];

const steps = [
  {
    title: "Relevamiento",
    detail: "Visita tecnica con criterios de seguridad, alcance y prioridades del proyecto.",
    icon: ShieldCheck,
  },
  {
    title: "Diseno y propuesta",
    detail: "Opciones claras con incluye/excluye, materiales, tiempos y documentacion.",
    icon: Sparkles,
  },
  {
    title: "Ejecucion",
    detail: "Montaje prolijo, registros fotograficos y avance visible desde el portal.",
    icon: Wrench,
  },
  {
    title: "Entrega y soporte",
    detail: "Puesta en marcha, manuales y respaldo tecnico para seguir creciendo.",
    icon: FileText,
  },
];

function HeroPanel() {
  const rows = [
    ["Provision de tableros", 80],
    ["Canalizaciones", 55],
    ["Automatizacion", 30],
  ] as const;

  return (
    <div className="overflow-hidden rounded-[inherit]">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/10 px-6 py-4">
        <div>
          <p className="eyebrow text-brand-sand">Seguimiento en vivo</p>
          <p className="mt-1 font-display text-lg font-semibold text-brand-text-on-dark">
            Panel de avance de obra
          </p>
        </div>
        <span className="status-pill bg-brand-copper text-[#04262b]">Cliente</span>
      </div>
      <div className="space-y-4 px-6 py-6">
        {rows.map(([label, pct]) => (
          <div key={label}>
            <div className="flex items-center justify-between text-sm font-semibold text-brand-text-on-dark">
              <span>{label}</span>
              <span>{pct}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-white/14">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-brand-copper to-brand-energy"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {[
            ["Proxima visita", "Martes 10:00"],
            ["Documentos", "12 disponibles"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3"
            >
              <p className="text-xs text-brand-text-on-dark/70">{label}</p>
              <p className="mt-1 text-base font-semibold text-brand-text-on-dark">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Sur Ingenieria SRL | Ingenieria y Servicios</title>
        <meta
          name="description"
          content="Sur Ingenieria SRL ofrece ingenieria electrica, domotica, automatizacion y seguimiento digital para viviendas y proyectos residenciales."
        />
        <link rel="canonical" href="https://www.suringenieriasrl.com/" />
      </Head>

      <VideoHero
        eyebrow="Servicio tecnico + portal de cliente"
        title="Electricidad segura, domotica a medida y seguimiento en linea."
        description="Disenamos y ejecutamos tu instalacion electrica y domotica con un panel privado para ver presupuestos, avances y ahorro energetico en tiempo real."
        videoSrc="/hero-video.mp4"
        actions={[
          {
            href: "/contacto",
            label: "Pedir visita tecnica",
            icon: <ArrowRight className="h-4 w-4" />,
          },
          {
            href: "/login",
            label: "Ingresar a mi panel",
            variant: "ghost-dark",
          },
        ]}
        panelAside={<HeroPanel />}
      />

      <div className="space-y-14 pt-12">
        <section>
          <div className="max-w-3xl">
            <p className="eyebrow">Servicios</p>
            <h2 className="mt-2 text-3xl font-semibold text-brand-text sm:text-4xl">
              Ingenieria y obra por un solo equipo.
            </h2>
            <p className="mt-3 text-base leading-7 text-brand-text-muted">
              Proyecto, montaje y puesta en marcha con documentacion, materiales
              certificados y seguimiento digital.
            </p>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {services.slice(0, 3).map((service) => (
              <article key={service.id} className="surface-card overflow-hidden">
                <div className="relative h-44">
                  <Image
                    src={service.imageSrc}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-copper/12 text-brand-copper">
                    <Zap className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-brand-text">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-brand-text-muted">
                    {service.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="max-w-3xl">
            <p className="eyebrow">Proceso</p>
            <h2 className="mt-2 text-3xl font-semibold text-brand-text sm:text-4xl">
              Como trabajamos.
            </h2>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="surface-card p-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-brand-copper">
                      0{index + 1}
                    </span>
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-copper/12 text-brand-copper">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-brand-text">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-brand-text-muted">
                    {step.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {SHOW_PROJECTS_SECTION ? (
          <section>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Obras</p>
                <h2 className="mt-2 text-3xl font-semibold text-brand-text">
                  Proyectos destacados
                </h2>
                <p className="mt-2 text-sm text-brand-text-muted">
                  Integracion de tableros inteligentes, redes y sensores con foco en ahorro y control.
                </p>
              </div>
              <Link href="/contacto" className="btn btn-outline">
                Agendar asesoria
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {portfolio.map((item) => (
                <article key={item.title} className="surface-card overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/88 px-3 py-1 text-xs font-semibold text-brand-text">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-base font-semibold text-brand-text">{item.title}</p>
                    <p className="mt-1 text-sm text-brand-text-muted">
                      Integracion de tableros, circuitos, documentacion y puesta en marcha.
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="section-shell-dark overflow-hidden px-8 py-10">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <p className="eyebrow eyebrow-dark">Panel privado</p>
              <h2 className="mt-3 text-3xl font-semibold text-brand-text-on-dark sm:text-4xl">
                Presupuestos, avance y documentos en un mismo lugar.
              </h2>
              <p className="mt-4 text-base leading-7 text-brand-text-on-dark/82">
                Cada cliente accede con su usuario a un dashboard donde puede seguir el progreso,
                descargar planos, notas de obra y fotos actualizadas.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Presupuestos firmados digitalmente",
                  "Checklist de visitas tecnicas",
                  "Descarga de planos y memorias",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-brand-blue-mid px-3 py-1 text-sm text-brand-text-on-dark/82"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "Presupuestos",
                  description: "Firma y seguimiento de aprobaciones.",
                  icon: FileText,
                },
                {
                  title: "Avance de obra",
                  description: "Checklist por etapas y fechas de visita.",
                  icon: Zap,
                },
                {
                  title: "Documentos",
                  description: "Planos, certificaciones y fotos en la nube.",
                  icon: ShieldCheck,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/6 p-4"
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-copper/14 text-brand-copper">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-base font-semibold text-brand-text-on-dark">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-brand-text-on-dark/80">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-brand-copper via-brand-copper-soft to-brand-energy px-8 py-10 shadow-glow-electric">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#063a42]">
                Listo para empezar
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#04262b]">
                Agenda una visita tecnica y recibe tu propuesta digital.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contacto" className="btn btn-navy">
                Pedir visita
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="btn btn-outline border-brand-navy/20 bg-white/72">
                Ingresar al panel
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
