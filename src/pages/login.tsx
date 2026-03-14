import { useAuth } from "@/context/AuthContext";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

export default function Login() {
  const { signIn, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, router, user]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
    } catch (err) {
      const message =
        (err as Error)?.message ?? "No pudimos iniciar sesion. Intenta nuevamente.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Ingresar | SUR INGENIERÍA</title>
      </Head>
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="rounded-3xl bg-brand-surface/60 p-8 shadow-xl shadow-brand-sand backdrop-blur-sm">
          <h1 className="text-3xl font-semibold text-brand-text">Ingresar</h1>
          <p className="mt-2 text-sm text-brand-text-muted">
            Si ya tienes cuenta, desde aqui accedes a tu portal con avance de
            obra, documentacion y modulo Mi Home.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-text">
                Correo
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-brand-border bg-brand-surface/80 px-4 py-3 text-sm text-brand-text outline-none focus:border-brand-copper focus:ring-2 focus:ring-brand-sand"
                placeholder="cliente@correo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-text">
                Contrasena
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-brand-border bg-brand-surface/80 px-4 py-3 text-sm text-brand-text outline-none focus:border-brand-copper focus:ring-2 focus:ring-brand-sand"
                placeholder="********"
              />
            </div>
            {error && (
              <p className="rounded-lg bg-brand-bg-alt px-3 py-2 text-sm text-brand-copper">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-brand-copper px-4 py-3 text-sm font-semibold text-brand-text-on-dark transition hover:-translate-y-0.5 hover:bg-brand-copper disabled:cursor-not-allowed disabled:bg-brand-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sand"
            >
              {submitting ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-brand-border bg-brand-surface/60 p-6 shadow-sm backdrop-blur-sm">
          <p className="text-sm text-brand-text-muted">
            Aun no tienes cuenta cliente?
            <Link href="/registro" className="ml-1 font-semibold text-brand-copper">
              Crear cuenta
            </Link>
          </p>
          <p className="mt-2 text-sm text-brand-text-muted">
            Quieres conocer el flujo antes de registrarte?
            <Link href="/portal" className="ml-1 font-semibold text-brand-text">
              Ver Demo Portal
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
