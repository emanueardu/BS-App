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
      ...(SHOW_PROJECTS_SECTION
        ? [{ name: "Proyectos", href: "/proyectos" }]
        : []),
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

  return (
    <Disclosure
      as="header"
      className="sticky top-0 z-30 w-full border-b border-brand-blue/50 bg-brand-navy/95 text-brand-text-on-dark backdrop-blur"
    >
      {({ open }) => (
        <>
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="relative flex items-center justify-center py-4 sm:py-5">
              <Link href="/" className="flex items-center gap-3 sm:gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-brand-copper-soft/50 bg-brand-surface/10 shadow-brand-soft sm:h-16 sm:w-16">
                  <Image
                    src="/brand/logo.png"
                    alt="Logo SUR INGENIERÍA"
                    fill
                    sizes="(max-width: 640px) 56px, 64px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="leading-tight">
                  <p className="text-xl font-bold tracking-wide text-brand-text-on-dark sm:text-2xl lg:text-3xl">
                    SUR INGENIERÍA
                  </p>
                  <p className="mt-1 hidden text-[11px] font-medium uppercase tracking-[0.18em] text-brand-sand sm:block sm:text-xs lg:text-sm">
                    Domótica & Electricidad Residencial
                  </p>
                </div>
              </Link>

              <div className="absolute right-0 md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-brand-text-on-dark hover:bg-brand-surface/10 hover:text-brand-sand focus:outline-none">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>

            <div className="hidden border-t border-brand-blue/60 md:flex md:items-center md:justify-between md:gap-6 md:py-3">
              <nav className="flex flex-wrap items-center gap-2 lg:gap-3">
                {visibleLinks.map((item) => {
                  const active = router.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        "rounded-full px-3 py-1.5 text-sm font-semibold transition-colors",
                        active
                          ? "bg-brand-surface/15 text-brand-text-on-dark"
                          : "text-brand-text-on-dark/85 hover:bg-brand-surface/10 hover:text-brand-text-on-dark"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-2 lg:gap-3">
                <Link
                  href="/contacto"
                  className="rounded-full bg-brand-copper px-4 py-2 text-sm font-semibold text-brand-text-on-dark transition hover:bg-brand-copper-soft"
                >
                  Pedir relevamiento
                </Link>
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="rounded-full border border-brand-copper-soft px-4 py-2 text-sm font-semibold text-brand-sand transition hover:border-brand-sand hover:text-brand-text-on-dark"
                    >
                      Mi portal
                    </Link>
                    <button
                      onClick={signOut}
                      className="rounded-full border border-brand-surface/35 px-4 py-2 text-sm font-semibold text-brand-text-on-dark transition hover:bg-brand-surface/15"
                    >
                      Salir
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="rounded-full border border-brand-surface/45 px-4 py-2 text-sm font-semibold text-brand-text-on-dark transition hover:border-brand-copper-soft hover:text-brand-sand"
                  >
                    Ingresar
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="border-t border-brand-blue/50 bg-brand-navy md:hidden">
            <div className="space-y-1 px-4 pb-4 pt-3 sm:px-6">
              {visibleLinks.map((item) => {
                const active = router.pathname === item.href;
                return (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={classNames(
                      "block rounded-lg px-3 py-2 text-base font-semibold",
                      active
                        ? "bg-brand-bg-alt text-brand-text"
                        : "text-brand-text-on-dark hover:bg-brand-surface/10 hover:text-brand-text-on-dark"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}

              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/contacto"
                  className="block rounded-lg bg-brand-copper px-3 py-2 text-center text-sm font-semibold text-brand-text-on-dark"
                >
                  Pedir relevamiento
                </Link>
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block rounded-lg border border-brand-copper-soft px-3 py-2 text-center text-sm font-semibold text-brand-sand"
                    >
                      Mi portal
                    </Link>
                    <button
                      onClick={signOut}
                      className="rounded-lg bg-brand-surface/20 px-3 py-2 text-sm font-semibold text-brand-text-on-dark"
                    >
                      Salir
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block rounded-lg border border-brand-surface/30 px-3 py-2 text-center text-sm font-semibold text-brand-text-on-dark"
                  >
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
