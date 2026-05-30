import Image from "next/image";
import Link from "next/link";
import { SHOW_PROJECTS_SECTION } from "@/data/site";

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-brand-border bg-white/72 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-brand-border bg-white shadow-e1">
            <Image
              src="/brand/logo.png"
              alt="Logo SUR INGENIERIA"
              fill
              sizes="48px"
              className="object-contain p-1"
            />
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-brand-text">
              SUR INGENIERIA
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-copper">
              Domotica y electricidad residencial
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-brand-text-muted">
          <Link href="/servicios" className="transition hover:text-brand-copper">
            Servicios
          </Link>
          <Link href="/proceso" className="transition hover:text-brand-copper">
            Proceso
          </Link>
          {SHOW_PROJECTS_SECTION ? (
            <Link href="/proyectos" className="transition hover:text-brand-copper">
              Proyectos
            </Link>
          ) : null}
          <Link href="/portal" className="transition hover:text-brand-copper">
            Demo Portal
          </Link>
        </div>
      </div>
    </footer>
  );
};
