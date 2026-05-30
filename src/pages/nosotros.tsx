import { VideoHero } from "@/components/VideoHero";
import {
  ArrowRight,
  BadgeCheck,
  FileText,
  Gauge,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const stats = [
  ["+12", "anos de obras"],
  ["+340", "proyectos entregados"],
  ["100%", "obras documentadas"],
  ["24h", "respuesta a consultas"],
];

export default function Nosotros() {
  return (
    <>
      <Head>
        <title>Nosotros | SUR INGENIERIA</title>
        <meta
          name="description"
          content="SUR INGENIERIA desarrolla instalaciones seguras, domotica residencial y soluciones electricas con criterio tecnico y documentacion."
        />
      </Head>

      <VideoHero
        eyebrow="Nosotros"
        title="Ingenieria y obra con nombre propio."
        description="Somos un equipo de ingenieria electrica y domotica que disena, ejecuta y acompana cada proyecto con documentacion y seguimiento digital de punta a punta."
        videoSrc="/nosotros-video.mp4"
        className="min-h-[66svh]"
      />

      <div className="space-y-14 pt-12">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(([value, label]) => (
            <article key={label} className="surface-card p-6 text-center">
              <p className="font-display text-4xl font-bold text-brand-copper">{value}</p>
              <p className="mt-2 text-sm text-brand-text-muted">{label}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative h-80 overflow-hidden rounded-[1.75rem] shadow-e4">
            <Image
              src="/hero-casa.jpg"
              alt="Equipo y obra de SUR INGENIERIA"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="section-shell px-7 py-8">
            <p className="eyebrow">Nuestra forma de trabajar</p>
            <h2 className="mt-2 text-3xl font-semibold text-brand-text">
              Un solo equipo, de la idea a la puesta en marcha.
            </h2>
            <div className="mt-4 space-y-4 text-base leading-7 text-brand-text-muted">
              <p>
                Evitamos la fragmentacion entre proyectista, instalador y servicio tecnico:
                lo hacemos todo nosotros. Eso significa una sola responsabilidad, decisiones
                mas rapidas y una obra que se entrega lista, probada y documentada.
              </p>
              <p>
                Buscamos que cada cliente sienta que contrato una empresa tecnica, no un
                improvisado: con procesos, decisiones coherentes y ejecucion respaldada.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Matricula profesional",
                "Normativa AEA/IRAM",
                "Garantia por escrito",
                "Soporte post-obra",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-3 py-1.5 text-sm font-medium text-brand-text"
                >
                  <BadgeCheck className="h-4 w-4 text-brand-energy" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="section-shell px-7 py-8">
            <p className="eyebrow">Quienes somos</p>
            <h2 className="mt-2 text-3xl font-semibold text-brand-text">
              Una empresa pensada para resolver bien.
            </h2>
            <div className="mt-4 space-y-4 text-base leading-7 text-brand-text-muted">
              <p>
                SUR INGENIERIA nace para brindar soluciones integrales de electricidad
                y automatizacion residencial con un estandar de trabajo serio, ordenado y claro.
              </p>
              <p>
                Combinamos criterio tecnico, seguridad, cumplimiento y tecnologia util para que
                cada instalacion no solo funcione hoy, sino que tambien quede preparada para crecer.
              </p>
            </div>
          </article>

          <article className="section-shell px-7 py-8">
            <p className="eyebrow">Que hacemos</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                "Instalaciones electricas residenciales con criterio tecnico.",
                "Domotica aplicada a confort, eficiencia y control real.",
                "Tableros, protecciones, circuitos y documentacion base.",
                "Sistemas preparados para crecer sin rehacer la obra.",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-brand-bg px-5 py-4 text-sm font-medium leading-6 text-brand-text">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="section-shell-dark px-7 py-8">
          <div className="max-w-3xl">
            <p className="eyebrow eyebrow-dark">Que nos diferencia</p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-text-on-dark">
              No vendemos humo comercial. Resolvemos con criterio.
            </h2>
            <p className="mt-3 text-base leading-7 text-brand-text-on-dark/82">
              Nuestro diferencial no pasa por promesas grandilocuentes, sino por la forma en que
              proyectamos, ejecutamos y dejamos cada sistema: claro, seguro, ordenado y mantenible.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Criterio tecnico aplicado",
                description:
                  "Cada decision responde a seguridad, funcionamiento y mantenibilidad.",
                icon: Gauge,
              },
              {
                title: "Instalaciones bien resueltas",
                description:
                  "Tableros claros, circuitos ordenados y ejecucion prolija en cada detalle.",
                icon: ShieldCheck,
              },
              {
                title: "Documentacion y respaldo",
                description:
                  "Relevamiento, criterios de alcance y entregables utiles para el cliente.",
                icon: FileText,
              },
              {
                title: "Sistemas escalables",
                description:
                  "Pensamos instalaciones y automatizaciones para que puedan ampliarse sin rehacer la obra.",
                icon: Leaf,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-3xl border border-white/10 bg-white/6 p-5">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-copper/14 text-brand-copper">
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

        <section className="section-shell px-7 py-8">
          <div className="max-w-3xl">
            <p className="eyebrow">Nuestros valores</p>
            <h2 className="mt-2 text-3xl font-semibold text-brand-text">
              Principios que ordenan cada decision tecnica.
            </h2>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              "Seguridad y cumplimiento",
              "Calidad de ejecucion",
              "Claridad con el cliente",
              "Orden y documentacion",
              "Escalabilidad real",
              "Si no se puede hacer bien, no se hace",
            ].map((item) => (
              <article key={item} className="rounded-3xl bg-brand-bg px-5 py-6">
                <h3 className="text-lg font-semibold text-brand-text">{item}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-[1.75rem] bg-brand-navy px-7 py-8 text-brand-text-on-dark shadow-e4">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow eyebrow-dark">Trabajemos juntos</p>
              <h2 className="mt-2 text-3xl font-semibold text-brand-text-on-dark">
                Si buscas una instalacion segura, prolija y con respaldo tecnico, hablemos.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contacto" className="btn btn-primary">
                Pedir relevamiento
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/proceso" className="btn btn-ghost-dark">
                Ver como trabajamos
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
