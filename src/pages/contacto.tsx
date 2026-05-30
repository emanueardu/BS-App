import { VideoHero } from "@/components/VideoHero";
import { services } from "@/data/services";
import { Globe, Mail, MapPin, MessageCircle } from "lucide-react";
import Head from "next/head";
import { FormEvent, useState } from "react";

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

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: typeof Globe;
  label: string;
  value: string;
}) {
  const Icon = icon;
  return (
    <div className="flex items-center gap-4">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-copper/12 text-brand-copper">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="eyebrow text-[11px]">{label}</p>
        <p className="mt-1 font-display text-base font-semibold text-brand-text">{value}</p>
      </div>
    </div>
  );
}

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo enviar la consulta.");
      }

      setSubmitted(true);
      setForm(initialData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo enviar la consulta."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contacto | SUR INGENIERIA</title>
      </Head>

      <VideoHero
        eyebrow="Contacto"
        title="Hablemos de tu proyecto."
        description="Contanos que necesitas y coordinamos una visita tecnica sin cargo. Respondemos consultas dentro de las 24 horas."
        videoSrc="/hero-video.mp4"
        actions={[
          {
            href: "https://wa.me/5491125207068",
            label: "WhatsApp",
            variant: "energy",
            icon: <MessageCircle className="h-4 w-4" />,
          },
          {
            href: "mailto:info@suringenieriasrl.com",
            label: "Escribir un mail",
            variant: "ghost-dark",
            icon: <Mail className="h-4 w-4" />,
          },
        ]}
        className="min-h-[62svh]"
      />

      <div className="grid gap-7 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="surface-card p-8">
          <h1 className="text-3xl font-semibold text-brand-text">Pedi tu relevamiento</h1>
          <p className="mt-2 text-sm leading-6 text-brand-text-muted">
            Completamos tu consulta, evaluamos alcance y coordinamos la visita tecnica.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-brand-text">
                  Nombre y apellido
                </label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  required
                  className="form-input mt-2"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-text">
                  Telefono
                </label>
                <input
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  required
                  className="form-input mt-2"
                  placeholder="+54 9 ..."
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-brand-text">Correo</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="form-input mt-2"
                  placeholder="vos@correo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-text">Zona</label>
                <input
                  type="text"
                  value={form.zona}
                  onChange={(e) => setForm({ ...form, zona: e.target.value })}
                  required
                  className="form-input mt-2"
                  placeholder="AMBA / alrededores"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-text">
                Servicio de interes
              </label>
              <select
                value={form.servicio}
                onChange={(e) => setForm({ ...form, servicio: e.target.value })}
                required
                className="form-select mt-2"
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
                Contanos sobre tu obra
              </label>
              <textarea
                value={form.mensaje}
                onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                rows={5}
                required
                className="form-textarea mt-2"
                placeholder="Tipo de propiedad, etapa, prioridades y cualquier dato util para preparar la propuesta."
              />
            </div>

            <button type="submit" disabled={submitting} className="btn btn-primary w-full">
              {submitting ? "Enviando..." : "Enviar consulta"}
            </button>

            {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}
            {submitted ? (
              <p className="rounded-2xl bg-brand-energy/14 px-4 py-3 text-sm font-semibold text-[#17784a]">
                Recibido. Te respondemos dentro de las 24 horas.
              </p>
            ) : null}
          </form>
        </div>

        <div className="space-y-4">
          <div className="surface-card p-6">
            <InfoRow icon={MessageCircle} label="WhatsApp" value="11 2520-7068" />
            <div className="my-5 h-px bg-brand-border" />
            <InfoRow icon={Mail} label="Correo" value="info@suringenieriasrl.com" />
            <div className="my-5 h-px bg-brand-border" />
            <InfoRow icon={Globe} label="Web" value="suringenieriasrl.com" />
          </div>

          <div className="surface-card p-6">
            <p className="eyebrow text-[11px]">Horarios</p>
            <div className="mt-4 space-y-3 text-sm text-brand-text">
              <div className="flex items-center justify-between">
                <span>Lunes a viernes</span>
                <span className="font-display font-semibold">8:00 - 18:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Sabados</span>
                <span className="font-display font-semibold">9:00 - 13:00</span>
              </div>
              <div className="status-pill status-pill-on mt-3">
                <span className="h-2 w-2 rounded-full bg-brand-energy shadow-glow-energy" />
                Respondemos consultas online 24/7
              </div>
            </div>
          </div>

          <div className="surface-card overflow-hidden p-0">
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-brand-navy via-brand-blue to-brand-blue-mid">
              <MapPin className="h-9 w-9 text-[#9deaf2]" />
            </div>
            <div className="p-5">
              <p className="font-display text-lg font-semibold text-brand-text">
                Zona de cobertura
              </p>
              <p className="mt-2 text-sm leading-6 text-brand-text-muted">
                AMBA y alrededores. Consultanos por obras fuera del area.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
