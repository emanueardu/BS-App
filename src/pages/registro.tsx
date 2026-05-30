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
      setError("Las contrasenas no coinciden.");
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
      setError(
        (err as Error)?.message ??
          "No pudimos registrar la cuenta. Intenta mas tarde."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Registro | SUR INGENIERIA</title>
      </Head>

      <div className="mx-auto max-w-xl pt-6">
        <div className="section-shell px-8 py-9">
          <p className="eyebrow">Portal privado</p>
          <h1 className="mt-2 text-3xl font-semibold text-brand-text">
            Crear cuenta de cliente
          </h1>
          <p className="mt-2 text-sm leading-6 text-brand-text-muted">
            Registra tu correo para seguir obras, descargar documentos y acceder a Mi Home.
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
                placeholder="Minimo 6 caracteres"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-text">
                Confirmar contrasena
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="form-input mt-2"
                placeholder="Repite tu contrasena"
              />
            </div>

            {error ? (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </p>
            ) : null}
            {message ? (
              <p className="rounded-2xl bg-brand-energy/14 px-4 py-3 text-sm font-semibold text-[#17784a]">
                {message}
              </p>
            ) : null}

            <button type="submit" disabled={submitting} className="btn btn-primary w-full">
              {submitting ? "Creando..." : "Crear cuenta"}
            </button>
          </form>

          <p className="mt-4 text-sm text-brand-text-muted">
            Ya tienes cuenta?
            <Link href="/login" className="ml-1 font-semibold text-brand-copper">
              Ingresar
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
