import Head from "next/head";
import { FormEvent, useState } from "react";
import { services } from "@/data/services";
import { openVoltiChat } from "@/utils/volti";

type FormData = {
  nombre: string;
  zona: string;
  email: string;
  telefono: string;
  servicio: string;
  mensaje: string;
};

const initialData: FormData = {
  nombre: "",
  zona: "",
  email: "",
  telefono: "",
  servicio: services[0]?.title ?? "",
  mensaje: "",
};

export default function Contacto() {
  const [form, setForm] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(false);
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo enviar la consulta.");
      }

      setSubmitted(true);
      setForm(initialData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo enviar la consulta."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contacto | SUR INGENIERÍA</title>
      </Head>

      <div className="grid gap-10 rounded-3xl bg-brand-surface/60 p-8 shadow-lg shadow-brand-sand backdrop-blur-sm lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-copper">
            Contáctanos
          </p>
          <h1 className="text-3xl font-semibold text-brand-text">
            Agenda un relevamiento o solicita una propuesta.
          </h1>
          <p className="text-base text-brand-text-muted">
            Completa el formulario y coordinamos una visita para evaluar tu
            obra. Te tespondneremos en la brevedad.
          </p>

          <div className="rounded-2xl border border-brand-border/70 bg-brand-surface/50 p-4 backdrop-blur-sm">
            <p className="text-sm font-semibold text-brand-text">
              También puedes escribirnos
            </p>
            <p className="text-sm text-brand-text-muted">
              Teléfono: 11 2520-7068
              <br />
              Email: info@suringenieriasrl.com
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
          onSubmit={handleSubmit}
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
              required
              className="mt-2 w-full rounded-lg border border-brand-border bg-brand-surface/80 px-4 py-2 text-sm text-brand-text outline-none focus:border-brand-copper focus:ring-2 focus:ring-brand-sand"
              placeholder="Ej: Sofía Rodríguez"
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
              required
              className="mt-2 w-full rounded-lg border border-brand-border bg-brand-surface/80 px-4 py-2 text-sm text-brand-text outline-none focus:border-brand-copper focus:ring-2 focus:ring-brand-sand"
              placeholder="Ej: Canning, San Vicente, Zona Norte"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-brand-text">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="mt-2 w-full rounded-lg border border-brand-border bg-brand-surface/80 px-4 py-2 text-sm text-brand-text outline-none focus:border-brand-copper focus:ring-2 focus:ring-brand-sand"
                placeholder="Ej: nombre@correo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-text">
                Teléfono
              </label>
              <input
                type="tel"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                required
                className="mt-2 w-full rounded-lg border border-brand-border bg-brand-surface/80 px-4 py-2 text-sm text-brand-text outline-none focus:border-brand-copper focus:ring-2 focus:ring-brand-sand"
                placeholder="Ej: 11 2520-7068"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-brand-text">
              Tipo de servicio
            </label>
            <select
              value={form.servicio}
              onChange={(e) => setForm({ ...form, servicio: e.target.value })}
              required
              className="mt-2 w-full rounded-lg border border-brand-border bg-brand-surface/80 px-4 py-2 text-sm text-brand-text outline-none focus:border-brand-copper focus:ring-2 focus:ring-brand-sand"
            >
              {services.map((service) => (
                <option key={service.id} value={service.title}>
                  {service.title}
                </option>
              ))}
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
              required
              className="mt-2 w-full rounded-lg border border-brand-border bg-brand-surface/80 px-4 py-2 text-sm text-brand-text outline-none focus:border-brand-copper focus:ring-2 focus:ring-brand-sand"
              placeholder="Contanos sobre tu obra, medidas, plazos y cualquier dato útil para preparar la propuesta."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-brand-copper px-4 py-3 text-sm font-semibold text-brand-text-on-dark transition hover:-translate-y-0.5 hover:bg-brand-copper disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sand"
          >
            {submitting ? "Enviando..." : "Enviar mensaje"}
          </button>

          {error && (
            <p className="text-sm font-semibold text-red-600">{error}</p>
          )}

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
