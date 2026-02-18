import Link from "next/link";
import { SHOW_PROJECTS_SECTION } from "@/data/site";
import { openVoltiChat } from "@/utils/volti";

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-300/70 bg-white/60 backdrop-blur-sm">
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
          {SHOW_PROJECTS_SECTION ? (
            <Link href="/proyectos" className="hover:text-orange-700">
              Proyectos
            </Link>
          ) : null}
          <Link href="/portal" className="hover:text-orange-700">
            Área Clientes
          </Link>
          <button
            onClick={openVoltiChat}
            className="rounded-full border border-slate-900 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200"
          >
            Hablar con Volti
          </button>
        </div>
      </div>
    </footer>
  );
};
