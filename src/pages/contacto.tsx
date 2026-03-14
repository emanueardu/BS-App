import Head from "next/head";
import { FormEvent, useState } from "react";
import { openVoltiChat } from "@/utils/volti";

type FormData = {
  nombre: string;
  zona: string;
  servicio: string;
  mensaje: string;
};

const initialData: FormData = {
  nombre: "",
  zona: "",
  servicio: "Instalacion electrica segura",
  mensaje: "",
};

export default function Contacto() {
  const [form, setForm] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Head>
        <title>Contacto | SUR INGENIERÍA</title>
      </Head>

      <div className="grid gap-10 rounded-3xl bg-brand-surface/60 p-8 shadow-lg shadow-brand-sand backdrop-blur-sm lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-copper">
            ContÃ¡ctanos
          </p>
          <h1 className="text-3xl font-semibold text-brand-text">
            Agenda un relevamiento o solicita una propuesta.
          </h1>
          <p className="text-base text-brand-text-muted">
            Completa el formulario y coordinamos una visita para evaluar tu
            obra. Respondemos en menos de 24 horas hÃ¡biles.
          </p>

          <div className="rounded-2xl border border-brand-border/70 bg-brand-surface/50 p-4 backdrop-blur-sm">
            <p className="text-sm font-semibold text-brand-text">
              TambiÃ©n puedes escribirnos
            </p>
            <p className="text-sm text-brand-text-muted">
              TelÃ©fono: +54 11 5555-0000
              <br />
              Email: hola@suringenieria.com
            </p>
          </div>
          <button
            onClick={openVoltiChat}
            className="rounded-full border border-brand-navy px-4 py-2 text-sm font-semibold text-brand-text transition hover:bg-brand-navy hover:text-brand-text-on-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sand"
          >
            Hablar con Volti
          </button>
        </div>

        <form
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            setSubmitted(true);
            setForm(initialData);
          }}
          className="space-y-4 rounded-2xl border border-brand-border bg-brand-surface/60 p-6 shadow-sm backdrop-blur-sm"
        >
          <div>
            <label className="block text-sm font-semibold text-brand-text">
              Nombre y apellido
            </label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="mt-2 w-full rounded-lg border border-brand-border bg-brand-surface/80 px-4 py-2 text-sm text-brand-text outline-none focus:border-brand-copper focus:ring-2 focus:ring-brand-sand"
              placeholder="Ej: SofÃ­a RodrÃ­guez"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-brand-text">
              Zona / ciudad
            </label>
            <input
              type="text"
              value={form.zona}
              onChange={(e) => setForm({ ...form, zona: e.target.value })}
              className="mt-2 w-full rounded-lg border border-brand-border bg-brand-surface/80 px-4 py-2 text-sm text-brand-text outline-none focus:border-brand-copper focus:ring-2 focus:ring-brand-sand"
              placeholder="Ej: Nordelta, Palermo, Zona Norte"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-brand-text">
              Tipo de servicio
            </label>
            <select
              value={form.servicio}
              onChange={(e) => setForm({ ...form, servicio: e.target.value })}
              className="mt-2 w-full rounded-lg border border-brand-border bg-brand-surface/80 px-4 py-2 text-sm text-brand-text outline-none focus:border-brand-copper focus:ring-2 focus:ring-brand-sand"
            >
              <option>Instalacion electrica segura</option>
              <option>Preparacion domótica</option>
              <option>Domótica integral</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-brand-text">
              Mensaje
            </label>
            <textarea
              value={form.mensaje}
              onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
              rows={4}
              className="mt-2 w-full rounded-lg border border-brand-border bg-brand-surface/80 px-4 py-2 text-sm text-brand-text outline-none focus:border-brand-copper focus:ring-2 focus:ring-brand-sand"
              placeholder="Contanos sobre tu obra, medidas y urgencia."
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-brand-copper px-4 py-3 text-sm font-semibold text-brand-text-on-dark transition hover:-translate-y-0.5 hover:bg-brand-copper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sand"
          >
            Enviar mensaje
          </button>

          {submitted && (
            <p className="text-sm font-semibold text-brand-copper">
              Recibido, te respondemos en 24h.
            </p>
          )}
        </form>
      </div>
    </>
  );
}
