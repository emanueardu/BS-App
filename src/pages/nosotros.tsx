import Head from "next/head";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  FileText,
  Gauge,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { openVoltiChat } from "@/utils/volti";

const workflow = [
  {
    title: "Relevamiento previo",
    description:
      "Analizamos la vivienda, los consumos, las necesidades reales y el alcance tecnico antes de definir cualquier solucion.",
    icon: ShieldCheck,
  },
  {
    title: "Propuesta clara",
    description:
      "Definimos alcance, materiales, criterios de instalacion y documentacion minima para evitar interpretaciones ambiguas.",
    icon: ClipboardList,
  },
  {
    title: "Ejecucion prolija y segura",
    description:
      "Trabajamos con orden, protecciones correctas, trazados mantenibles y terminaciones consistentes con una obra bien resuelta.",
    icon: Wrench,
  },
  {
    title: "Entrega con respaldo",
    description:
      "Entregamos la instalacion funcionando, con explicacion de uso, registro tecnico y base documentada para mantenimiento o ampliaciones.",
    icon: FileText,
  },
];

const differentiators = [
  {
    title: "Criterio tecnico aplicado",
    description:
      "Cada decision de proyecto e instalacion responde a seguridad, funcionamiento y mantenibilidad, no a improvisacion.",
    icon: Gauge,
  },
  {
    title: "Instalaciones bien resueltas",
    description:
      "Priorizamos tableros claros, circuitos ordenados, protecciones bien seleccionadas y ejecucion prolija en cada detalle.",
    icon: ShieldCheck,
  },
  {
    title: "Documentacion y respaldo",
    description:
      "Trabajamos con relevamiento, criterios de alcance y documentacion entregable para que el cliente tenga visibilidad real del trabajo.",
    icon: FileText,
  },
  {
    title: "Sistemas escalables",
    description:
      "Pensamos instalaciones y automatizaciones para que puedan ampliarse, mantenerse y evolucionar sin rehacer la obra.",
    icon: BadgeCheck,
  },
];

const principles = [
  {
    title: "Seguridad y cumplimiento",
    description:
      "Aplicamos buenas practicas, criterios normativos y protecciones correctas para reducir riesgos y asegurar confiabilidad.",
  },
  {
    title: "Calidad de ejecucion",
    description:
      "No buscamos salir rapido; buscamos entregar instalaciones prolijas, limpias, mantenibles y tecnicamente consistentes.",
  },
  {
    title: "Claridad con el cliente",
    description:
      "Explicamos alcance, prioridades y decisiones tecnicas con lenguaje claro para que el cliente sepa que se esta haciendo y por que.",
  },
  {
    title: "Orden y documentacion",
    description:
      "Dejamos base tecnica, registro y criterio de organizacion para facilitar futuras intervenciones o ampliaciones.",
  },
  {
    title: "Escalabilidad real",
    description:
      "Pensamos la instalacion para el uso actual y para el crecimiento futuro de la vivienda, especialmente en domotica.",
  },
  {
    title: "Si no se puede hacer bien, no se hace",
    description:
      "Ese criterio define nuestro trabajo: preferimos frenar una decision antes que ejecutar una solucion improvisada o insegura.",
  },
];

export default function Nosotros() {
  return (
    <>
      <Head>
        <title>Nosotros | SUR INGENIERIA</title>
        <meta
          name="description"
          content="SUR INGENIERIA desarrolla instalaciones seguras, domotica residencial y soluciones electricas con criterio tecnico, orden y documentacion."
        />
      </Head>

      <div className="space-y-8">
        <section className="overflow-hidden rounded-[2rem] border border-brand-border bg-brand-surface shadow-xl shadow-brand-sand/30">
          <div className="grid gap-8 px-8 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-14">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-copper">
                Nosotros
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-brand-blue lg:text-5xl">
                Ingenieria aplicada a instalaciones residenciales seguras.
              </h1>
              <p className="max-w-3xl text-base leading-7 text-brand-text-muted lg:text-lg">
                SUR INGENIERIA desarrolla proyectos de electricidad y domotica
                residencial con criterio tecnico, alcance definido y ejecucion
                prolija. No improvisamos ni competimos por precio: priorizamos
                seguridad, claridad, documentacion y soluciones bien resueltas
                desde el relevamiento hasta la entrega.
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
                  Posicionamiento
                </p>
                <p className="mt-3 text-2xl font-semibold">
                  Empresa tecnica, prolija y previsible.
                </p>
                <p className="mt-3 text-sm leading-6 text-brand-text-on-dark/80">
                  Disenamos y ejecutamos instalaciones mantenibles, con
                  decisiones tecnicas justificadas y foco en cumplimiento.
                </p>
              </div>
              <div className="rounded-3xl border border-brand-border bg-brand-bg-alt px-6 py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-copper">
                  Enfoque
                </p>
                <ul className="mt-3 space-y-3 text-sm leading-6 text-brand-text-muted">
                  <li>Alcance definido antes de ejecutar.</li>
                  <li>Materiales y criterios seleccionados con respaldo.</li>
                  <li>Documentacion minima para dejar base tecnica real.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[2rem] border border-brand-border bg-brand-surface px-7 py-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-copper">
              Quienes somos
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-text">
              Una empresa pensada para resolver bien.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-brand-text-muted">
              <p>
                SUR INGENIERIA nace para brindar soluciones integrales de
                electricidad y automatizacion residencial con un estandar de
                trabajo mas serio, mas ordenado y mas claro para el cliente.
              </p>
              <p>
                Combinamos criterio tecnico, seguridad, cumplimiento y
                tecnologia util para que cada instalacion no solo funcione hoy,
                sino que tambien quede preparada para mantenimiento, crecimiento
                y uso real en el tiempo.
              </p>
              <p>
                Buscamos que cada cliente sienta que contrato una empresa
                tecnica, no un improvisado: con procesos, decisiones coherentes
                y ejecucion respaldada.
              </p>
            </div>
          </article>

          <article className="rounded-[2rem] border border-brand-border bg-brand-bg-alt px-7 py-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-copper">
              Que hacemos
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                "Instalaciones electricas residenciales con criterio tecnico.",
                "Domotica aplicada a confort, eficiencia y control real.",
                "Tableros, protecciones, circuitos y documentacion base.",
                "Sistemas preparados para crecer sin rehacer la obra.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-brand-border bg-brand-surface px-5 py-4 text-sm font-medium leading-6 text-brand-text"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-[2rem] border border-brand-border bg-brand-surface px-7 py-8 shadow-sm">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-copper">
              Como trabajamos
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-text">
              Proceso claro desde el relevamiento hasta la entrega.
            </h2>
            <p className="mt-3 text-base leading-7 text-brand-text-muted">
              Definimos alcance, ejecutamos con orden y dejamos respaldo
              tecnico. Ese proceso nos permite sostener calidad, previsibilidad
              y una mejor experiencia para el cliente.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workflow.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-brand-border bg-brand-bg px-5 py-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy text-brand-text-on-dark">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-copper">
                    Paso {index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-brand-text">
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

        <section className="rounded-[2rem] bg-brand-navy px-7 py-8 text-brand-text-on-dark shadow-lg shadow-brand-navy/20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sand">
              Que nos diferencia
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              No vendemos humo comercial. Resolvemos con criterio.
            </h2>
            <p className="mt-3 text-base leading-7 text-brand-text-on-dark/80">
              Nuestro diferencial no pasa por promesas grandilocuentes, sino
              por la forma en que proyectamos, ejecutamos y dejamos cada
              sistema: claro, seguro, ordenado y mantenible.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-brand-blue-mid bg-brand-surface/5 px-5 py-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-copper/15 text-brand-sand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-brand-text-on-dark">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-brand-text-on-dark/80">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-[2rem] border border-brand-border bg-brand-surface px-7 py-8 shadow-sm">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-copper">
              Nuestros valores
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-text">
              Principios que ordenan cada decision tecnica.
            </h2>
            <p className="mt-3 text-base leading-7 text-brand-text-muted">
              Estos criterios no son un slogan. Son la base con la que
              evaluamos cada obra, cada instalacion y cada recomendacion.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {principles.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-brand-border bg-brand-bg-alt px-5 py-6"
              >
                <h3 className="text-lg font-semibold text-brand-text">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-brand-text-muted">
                  {item.description}
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
                Si buscas una instalacion segura, prolija y con respaldo
                tecnico, hablemos.
              </h2>
              <p className="mt-3 text-base leading-7 text-brand-blue">
                Coordinemos un relevamiento y definamos la mejor solucion para
                tu proyecto, con alcance claro y criterio profesional desde el
                inicio.
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
                href="/proceso"
                className="inline-flex items-center justify-center rounded-full border border-brand-navy px-6 py-3 text-sm font-semibold text-brand-text transition hover:bg-brand-surface/60"
              >
                Ver como trabajamos
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
