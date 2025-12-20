import Head from "next/head";
import { FormEvent, useState } from "react";

type FormData = {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
};

const initialData: FormData = {
  nombre: "",
  email: "",
  telefono: "",
  mensaje: "",
};

export default function Contacto() {
  const [form, setForm] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newErrors: Partial<FormData> = {};
    if (!form.nombre) newErrors.nombre = "Agrega tu nombre.";
    if (!form.email || !form.email.includes("@"))
      newErrors.email = "Usa un correo válido.";
    if (!form.mensaje) newErrors.mensaje = "Cuéntanos qué necesitas.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setForm(initialData);
    }
  };

  return (
    <>
      <Head>
        <title>Contacto | BS</title>
      </Head>

      <div className="grid gap-10 rounded-3xl bg-white/80 p-8 shadow-lg shadow-orange-100 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
            Contáctanos
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Agenda una visita técnica o solicita un presupuesto.
          </h1>
          <p className="text-base text-slate-700">
            Completa el formulario y coordinamos una visita para evaluar tu
            instalación. Respondemos en menos de 24 horas hábiles.
          </p>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">
              También puedes escribirnos
            </p>
            <p className="text-sm text-slate-700">
              Teléfono: +54 11 5555-0000
              <br />
              Email: hola@bselectrica.com
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-800">
              Nombre y apellido
            </label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              placeholder="Ej: Sofía Rodríguez"
            />
            {errors.nombre && (
              <p className="mt-1 text-xs text-orange-700">{errors.nombre}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-800">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                placeholder="nombre@correo.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-orange-700">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800">
                Teléfono
              </label>
              <input
                type="tel"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                placeholder="+54 11 ..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800">
              Mensaje
            </label>
            <textarea
              value={form.mensaje}
              onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
              rows={4}
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              placeholder="Contanos sobre tu obra, medidas y urgencia."
            />
            {errors.mensaje && (
              <p className="mt-1 text-xs text-orange-700">{errors.mensaje}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Enviar mensaje
          </button>

          {submitted && (
            <p className="text-sm font-semibold text-orange-700">
              Gracias, nos contactaremos en breve.
            </p>
          )}
        </form>
      </div>
    </>
  );
}
