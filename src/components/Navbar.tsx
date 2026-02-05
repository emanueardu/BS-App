import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BoltIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
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
      { name: "Proyectos", href: "/proyectos" },
      { name: "Nosotros", href: "/nosotros" },
      { name: "Contacto", href: "/contacto" },
      { name: "Portal", href: "/portal" },
      { name: "Dashboard", href: "/dashboard", private: true },
      { name: "Mi casa", href: "/app/home", private: true, internal: true },
    ],
    []
  );

  const visibleLinks = links.filter(
    (link) => (!link.private || user) && (!link.internal || isInternal)
  );

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-30 w-full border-b border-slate-800/50 bg-[#0a1330]/95 text-white backdrop-blur"
    >
      {({ open }) => (
        <>
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md">
                <BoltIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-orange-300">BS</p>
                <p className="text-base font-semibold text-white drop-shadow">
                  Electricidad & Domótica
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-8 md:flex">
              {visibleLinks.map((item) => {
                const active = router.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      "text-sm font-semibold transition-colors",
                      active ? "text-white" : "text-white/85 hover:text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/portal"
                className="rounded-full border border-orange-300 px-4 py-2 text-sm font-semibold text-orange-100 transition hover:border-orange-200 hover:text-white"
              >
                Área Clientes
              </Link>
              <Link
                href="/contacto"
                className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/30"
              >
                Pedir relevamiento
              </Link>
              {user ? (
                <button
                  onClick={signOut}
                  className="rounded-full bg-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/35"
                >
                  Salir
                </button>
              ) : (
                <Link
                  href="/login"
                  className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:border-orange-200 hover:text-orange-100"
                >
                  Ingresar
                </Link>
              )}
            </div>

            <div className="md:hidden">
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 hover:text-orange-200 focus:outline-none">
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>

          <Disclosure.Panel className="border-t border-slate-800/50 bg-[#0a1330] md:hidden">
            <div className="space-y-1 px-4 pb-4 pt-2">
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
                        ? "bg-orange-100 text-slate-900"
                        : "text-white hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}

              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/portal"
                  className="block rounded-lg border border-orange-200 px-3 py-2 text-center text-sm font-semibold text-orange-200"
                >
                  Área Clientes
                </Link>
                {user ? (
                  <button
                    onClick={signOut}
                    className="rounded-lg bg-white/20 px-3 py-2 text-sm font-semibold text-white"
                  >
                    Salir
                  </button>
                ) : (
                  <Link
                    href="/contacto"
                    className="block rounded-lg bg-white/10 px-3 py-2 text-center text-sm font-semibold text-white"
                  >
                    Pedir relevamiento
                  </Link>
                )}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
