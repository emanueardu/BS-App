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
        (err as Error)?.message ?? "No pudimos iniciar sesión. Intenta nuevamente.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Ingresar | BS</title>
      </Head>
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-xl shadow-orange-100">
        <h1 className="text-3xl font-semibold text-slate-900">Ingresar</h1>
        <p className="text-sm text-slate-600">
          Usa el correo con el que registraste tu obra. Si aún no tenés cuenta,
          pasá a registro.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-800">
              Correo
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              placeholder="cliente@correo.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="rounded-lg bg-orange-50 px-3 py-2 text-sm text-orange-700">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {submitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-700">
          ¿No tienes usuario?{" "}
          <Link href="/registro" className="font-semibold text-orange-700">
            Crear cuenta
          </Link>
        </p>
      </div>
    </>
  );
}
