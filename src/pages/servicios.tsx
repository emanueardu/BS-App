import { VideoHero } from "@/components/VideoHero";
import { services } from "@/data/services";
import { ArrowRight, Check, Gauge, Leaf, ShieldCheck, Zap } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

const scrollToService = (serviceId: string) => {
  if (typeof document === "undefined") return;
  const target = document.getElementById(serviceId);
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Servicios() {
  const onCardClick = useCallback((id: string) => scrollToService(id), []);
  const featuredServices = services.slice(0, 4);

  return (
    <>
      <Head>
        <title>Servicios | SUR INGENIERIA</title>
        <meta
          name="description"
          content="Servicios electricos, domoticos y de seguridad con seguimiento premium, documentacion y ejecucion tecnica."
        />
      </Head>

      <VideoHero
        eyebrow="Servicios"
        title="Ingenieria y obra, por un solo equipo."
        description="Disenamos, ejecutamos y documentamos cada instalacion con opciones claras de incluye/excluye y seguimiento digital desde tu panel."
        videoSrc="/servicios-video.mp4"
        actions={[
          {
            href: "/contacto",
            label: "Pedir relevamiento",
            icon: <ArrowRight className="h-4 w-4" />,
          },
          {
            href: "/proceso",
            label: "Ver el proceso",
            variant: "ghost-dark",
          },
        ]}
        className="min-h-[68svh]"
      />

      <div className="space-y-14 pt-12">
        <section className="grid gap-6 xl:grid-cols-2">
          {featuredServices.map((service) => (
            <article key={service.id} className="surface-card overflow-hidden">
              <div className="relative h-44">
                <Image
                  src={service.imageSrc}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-copper/12 text-brand-copper">
                  <Zap className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-brand-text">
                  {service.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-brand-text-muted">
                  {service.description}
                </p>
                <div className="mt-4 space-y-2">
                  {service.bullets.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-brand-text">
                      <Check className="mt-0.5 h-4 w-4 text-brand-energy" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button onClick={() => onCardClick(service.id)} className="btn btn-outline">
                    Ver mas
                  </button>
                  <Link href={`/servicios/${service.slug}`} className="btn btn-primary">
                    Ir al detalle
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="section-shell px-7 py-8">
          <div className="max-w-3xl">
            <p className="eyebrow">Detalle de servicios</p>
            <h2 className="mt-2 text-3xl font-semibold text-brand-text">
              Alcances claros, prioridades tecnicas y respaldo documental.
            </h2>
            <p className="mt-3 text-base leading-7 text-brand-text-muted">
              Cada servicio mantiene la misma logica: relevamiento serio, propuesta clara,
              ejecucion prolija y documentacion util para operar o ampliar la instalacion.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {services.map((service) => (
              <article
                key={service.id}
                id={service.id}
                className="surface-card scroll-mt-28 p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="eyebrow">{service.subtitle}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-brand-text">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-brand-text-muted">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/contacto" className="btn btn-outline">
                      Consultar
                    </Link>
                    <Link href={`/servicios/${service.slug}`} className="btn btn-primary">
                      Ver detalle
                    </Link>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {service.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="rounded-2xl bg-brand-bg px-4 py-3 text-sm leading-6 text-brand-text"
                    >
                      <span className="mr-2 font-semibold text-brand-copper">•</span>
                      {bullet}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell overflow-hidden px-7 py-8">
          <div className="max-w-3xl">
            <p className="eyebrow">Por que elegirnos</p>
            <h2 className="mt-2 text-3xl font-semibold text-brand-text">
              Confort que tambien ahorra energia.
            </h2>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Leaf,
                title: "-18% consumo",
                description: "Promedio en hogares con escenas y control de clima bien configurado.",
                accent: "bg-brand-energy/14 text-[#1f8a5b]",
              },
              {
                icon: Gauge,
                title: "Monitoreo 24/7",
                description: "Medicion y estados visibles desde tu panel privado y el modulo Mi Home.",
                accent: "bg-brand-copper/12 text-brand-copper",
              },
              {
                icon: ShieldCheck,
                title: "Obra documentada",
                description: "Planos, registro fotografico y respaldo tecnico para futuras ampliaciones.",
                accent: "bg-brand-copper/12 text-brand-copper",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-3xl border border-brand-border bg-brand-bg p-5">
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${item.accent}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-brand-text">
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
      </div>
    </>
  );
}
