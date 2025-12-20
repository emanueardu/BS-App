import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  BoltIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useAuth } from "@/context/AuthContext";

const classNames = (...classes: Array<string | boolean | undefined>) =>
  classes.filter(Boolean).join(" ");

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const links = useMemo(
    () => [
      { name: "Inicio", href: "/" },
      { name: "Contacto", href: "/contacto" },
      { name: "Dashboard", href: "/dashboard", private: true },
    ],
    []
  );

  const visibleLinks = links.filter((link) => !link.private || user);

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/90 backdrop-blur"
    >
      {({ open }) => (
        <>
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md">
                <BoltIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-orange-600">BS</p>
                <p className="text-base font-semibold text-slate-900">
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
                      "text-sm font-medium transition-colors hover:text-orange-600",
                      active ? "text-orange-600" : "text-slate-700"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/contacto"
                className="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-700 transition hover:border-orange-300 hover:text-orange-800"
              >
                Pedir visita técnica
              </Link>
              {user ? (
                <button
                  onClick={signOut}
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Salir
                </button>
              ) : (
                <Link
                  href="/login"
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Ingresar
                </Link>
              )}
            </div>

            <div className="md:hidden">
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none">
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>

          <Disclosure.Panel className="border-t border-slate-200 bg-white md:hidden">
            <div className="space-y-1 px-4 pb-4 pt-2">
              {visibleLinks.map((item) => {
                const active = router.pathname === item.href;
                return (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={classNames(
                      "block rounded-lg px-3 py-2 text-base font-medium",
                      active
                        ? "bg-orange-50 text-orange-700"
                        : "text-slate-700 hover:bg-slate-50 hover:text-orange-700"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}

              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/contacto"
                  className="block rounded-lg border border-orange-200 px-3 py-2 text-center text-sm font-semibold text-orange-700"
                >
                  Pedir visita técnica
                </Link>
                {user ? (
                  <button
                    onClick={signOut}
                    className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
                  >
                    Salir
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="block rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white"
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
