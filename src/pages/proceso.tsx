import Head from "next/head";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  FileCheck,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { openVoltiChat } from "@/utils/volti";

const workflow = [
  {
    step: "01",
    title: "Relevamiento tecnico",
    description:
      "Visitamos la obra, tomamos datos, relevamos consumos, definimos necesidades reales y detectamos condicionantes antes de proponer una solucion.",
    icon: ShieldCheck,
  },
  {
    step: "02",
    title: "Propuesta y alcance definido",
    description:
      "Presentamos una propuesta clara con criterios tecnicos, materiales, incluye/excluye y forma de ejecucion para evitar ambiguedades.",
    icon: ClipboardList,
  },
  {
    step: "03",
    title: "Ejecucion prolija y segura",
    description:
      "Trabajamos con orden, protecciones correctas, trazados mantenibles y control de calidad durante toda la instalacion.",
    icon: Wrench,
  },
  {
    step: "04",
    title: "Entrega con documentacion",
    description:
      "Dejamos el sistema funcionando, explicamos su uso y entregamos la base tecnica necesaria para mantenimiento, operacion o futuras ampliaciones.",
    icon: FileCheck,
  },
];

const pillars = [
  {
    title: "Seguridad desde el inicio",
    description:
      "El proceso se define para reducir errores, proteger a las personas y asegurar una instalacion confiable en el tiempo.",
  },
  {
    title: "Alcance claro antes de ejecutar",
    description:
      "Priorizamos definicion tecnica y claridad comercial para que la obra avance con menos desvio y menos retrabajo.",
  },
  {
    title: "Orden y criterio en obra",
    description:
      "No improvisamos en campo. Cada etapa se ejecuta con logica de montaje, prolijidad y control del detalle.",
  },
  {
    title: "Respaldo al cierre",
    description:
      "La entrega no termina en encender el sistema: dejamos explicacion, criterio de uso y documentacion minima.",
  },
];

const deliverables = [
  "Esquema unifilar y cuadro de cargas, segun el alcance del proyecto.",
  "Checklist de tablero, protecciones y puesta en marcha.",
  "Registro fotografico y base as-built cuando aplica.",
  "Manual de uso y explicacion operativa para el cliente.",
];

const budgetRules = [
  "Incluye lo necesario para ejecutar con criterio tecnico y dejar la instalacion operativa.",
  "Explicita alcances, materiales, terminaciones y condicionantes relevantes.",
  "Evita sorpresas al separar claramente lo incluido, lo excluido y lo opcional.",
  "Permite tomar decisiones con mejor informacion antes de comenzar la obra.",
];

export default function Proceso() {
  return (
    <>
      <Head>
        <title>Como trabajamos | SUR INGENIERIA</title>
        <meta
          name="description"
          content="SUR INGENIERIA trabaja con relevamiento, propuesta clara, ejecucion prolija y entrega documentada para instalaciones residenciales seguras."
        />
      </Head>

      <div className="space-y-8">
        <section className="overflow-hidden rounded-[2rem] border border-brand-border bg-brand-surface shadow-xl shadow-brand-sand/30">
          <div className="grid gap-8 px-8 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-14">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-copper">
                Proceso
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-brand-blue lg:text-5xl">
                Proceso tecnico claro y documentado de principio a fin.
              </h1>
              <p className="max-w-3xl text-base leading-7 text-brand-text-muted lg:text-lg">
                Trabajamos con una secuencia definida para que la instalacion se
                ejecute con criterio, previsibilidad y respaldo tecnico. El
                objetivo no es solo terminar la obra: es resolverla bien,
                dejarla ordenada y que el cliente entienda lo que recibe.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-copper px-6 py-3 text-sm font-semibold text-brand-text-on-dark transition hover:-translate-y-0.5 hover:bg-brand-copper-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sand"
                >
                  Pedir relevamiento
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={openVoltiChat}
                  className="inline-flex items-center justify-center rounded-full border border-brand-navy px-6 py-3 text-sm font-semibold text-brand-text transition hover:bg-brand-navy hover:text-brand-text-on-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sand"
                >
                  Hablar con Volti
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-3xl bg-brand-navy px-6 py-6 text-brand-text-on-dark">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sand">
                  Base del proceso
                </p>
                <p className="mt-3 text-2xl font-semibold">
                  Menos improvisacion. Mas control tecnico.
                </p>
                <p className="mt-3 text-sm leading-6 text-brand-text-on-dark/80">
                  Cada etapa existe para ordenar decisiones, reducir errores y
                  sostener seguridad, prolijidad y cumplimiento en obra.
                </p>
              </div>
              <div className="rounded-3xl border border-brand-border bg-brand-bg-alt px-6 py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-copper">
                  Resultado esperado
                </p>
                <ul className="mt-3 space-y-3 text-sm leading-6 text-brand-text-muted">
                  <li>Instalaciones mejor definidas antes de ejecutar.</li>
                  <li>Obra mas ordenada y mantenible.</li>
                  <li>Entrega mas clara para el cliente.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-brand-border bg-brand-surface px-7 py-8 shadow-sm">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-copper">
              Etapas
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-text">
              Cuatro pasos para ejecutar con criterio y previsibilidad.
            </h2>
            <p className="mt-3 text-base leading-7 text-brand-text-muted">
              Esta estructura nos permite ordenar la obra, alinear expectativas
              con el cliente y sostener calidad de ejecucion durante todo el
              proyecto.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workflow.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-brand-border bg-brand-bg px-5 py-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy text-brand-text-on-dark">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-copper">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-brand-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-brand-text-muted">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] border border-brand-border bg-brand-surface px-7 py-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-copper">
              Logica de trabajo
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-text">
              El proceso no es burocracia. Es control de calidad.
            </h2>
            <div className="mt-5 grid gap-4">
              {pillars.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-brand-border bg-brand-bg-alt px-5 py-4"
                >
                  <h3 className="text-lg font-semibold text-brand-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-brand-text-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] bg-brand-navy px-7 py-8 text-brand-text-on-dark shadow-lg shadow-brand-navy/20">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sand">
              Presupuesto claro
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Definimos antes de ejecutar.
            </h2>
            <p className="mt-3 text-base leading-7 text-brand-text-on-dark/80">
              Un presupuesto bien armado ordena la obra. Sirve para alinear
              alcance, materiales y criterios de instalacion antes de entrar en
              campo.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-brand-text-on-dark/80">
              {budgetRules.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 text-brand-sand">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="rounded-[2rem] border border-brand-border bg-brand-surface px-7 py-8 shadow-sm">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-copper">
              Entrega
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-text">
              Documentacion minima para dejar respaldo tecnico real.
            </h2>
            <p className="mt-3 text-base leading-7 text-brand-text-muted">
              La entrega tiene que ser util. Dejamos una base tecnica clara para
              operar, mantener o ampliar la instalacion con mejores decisiones a
              futuro.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {deliverables.map((item) => (
              <article
                key={item}
                className="rounded-3xl border border-brand-border bg-brand-bg px-5 py-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-copper/15 text-brand-copper">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm leading-6 text-brand-text">
                  {item}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-gradient-to-r from-brand-copper to-brand-copper-soft px-7 py-8 text-brand-text shadow-lg shadow-brand-copper-soft/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">
                Cierre
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Si queres una obra clara, prolija y bien resuelta, empecemos por
                un relevamiento serio.
              </h2>
              <p className="mt-3 text-base leading-7 text-brand-blue">
                Definimos alcance, prioridades y la mejor solucion tecnica para
                que el proyecto avance con menos incertidumbre y mejor respaldo.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold !text-white transition hover:-translate-y-0.5 hover:bg-brand-blue hover:!text-white"
                style={{ color: "#ffffff" }}
              >
                Pedir relevamiento
                <ArrowRight className="h-4 w-4 !text-white" style={{ color: "#ffffff" }} />
              </Link>
              <Link
                href="/nosotros"
                className="inline-flex items-center justify-center rounded-full border border-brand-navy px-6 py-3 text-sm font-semibold text-brand-text transition hover:bg-brand-surface/60"
              >
                Ver nosotros
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
