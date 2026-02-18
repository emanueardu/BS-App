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
        <title>Registro | BS</title>
      </Head>

      <div className="mx-auto max-w-xl rounded-3xl bg-white/60 p-8 shadow-xl shadow-orange-100 backdrop-blur-sm">
        <h1 className="text-3xl font-semibold text-slate-900">
          Crear cuenta de cliente
        </h1>
        <p className="text-sm text-slate-600">
          Registra tu correo para seguir tus obras y descargar documentos.
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
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
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
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800">
              Confirmar contraseña
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              placeholder="Repite tu contraseña"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-orange-50 px-3 py-2 text-sm text-orange-700">
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
            className="w-full rounded-full bg-orange-600 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
          >
            {submitting ? "Creando..." : "Crear cuenta"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-700">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold text-orange-700">
            Ingresar
          </Link>
        </p>
      </div>
    </>
  );
}
