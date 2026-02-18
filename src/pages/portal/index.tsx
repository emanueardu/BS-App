import {
  ArrowRightIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import Head from "next/head";
import Link from "next/link";

const features = [
  {
    title: "Mi Home",
    description:
      "Control de luces, aires y rutinas por ambiente con vista de consumo y estado en tiempo real.",
    icon: HomeModernIcon,
  },
  {
    title: "Documentacion",
    description:
      "Planos unifilares, habilitacion, certificados, manuales y entregables tecnicos en un solo lugar.",
    icon: DocumentTextIcon,
  },
  {
    title: "Avance de obra",
    description:
      "Etapas, checklist, proximas visitas y registro fotografico de cada frente de trabajo.",
    icon: ClipboardDocumentCheckIcon,
  },
];

export default function PortalLanding() {
  return (
    <>
      <Head>
        <title>Demo Portal | BS</title>
        <meta
          name="description"
          content="Demo del portal de cliente: Mi Home, documentacion y avance de obra en una sola experiencia."
        />
      </Head>

      <section className="rounded-3xl bg-white/60 p-8 shadow-sm shadow-orange-100 backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          Demo Portal
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Asi se vera el portal del cliente cuando ingrese con su cuenta.
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          El acceso real del cliente se hace desde Ingresar. Esta pagina muestra
          una demo funcional para validar experiencia, contenidos y estructura
          antes de paquetizarlo como app.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/portal/demo"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
          >
            Ver demo
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-slate-900 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
          >
            Ingresar a mi portal
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article
              key={feature.title}
              className="rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-slate-900">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {feature.description}
              </p>
            </article>
          );
        })}
      </section>

      <section className="mt-8 rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-slate-900">
          Flujo previsto para clientes con cuenta
        </h3>
        <ol className="mt-3 space-y-2 text-sm text-slate-700">
          <li>1. Ingresa con su usuario y accede a Mi Portal.</li>
          <li>2. Revisa el avance de obra, visitas y evidencias cargadas.</li>
          <li>3. Descarga documentacion tecnica y administrativa.</li>
          <li>4. Usa Mi Home para control de la vivienda y rutinas.</li>
        </ol>
      </section>
    </>
  );
}
