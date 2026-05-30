import { VideoHero } from "@/components/VideoHero";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  FileCheck,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";

const workflow = [
  {
    step: "01",
    title: "Relevamiento tecnico",
    description:
      "Visitamos la obra, tomamos datos y definimos necesidades reales antes de proponer una solucion.",
    deliverable: "Informe de visita",
    icon: ShieldCheck,
  },
  {
    step: "02",
    title: "Propuesta clara",
    description:
      "Presentamos alcance, materiales, incluye/excluye y forma de ejecucion para evitar ambiguedades.",
    deliverable: "Propuesta digital",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "Ejecucion prolija",
    description:
      "Trabajamos con orden, protecciones correctas, trazados mantenibles y control de calidad en obra.",
    deliverable: "Avance en portal",
    icon: Wrench,
  },
  {
    step: "04",
    title: "Entrega documentada",
    description:
      "Dejamos el sistema funcionando, explicamos su uso y entregamos el respaldo tecnico minimo.",
    deliverable: "As-built y garantia",
    icon: FileCheck,
  },
];

export default function Proceso() {
  return (
    <>
      <Head>
        <title>Como trabajamos | SUR INGENIERIA</title>
        <meta
          name="description"
          content="SUR INGENIERIA trabaja con relevamiento, propuesta clara, ejecucion prolija y entrega documentada."
        />
      </Head>

      <VideoHero
        eyebrow="Proceso"
        title="Como trabajamos, paso a paso."
        description="Un metodo claro y documentado, desde la primera visita hasta la puesta en marcha, con todo visible en tu panel privado."
        videoSrc="/proceso-video.mp4"
        className="min-h-[66svh]"
      />

      <div className="space-y-14 pt-12">
        <section className="space-y-4">
          {workflow.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="surface-card grid gap-5 p-6 lg:grid-cols-[auto_1fr_auto] lg:items-center"
              >
                <div className="flex flex-col items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-brand-copper">
                    {item.step}
                  </span>
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-copper/12 text-brand-copper">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-brand-text">{item.title}</h2>
                  <p className="mt-2 max-w-3xl text-base leading-7 text-brand-text-muted">
                    {item.description}
                  </p>
                </div>

                <div className="lg:text-right">
                  <p className="eyebrow text-[11px]">Entregable</p>
                  <p className="mt-2 font-display text-lg font-semibold text-brand-text">
                    {item.deliverable}
                  </p>
                </div>
              </article>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="section-shell px-7 py-8">
            <p className="eyebrow">Logica de trabajo</p>
            <h2 className="mt-2 text-3xl font-semibold text-brand-text">
              El proceso no es burocracia. Es control de calidad.
            </h2>
            <div className="mt-5 grid gap-4">
              {[
                {
                  title: "Seguridad desde el inicio",
                  description:
                    "Cada decision se ordena para reducir errores y proteger personas e instalacion.",
                },
                {
                  title: "Alcance claro antes de ejecutar",
                  description:
                    "Definimos criterios tecnicos y comerciales antes de entrar en campo.",
                },
                {
                  title: "Orden y criterio en obra",
                  description:
                    "No improvisamos en campo. Cada etapa se ejecuta con logica de montaje y control.",
                },
                {
                  title: "Respaldo al cierre",
                  description:
                    "La entrega incluye explicacion, criterio de uso y base tecnica util.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-brand-bg px-5 py-4">
                  <h3 className="text-lg font-semibold text-brand-text">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-text-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="section-shell-dark px-7 py-8">
            <p className="eyebrow eyebrow-dark">Presupuesto claro</p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-text-on-dark">
              Definimos antes de ejecutar.
            </h2>
            <p className="mt-3 text-base leading-7 text-brand-text-on-dark/82">
              Un presupuesto bien armado ordena la obra. Sirve para alinear alcance,
              materiales y criterios de instalacion antes de entrar en campo.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Incluye lo necesario para ejecutar con criterio tecnico y dejar la instalacion operativa.",
                "Explicita alcances, materiales, terminaciones y condicionantes relevantes.",
                "Separa claramente lo incluido, lo excluido y lo opcional.",
                "Permite tomar mejores decisiones antes de comenzar la obra.",
              ].map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-brand-text-on-dark/84">
                  <BadgeCheck className="mt-1 h-4 w-4 text-brand-energy" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="section-shell px-7 py-8">
          <div className="max-w-3xl">
            <p className="eyebrow">Entrega</p>
            <h2 className="mt-2 text-3xl font-semibold text-brand-text">
              Documentacion minima para dejar respaldo tecnico real.
            </h2>
            <p className="mt-3 text-base leading-7 text-brand-text-muted">
              Dejamos una base tecnica clara para operar, mantener o ampliar la instalacion con mejores decisiones a futuro.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Esquema unifilar y cuadro de cargas, segun el alcance.",
              "Checklist de tablero, protecciones y puesta en marcha.",
              "Registro fotografico y base as-built cuando aplica.",
              "Manual de uso y explicacion operativa para el cliente.",
            ].map((item) => (
              <article key={item} className="rounded-3xl bg-brand-bg px-5 py-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-copper/12 text-brand-copper">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm leading-6 text-brand-text">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-brand-copper via-brand-copper-soft to-brand-copper px-7 py-8 shadow-glow-electric">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#063a42]">
                Primer paso
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#04262b]">
                El relevamiento es sin cargo. Agenda tu visita tecnica.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contacto" className="btn btn-navy">
                Agendar visita
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/nosotros" className="btn btn-outline border-brand-navy/20 bg-white/72">
                Ver nosotros
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
