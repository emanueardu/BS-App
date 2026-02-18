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
        <title>Contacto | BS</title>
      </Head>

      <div className="grid gap-10 rounded-3xl bg-white/60 p-8 shadow-lg shadow-orange-100 backdrop-blur-sm lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
            Contáctanos
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Agenda un relevamiento o solicita una propuesta.
          </h1>
          <p className="text-base text-slate-700">
            Completa el formulario y coordinamos una visita para evaluar tu
            obra. Respondemos en menos de 24 horas hábiles.
          </p>

          <div className="rounded-2xl border border-slate-300/70 bg-white/50 p-4 backdrop-blur-sm">
            <p className="text-sm font-semibold text-slate-900">
              También puedes escribirnos
            </p>
            <p className="text-sm text-slate-700">
              Teléfono: +54 11 5555-0000
              <br />
              Email: hola@bselectrica.com
            </p>
          </div>
          <button
            onClick={openVoltiChat}
            className="rounded-full border border-slate-900 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
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
          className="space-y-4 rounded-2xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-800">
              Nombre y apellido
            </label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white/80 px-4 py-2 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              placeholder="Ej: Sofía Rodríguez"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800">
              Zona / ciudad
            </label>
            <input
              type="text"
              value={form.zona}
              onChange={(e) => setForm({ ...form, zona: e.target.value })}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white/80 px-4 py-2 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              placeholder="Ej: Nordelta, Palermo, Zona Norte"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800">
              Tipo de servicio
            </label>
            <select
              value={form.servicio}
              onChange={(e) => setForm({ ...form, servicio: e.target.value })}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white/80 px-4 py-2 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            >
              <option>Instalacion electrica segura</option>
              <option>Preparacion domotica</option>
              <option>Domotica integral</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800">
              Mensaje
            </label>
            <textarea
              value={form.mensaje}
              onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
              rows={4}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white/80 px-4 py-2 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              placeholder="Contanos sobre tu obra, medidas y urgencia."
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-orange-600 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
          >
            Enviar mensaje
          </button>

          {submitted && (
            <p className="text-sm font-semibold text-orange-700">
              Recibido, te respondemos en 24h.
            </p>
          )}
        </form>
      </div>
    </>
  );
}
