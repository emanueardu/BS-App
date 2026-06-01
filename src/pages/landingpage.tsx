import { VideoHero } from "@/components/VideoHero";
import { services } from "@/data/services";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Check,
  ClipboardList,
  FileText,
  Gauge,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

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
  servicio: "Relevamiento tecnico",
  mensaje: "",
};

const serviceFocus = [
  "Instalaciones electricas residenciales",
  "Preparacion domotica para obra nueva o reforma",
  "Domotica integral, clima y accesos",
  "Seguridad electronica y documentacion tecnica",
];

const process = [
  {
    title: "Visita y relevamiento",
    description:
      "Analizamos la vivienda, la etapa de obra, prioridades y condicionantes tecnicos antes de proponer una solucion.",
    icon: MapPin,
  },
  {
    title: "Alcance definido",
    description:
      "Recibes una propuesta clara con criterios tecnicos, incluye/excluye, materiales y forma de ejecucion.",
    icon: ClipboardList,
  },
  {
    title: "Obra bien resuelta",
    description:
      "Si avanzas con nosotros, ejecutamos con orden, documentacion y seguimiento real desde el portal.",
    icon: Wrench,
  },
];

function HeroAside() {
  return (
    <div className="overflow-hidden rounded-[inherit]">
      <div className="border-b border-white/10 bg-white/10 px-6 py-4">
        <p className="eyebrow text-brand-sand">Que recibes</p>
        <p className="mt-1 font-display text-lg font-semibold text-brand-text-on-dark">
          Diagnostico inicial y propuesta clara
        </p>
      </div>
      <div className="space-y-3 px-6 py-6">
        {[
          "Evaluacion tecnica segun etapa de obra",
          "Definicion de prioridades y riesgos",
          "Propuesta con alcance e incluye/excluye",
          "Orientacion sobre instalacion, domotica o seguridad",
        ].map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-brand-text-on-dark/86"
          >
            <Check className="mt-0.5 h-4 w-4 text-brand-energy" />
            <span>{item}</span>
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
            <p className="text-xs text-brand-text-on-dark/70">Respuesta</p>
            <p className="mt-1 text-base font-semibold text-brand-text-on-dark">
              24 horas
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
            <p className="text-xs text-brand-text-on-dark/70">Cobertura</p>
            <p className="mt-1 text-base font-semibold text-brand-text-on-dark">
              AMBA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [form, setForm] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const popularServices = useMemo(() => services.slice(0, 4), []);

  const scrollToForm = () => {
    if (typeof document === "undefined") return;
    document.getElementById("lead-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
        <title>Landing Page | SUR INGENIERIA</title>
        <meta
          name="description"
          content="Solicita un relevamiento tecnico con SUR INGENIERIA para evaluar instalaciones electricas, domotica, seguridad y alcance de obra residencial."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://www.suringenieriasrl.com/landingpage" />
      </Head>

      <div className="absolute left-0 right-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/25 bg-white shadow-glow-electric">
              <Image
                src="/brand/logo.png"
                alt="Logo SUR INGENIERIA"
                fill
                sizes="48px"
                className="object-contain p-1"
                priority
              />
            </div>
            <div>
              <p className="font-display text-xl font-bold tracking-[0.08em] text-brand-text-on-dark">
                SUR INGENIERIA
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-energy">
                Domotica y electricidad residencial
              </p>
            </div>
          </Link>

          <Link href="/" className="btn btn-ghost-dark px-4 py-2 text-sm">
            Entrar al sitio
          </Link>
        </div>
      </div>

      <VideoHero
        eyebrow="Relevamiento tecnico"
        title="Define bien tu obra antes de ejecutar."
        description="Evaluamos la vivienda, detectamos riesgos, ordenamos prioridades y te enviamos una propuesta clara para instalaciones electricas, domotica y seguridad residencial."
        videoSrc="/hero-video.mp4"
        actions={[
          {
            href: "#lead-form",
            label: "Pedir relevamiento",
            icon: <ArrowRight className="h-4 w-4" />,
          },
          {
            href: "/",
            label: "Conocer SUR INGENIERIA",
            variant: "ghost-dark",
          },
        ]}
        panelAside={<HeroAside />}
        className="min-h-[72svh]"
        flushToTop
      >
        <div className="mt-6 flex flex-wrap gap-2 text-sm text-brand-text-on-dark/84">
          <span className="rounded-full border border-white/14 px-3 py-1">
            Viviendas nuevas y reformas
          </span>
          <span className="rounded-full border border-white/14 px-3 py-1">
            Instalacion electrica + domotica
          </span>
          <span className="rounded-full border border-white/14 px-3 py-1">
            Alcance claro y documentado
          </span>
        </div>
      </VideoHero>

      <div className="mx-auto w-full max-w-6xl space-y-14 px-6 py-12">
        <section className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Menos improvisacion",
              description:
                "Definimos criterios tecnicos y prioridades antes de tocar la obra.",
              icon: ShieldCheck,
            },
            {
              title: "Mas claridad comercial",
              description:
                "Recibes una propuesta con alcance, materiales, incluye/excluye y forma de trabajo.",
              icon: FileText,
            },
            {
              title: "Base para crecer",
              description:
                "Pensamos la instalacion para el uso actual y para futuras ampliaciones.",
              icon: Gauge,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="surface-card p-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-copper/12 text-brand-copper">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-brand-text">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-brand-text-muted">
                  {item.description}
                </p>
              </article>
            );
          })}
        </section>

        <section className="section-shell px-8 py-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <p className="eyebrow">Cuando conviene pedirlo</p>
              <h2 className="mt-2 text-3xl font-semibold text-brand-text sm:text-4xl">
                Si tu obra todavia no esta bien definida, este es el paso correcto.
              </h2>
              <p className="mt-4 text-base leading-7 text-brand-text-muted">
                El relevamiento sirve para ordenar decisiones antes de ejecutar:
                instalacion electrica, preparacion domotica, seguridad, clima y
                documentacion tecnica.
              </p>
              <div className="mt-6 grid gap-3">
                {[
                  "Obra nueva o remodelacion donde todavia faltan definiciones tecnicas.",
                  "Vivienda terminada que necesita actualizar tablero, circuitos, clima o automatizacion.",
                  "Cliente que quiere domotica util, sin gadgets sueltos ni rehacer obra despues.",
                  "Arquitectos o estudios que necesitan una empresa tecnica, prolija y previsible.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-brand-bg px-4 py-4 text-sm text-brand-text"
                  >
                    <BadgeCheck className="mt-0.5 h-4 w-4 text-brand-energy" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-brand-navy px-6 py-6 text-brand-text-on-dark shadow-e4">
              <p className="eyebrow eyebrow-dark">Incluye</p>
              <div className="mt-5 space-y-4">
                {[
                  "Analisis inicial segun etapa de obra y objetivos del proyecto.",
                  "Deteccion de riesgos, faltantes o decisiones que conviene resolver antes.",
                  "Recomendacion tecnica para electricidad, domotica o seguridad.",
                  "Propuesta posterior con alcance claro, materiales y forma de trabajo.",
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-brand-text-on-dark/84">
                    <Check className="mt-1 h-4 w-4 text-brand-energy" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.08em] text-brand-sand">
                  Resultado esperado
                </p>
                <p className="mt-2 text-base font-semibold">
                  Menos dudas, menos retrabajo y una base tecnica real para avanzar bien.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-3xl">
            <p className="eyebrow">Proceso</p>
            <h2 className="mt-2 text-3xl font-semibold text-brand-text sm:text-4xl">
              Como trabajamos desde la primera visita.
            </h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {process.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="surface-card p-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-brand-copper">
                      0{index + 1}
                    </span>
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-copper/12 text-brand-copper">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-brand-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-brand-text-muted">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section-shell px-8 py-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow">Servicios que solemos detectar</p>
              <h2 className="mt-2 text-3xl font-semibold text-brand-text sm:text-4xl">
                El relevamiento ordena la obra y define que hace falta primero.
              </h2>
            </div>
            <Link href="/" className="btn btn-outline">
              Entrar al sitio principal
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {popularServices.map((service, index) => (
              <article key={service.id} className="surface-card p-5">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-copper/12 text-brand-copper">
                  {index === 0 ? (
                    <Zap className="h-5 w-5" />
                  ) : index === 1 ? (
                    <Sparkles className="h-5 w-5" />
                  ) : index === 2 ? (
                    <CalendarClock className="h-5 w-5" />
                  ) : (
                    <ShieldCheck className="h-5 w-5" />
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-brand-text">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-brand-text-muted">
                  {service.subtitle}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {serviceFocus.map((item) => (
              <span
                key={item}
                className="rounded-full border border-brand-border bg-white px-3 py-1.5 text-sm font-medium text-brand-text"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section
          id="lead-form"
          className="grid scroll-mt-28 gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-start"
        >
          <div className="section-shell px-8 py-9">
            <p className="eyebrow">Solicitar visita</p>
            <h2 className="mt-2 text-3xl font-semibold text-brand-text">
              Pide tu relevamiento tecnico.
            </h2>
            <p className="mt-3 text-sm leading-6 text-brand-text-muted">
              Cuentanos en que etapa esta la vivienda y que quieres resolver.
              Te contactamos para ordenar el siguiente paso.
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
                  <label className="block text-sm font-semibold text-brand-text">
                    Correo
                  </label>
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
                  <label className="block text-sm font-semibold text-brand-text">
                    Zona
                  </label>
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
                  className="form-select mt-2"
                >
                  <option value="Relevamiento tecnico">Relevamiento tecnico</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-text">
                  Describe brevemente la obra
                </label>
                <textarea
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  rows={5}
                  required
                  className="form-textarea mt-2"
                  placeholder="Obra nueva, reforma, tablero, domotica, seguridad, tiempos y prioridades."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary w-full"
              >
                {submitting ? "Enviando..." : "Solicitar relevamiento"}
              </button>

              {error ? (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </p>
              ) : null}

              {submitted ? (
                <p className="rounded-2xl bg-brand-energy/14 px-4 py-3 text-sm font-semibold text-[#17784a]">
                  Consulta enviada. Te contactamos para coordinar la visita.
                </p>
              ) : null}
            </form>
          </div>

          <div className="space-y-4">
            <div className="section-shell-dark px-6 py-6">
              <p className="eyebrow eyebrow-dark">Por que SUR INGENIERIA</p>
              <div className="mt-5 space-y-4">
                {[
                  "Empresa tecnica, prolija y previsible.",
                  "No improvisamos ni empujamos soluciones sin criterio.",
                  "Proyecto, ejecucion y respaldo por un solo equipo.",
                  "Seguimiento digital, documentacion y base para crecer.",
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-brand-text-on-dark/84">
                    <Check className="mt-1 h-4 w-4 text-brand-energy" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-shell px-6 py-6">
              <p className="eyebrow">Contacto directo</p>
              <div className="mt-4 space-y-3 text-sm text-brand-text">
                <a
                  href="https://wa.me/5491125207068"
                  className="flex items-center gap-3 rounded-2xl bg-brand-bg px-4 py-3 transition hover:bg-brand-bg-alt"
                >
                  <MessageCircle className="h-5 w-5 text-brand-copper" />
                  <span>WhatsApp: 11 2520-7068</span>
                </a>
                <a
                  href="mailto:info@suringenieriasrl.com"
                  className="flex items-center gap-3 rounded-2xl bg-brand-bg px-4 py-3 transition hover:bg-brand-bg-alt"
                >
                  <FileText className="h-5 w-5 text-brand-copper" />
                  <span>info@suringenieriasrl.com</span>
                </a>
                <div className="flex items-center gap-3 rounded-2xl bg-brand-bg px-4 py-3">
                  <CalendarClock className="h-5 w-5 text-brand-copper" />
                  <span>Respuesta comercial dentro de las 24 horas</span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-brand-copper via-brand-copper-soft to-brand-energy px-6 py-6 shadow-glow-electric">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#063a42]">
                CTA rapido
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-[#04262b]">
                Si ya sabes que quieres resolver, agenda el relevamiento ahora.
              </h3>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button onClick={scrollToForm} className="btn btn-navy">
                  Ir al formulario
                </button>
                <Link href="/" className="btn btn-outline border-brand-navy/20 bg-white/72">
                  Entrar al sitio
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
