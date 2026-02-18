import Head from "next/head";
import Link from "next/link";
import { openVoltiChat } from "@/utils/volti";

const valores = [
  "Seguridad y cumplimiento AEA/IRAM",
  "Calidad y prolijidad en montaje",
  "Procesos claros y documentación entregable",
  "Escalabilidad y soporte post-obra",
  "Si no se puede hacer bien, no se hace",
];

export default function Nosotros() {
  return (
    <>
      <Head>
        <title>Nosotros | BS</title>
      </Head>
      <section className="rounded-3xl bg-white/60 p-8 shadow-sm shadow-orange-100 backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
          Nosotros
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Empresa técnica, prolija y previsible. No competimos por precio, sino
          por calidad.
        </h1>
        <p className="text-sm text-slate-600">
          No instalamos nada que no esté bien hecho, aunque el cliente lo pida.
          Trabajamos con procesos, documentación y materiales certificados.
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

      <section className="mt-10 rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-slate-900">Valores</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {valores.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
