import Link from "next/link";
import { SHOW_PROJECTS_SECTION } from "@/data/site";
import { openVoltiChat } from "@/utils/volti";

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-brand-border/70 bg-brand-surface/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-text">SUR INGENIERÍA</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-copper">
            Domótica & Electricidad Residencial
          </p>
          <p className="mt-1 text-sm text-brand-text-muted">
            Seguridad, prolijidad y cumplimiento. Si no se puede hacer bien, no se hace.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-brand-text">
          <Link href="/servicios" className="hover:text-brand-copper">
            Servicios
          </Link>
          {SHOW_PROJECTS_SECTION ? (
            <Link href="/proyectos" className="hover:text-brand-copper">
              Proyectos
            </Link>
          ) : null}
          <Link href="/portal" className="hover:text-brand-copper">
            Demo Portal
          </Link>
          <button
            onClick={openVoltiChat}
            className="rounded-full border border-brand-navy px-4 py-2 text-sm font-semibold text-brand-text transition hover:bg-brand-navy hover:text-brand-text-on-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sand"
          >
            Hablar con Volti
          </button>
        </div>
      </div>
    </footer>
  );
};