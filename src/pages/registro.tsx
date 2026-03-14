import { useAuth } from "@/context/AuthContext";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Registro() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setSubmitting(true);
    try {
      await signUp(email, password);
      setMessage(
        "Usuario creado. Revisa tu correo para confirmar la cuenta y luego ingresa."
      );
      setEmail("");
      setPassword("");
      setConfirm("");
    } catch (err) {
      const errMsg =
        (err as Error)?.message ??
        "No pudimos registrar la cuenta. Intenta más tarde.";
      setError(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Registro | SUR INGENIERÍA</title>
      </Head>

      <div className="mx-auto max-w-xl rounded-3xl bg-brand-surface/60 p-8 shadow-xl shadow-brand-sand backdrop-blur-sm">
        <h1 className="text-3xl font-semibold text-brand-text">
          Crear cuenta de cliente
        </h1>
        <p className="text-sm text-brand-text-muted">
          Registra tu correo para seguir tus obras y descargar documentos.
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
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-brand-border bg-brand-surface/80 px-4 py-3 text-sm text-brand-text outline-none focus:border-brand-copper focus:ring-2 focus:ring-brand-sand"
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-text">
              Confirmar contraseña
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-brand-border bg-brand-surface/80 px-4 py-3 text-sm text-brand-text outline-none focus:border-brand-copper focus:ring-2 focus:ring-brand-sand"
              placeholder="Repite tu contraseña"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-brand-bg-alt px-3 py-2 text-sm text-brand-copper">
              {error}
            </p>
          )}
          {message && (
            <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-brand-copper px-4 py-3 text-sm font-semibold text-brand-text-on-dark transition hover:-translate-y-0.5 hover:bg-brand-copper disabled:cursor-not-allowed disabled:bg-brand-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sand"
          >
            {submitting ? "Creando..." : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-4 text-sm text-brand-text-muted">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold text-brand-copper">
            Ingresar
          </Link>
        </p>
      </div>
    </>
  );
}
