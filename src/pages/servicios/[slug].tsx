import Head from "next/head";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { services, Service } from "@/data/services";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";

type Props = {
  service: Service;
};

const galleryItems = [
  "Tablero eléctrico moderno, ordenado",
  "Canalización/cableado en obra",
  "Tomas y llaves instaladas (detalle)",
  "Medición/verificación (instrumentación)",
];

export default function ServicePage({ service }: Props) {
  const isElectricService = service.slug === "instalaciones-electricas";

  if (isElectricService) {
    return (
      <>
        <Head>
          <title>{service.title} | BS</title>
          <meta
            name="description"
            content="Instalaciones eléctricas residenciales con criterio técnico, materiales certificados y seguimiento técnico."
          />
        </Head>
        <div className="space-y-12 px-6 py-10 sm:px-10 lg:px-16">
          <section className="rounded-3xl bg-slate-900/80 p-8 text-white shadow-lg backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-200">
              Servicios
            </p>
            <h1 className="mt-4 text-3xl font-semibold">{service.title}</h1>
            <p className="mt-1 text-base text-slate-200">{service.subtitle}</p>
            <p className="mt-4 text-sm text-slate-200">
              Realizamos instalaciones eléctricas residenciales con criterio técnico,
              materiales certificados y terminaciones prolijas. Seguridad, cumplimiento y
              previsibilidad en cada obra.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
              >
                Consultar
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center rounded-full border border-white/70 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
              >
                Ver otros servicios
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-slate-900">Qué hacemos</h2>
            <p className="mt-3 text-sm text-slate-600">
              Ejecutamos instalaciones eléctricas completas y reformas para viviendas,
              priorizando la seguridad de las personas y la confiabilidad del sistema.
              Trabajamos con planificación previa, protecciones correctas, circuitos bien
              definidos y documentación mínima entregada. Enfoque: no hacemos “parches”;
              armamos un sistema eléctrico mantenible y escalable.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Qué incluye el servicio
            </h2>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              {[
                "Instalaciones nuevas (obra nueva)",
                "Reformas y recableados completos",
                "Ampliaciones de circuitos (tomas, iluminación, líneas dedicadas)",
                "Armado y adecuación de tableros eléctricos",
                "Protecciones: térmicas, diferencial, seccionamiento correcto",
                "Puesta a tierra y verificación de seguridad",
                "Ordenamiento, rotulado y prolijidad de instalación",
                "Pruebas básicas de funcionamiento y entrega",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="text-orange-500">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Tableros eléctricos normalizados
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Un tablero bien resuelto es el corazón de la instalación. Diseñamos tableros
              claros, ordenados y preparados para el uso real de la vivienda.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              {[
                "Distribución por circuitos",
                "Selectividad y protección diferencial",
                "Reservas para futuras ampliaciones",
                "Rotulado y documentación mínima",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="text-orange-500">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Seguridad y cumplimiento
            </h2>
            <p className="mt-3 text-sm italic text-slate-500">
              No realizamos trabajos que comprometan seguridad o normas, aunque sean
              más rápidos o más baratos.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Trabajamos respetando buenas prácticas y reglamentación vigente, con
              prioridad absoluta en:
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              {[
                "Protección de personas",
                "Protección de equipos y líneas",
                "Puesta a tierra adecuada",
                "Materiales certificados y terminaciones seguras",
                "Instalación ordenada y mantenible",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="text-orange-500">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-slate-900">Cómo trabajamos</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {[
                "Relevamiento previo: visitamos/analizamos la vivienda para entender alcance, estado actual y necesidades reales.",
                "Propuesta clara: presupuesto con alcance detallado, materiales incluidos, exclusiones y plazos realistas.",
                "Ejecución prolija: trabajo ordenado, cableado identificado, tablero limpio y accesible.",
                "Entrega y explicación: dejamos el sistema funcionando y el cliente entiende cómo operar y qué protecciones tiene.",
              ].map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-slate-900">Cuándo conviene</h2>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              {[
                "Obra nueva o ampliación",
                "Instalación vieja sin protecciones o con fallas recurrentes",
                "Tablero desordenado o sin diferencial",
                "Reformas (cocina/baño) y aumento de consumo (aires, hornos, bombas)",
                "Necesidad de regularizar/adecuar instalación",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="text-orange-500">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-slate-900">Galería</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {galleryItems.map((item) => (
                <div
                  key={item}
                  className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-100 to-slate-200 text-center text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              ¿Querés hacer la instalación bien desde el inicio?
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Contanos tu proyecto y coordinamos un relevamiento para definir la mejor solución.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
              >
                Consultar
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center rounded-full border border-slate-900 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
              >
                Volver a Servicios
              </Link>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{service.title} | BS</title>
        <meta
          name="description"
          content={`Más información sobre ${service.title}: pronto estará disponible con detalles personalizados.`}
        />
      </Head>
      <ServicePageTemplate service={service} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = services.map((service) => ({
    params: { slug: service.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return { notFound: true };
  }

  return {
    props: {
      service,
    },
  };
};
