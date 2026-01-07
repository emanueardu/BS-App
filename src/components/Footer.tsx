import Link from "next/link";
import { openVoltiChat } from "@/utils/volti";

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            BS Electricidad & Domótica
          </p>
          <p className="text-sm text-slate-600">
            Seguridad, prolijidad y cumplimiento. Si no se puede hacer bien, no
            se hace.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-800">
          <Link href="/servicios" className="hover:text-orange-700">
            Servicios
          </Link>
          <Link href="/proyectos" className="hover:text-orange-700">
            Proyectos
          </Link>
          <Link href="/portal" className="hover:text-orange-700">
            Área Clientes
          </Link>
          <button
            onClick={openVoltiChat}
            className="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-700 transition hover:border-orange-300 hover:text-orange-800"
          >
            Hablar con Volti
          </button>
        </div>
      </div>
    </footer>
  );
};
