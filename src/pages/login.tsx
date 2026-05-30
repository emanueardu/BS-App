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
      setError(
        (err as Error)?.message ?? "No pudimos iniciar sesion. Intenta nuevamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Ingresar | SUR INGENIERIA</title>
      </Head>
      <div className="mx-auto max-w-2xl space-y-5 pt-6">
        <div className="section-shell px-8 py-9">
          <p className="eyebrow">Portal privado</p>
          <h1 className="mt-2 text-3xl font-semibold text-brand-text">Ingresar</h1>
          <p className="mt-2 text-sm leading-6 text-brand-text-muted">
            Accede a tu portal con avance de obra, documentacion y modulo Mi Home.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-text">Correo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input mt-2"
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
                className="form-input mt-2"
                placeholder="********"
              />
            </div>
            {error ? (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </p>
            ) : null}
            <button type="submit" disabled={submitting} className="btn btn-primary w-full">
              {submitting ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>

        <div className="surface-card p-6">
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
