import Head from "next/head";
import Link from "next/link";
import { openVoltiChat } from "@/utils/volti";

const valores = [
  "Seguridad y cumplimiento AEA/IRAM",
  "Calidad y prolijidad en montaje",
  "Procesos claros y documentaciÃ³n entregable",
  "Escalabilidad y soporte post-obra",
  "Si no se puede hacer bien, no se hace",
];

export default function Nosotros() {
  return (
    <>
      <Head>
        <title>Nosotros | SUR INGENIERÍA</title>
      </Head>
      <section className="rounded-3xl bg-brand-surface/60 p-8 shadow-sm shadow-brand-sand backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-copper">
          Nosotros
        </p>
        <h1 className="text-3xl font-semibold text-brand-text">
          Empresa tÃ©cnica, prolija y previsible. No competimos por precio, sino
          por calidad.
        </h1>
        <p className="text-sm text-brand-text-muted">
          No instalamos nada que no estÃ© bien hecho, aunque el cliente lo pida.
          Trabajamos con procesos, documentaciÃ³n y materiales certificados.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contacto"
            className="rounded-full bg-brand-copper px-5 py-2 text-sm font-semibold text-brand-text-on-dark transition hover:bg-brand-copper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sand"
          >
            Pedir relevamiento
          </Link>
          <button
            onClick={openVoltiChat}
            className="rounded-full border border-brand-navy px-5 py-2 text-sm font-semibold text-brand-text transition hover:bg-brand-navy hover:text-brand-text-on-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sand"
          >
            Hablar con Volti
          </button>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-brand-border bg-brand-surface/60 p-6 shadow-sm backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-brand-text">Valores</h2>
        <ul className="mt-3 space-y-2 text-sm text-brand-text-muted">
          {valores.map((item) => (
            <li key={item}>â€¢ {item}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
