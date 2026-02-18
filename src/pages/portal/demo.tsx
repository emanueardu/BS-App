import Head from "next/head";
import Link from "next/link";
import { openVoltiChat } from "@/utils/volti";

const timeline = [
  "Relevamiento completado",
  "Diseño aprobado",
  "Compras iniciadas",
  "Obra en curso",
  "Entrega + soporte",
];

const checklist = [
  { item: "Tablero principal", status: "Completado" },
  { item: "Canalizaciones", status: "En progreso" },
  { item: "Automatización escenas", status: "Pendiente" },
];

const documentos = [
  "Plano unifilar.pdf",
  "Cotización firmada.pdf",
  "Certificado medición.pdf",
  "Manual de uso.pdf",
];

const cambios = [
  "07/02 - Cliente aprobó escenas de iluminación",
  "05/02 - Se cargaron fotos de canalizaciones",
  "02/02 - Se actualizó cronograma de entregas",
];

export default function PortalDemo() {
  return (
    <>
      <Head>
        <title>Demo Portal | BS</title>
      </Head>
      <section className="rounded-3xl bg-white/60 p-8 shadow-sm shadow-orange-100 backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          Demo del portal
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Visión del cliente: avances, checklist, documentos y tickets.
        </h1>
        <p className="text-sm text-slate-600">
          Ejemplo de cómo cada cliente sigue su obra. No es autenticación real.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contacto"
            className="rounded-full bg-orange-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
          >
            Pedir relevamiento
          </Link>
          <button
            onClick={openVoltiChat}
            className="rounded-full border border-slate-900 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
          >
            Hablar con Volti
          </button>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Timeline de obra
          </h2>
          <ol className="mt-3 space-y-2 text-sm text-slate-700">
            {timeline.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ol>
        </div>
        <div className="rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-slate-900">Checklist</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {checklist.map((item) => (
              <li key={item.item}>
                • {item.item} — {item.status}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-slate-900">Documentos</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {documentos.map((doc) => (
              <li key={doc}>• {doc}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Historial de cambios
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {cambios.map((cambio) => (
              <li key={cambio}>• {cambio}</li>
            ))}
          </ul>
          <button
            onClick={openVoltiChat}
            className="mt-4 rounded-full border border-slate-900 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
          >
            Crear ticket / pedir soporte
          </button>
        </div>
      </section>
    </>
  );
}
