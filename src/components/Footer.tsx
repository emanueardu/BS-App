import Image from "next/image";
import Link from "next/link";
import { SHOW_PROJECTS_SECTION } from "@/data/site";

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-brand-border/70 bg-brand-surface/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-lg border border-brand-border bg-brand-surface shadow-sm">
            <Image
              src="/brand/logo.png"
              alt="Logo SUR INGENIERÍA"
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-text">SUR INGENIERÍA</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-copper">
              Domótica & Electricidad Residencial
            </p>
          </div>
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
        </div>
      </div>
    </footer>
  );
};
