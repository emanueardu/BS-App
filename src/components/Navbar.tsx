import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { SHOW_PROJECTS_SECTION } from "@/data/site";
import { isInternalUser } from "@/utils/auth";

const classNames = (...classes: Array<string | boolean | undefined>) =>
  classes.filter(Boolean).join(" ");

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const isInternal = isInternalUser(user);

  const links = useMemo(
    () => [
      { name: "Inicio", href: "/" },
      { name: "Servicios", href: "/servicios" },
      { name: "Proceso", href: "/proceso" },
      ...(SHOW_PROJECTS_SECTION ? [{ name: "Proyectos", href: "/proyectos" }] : []),
      { name: "Nosotros", href: "/nosotros" },
      { name: "Contacto", href: "/contacto" },
      { name: "Demo Portal", href: "/portal" },
      { name: "Mi Portal", href: "/dashboard", private: true },
      { name: "Mi Home", href: "/app/home", private: true, internal: true },
    ],
    []
  );

  const visibleLinks = links.filter(
    (link) => (!link.private || user) && (!link.internal || isInternal)
  );

  const isActive = (href: string) =>
    router.pathname === href ||
    (href !== "/" && router.pathname.startsWith(`${href}/`));

  return (
    <Disclosure
      as="header"
      className="sticky top-0 z-30 w-full border-b border-brand-copper/20 bg-brand-navy/95 text-brand-text-on-dark backdrop-blur-xl"
    >
      {({ open }) => (
        <>
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="relative flex items-center justify-center py-4">
              <Link href="/" className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-brand-border/50 bg-white shadow-glow-electric">
                  <Image
                    src="/brand/logo.png"
                    alt="Logo SUR INGENIERIA"
                    fill
                    sizes="56px"
                    className="object-contain p-1"
                    priority
                  />
                </div>
                <div className="leading-tight">
                  <p className="font-display text-2xl font-bold tracking-[0.08em] text-brand-text-on-dark">
                    SUR INGENIERIA
                  </p>
                  <p className="mt-1 hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-energy sm:block">
                    Domotica y electricidad residencial
                  </p>
                </div>
              </Link>

              <div className="absolute right-0 md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 p-2.5 text-brand-text-on-dark transition hover:border-brand-copper/40 hover:bg-white/10">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>

            <div className="hidden items-center justify-between gap-6 border-t border-white/10 py-3 md:flex">
              <nav className="flex flex-wrap items-center gap-1.5">
                {visibleLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      "rounded-full px-3.5 py-2 text-sm font-semibold transition",
                      isActive(item.href)
                        ? "bg-brand-copper/18 text-[#9deaf2]"
                        : "text-brand-text-on-dark/82 hover:bg-white/8 hover:text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <Link href="/contacto" className="btn btn-primary px-4 py-2 text-sm">
                  Pedir relevamiento
                </Link>
                {user ? (
                  <>
                    <Link href="/dashboard" className="btn btn-ghost-dark px-4 py-2 text-sm">
                      Mi portal
                    </Link>
                    <button onClick={signOut} className="btn btn-ghost-dark px-4 py-2 text-sm">
                      Salir
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="btn btn-ghost-dark px-4 py-2 text-sm">
                    Ingresar
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="border-t border-white/10 bg-brand-navy/98 md:hidden">
            <div className="space-y-1 px-6 pb-5 pt-4">
              {visibleLinks.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={classNames(
                    "block rounded-xl px-4 py-3 text-sm font-semibold transition",
                    isActive(item.href)
                      ? "bg-brand-copper/16 text-[#9deaf2]"
                      : "text-brand-text-on-dark hover:bg-white/8"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}

              <div className="flex flex-col gap-2 pt-3">
                <Link href="/contacto" className="btn btn-primary w-full">
                  Pedir relevamiento
                </Link>
                {user ? (
                  <>
                    <Link href="/dashboard" className="btn btn-ghost-dark w-full">
                      Mi portal
                    </Link>
                    <button onClick={signOut} className="btn btn-ghost-dark w-full">
                      Salir
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="btn btn-ghost-dark w-full">
                    Ingresar
                  </Link>
                )}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
