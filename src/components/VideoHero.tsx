import clsx from "clsx";
import Link from "next/link";
import { ReactNode, useEffect, useRef } from "react";

type HeroAction = {
  href: string;
  label: string;
  icon?: ReactNode;
  variant?: "primary" | "energy" | "outline" | "ghost-dark" | "navy";
};

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  videoSrc: string;
  posterSrc?: string;
  actions?: HeroAction[];
  panelAside?: ReactNode;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
};

const actionClass: Record<NonNullable<HeroAction["variant"]>, string> = {
  primary: "btn btn-primary",
  energy: "btn btn-energy",
  outline: "btn btn-outline",
  "ghost-dark": "btn btn-ghost-dark",
  navy: "btn btn-navy",
};

const isExternalHref = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");

export function VideoHero({
  eyebrow,
  title,
  description,
  videoSrc,
  posterSrc,
  actions = [],
  panelAside,
  children,
  className,
  contentClassName,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => undefined);
  }, []);

  return (
    <section className={clsx("full-bleed hero-fullbleed -mt-6 lg:-mt-8", className)}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterSrc}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="hero-veil" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 lg:px-6 lg:py-20">
        <div
          className={clsx(
            "grid items-center gap-6 lg:gap-10",
            panelAside ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]" : "max-w-4xl",
            contentClassName
          )}
        >
          <div className="hero-glass">
            <span className="eyebrow text-brand-sand">{eyebrow}</span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-brand-text-on-dark sm:text-5xl lg:text-[3.25rem]">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-brand-text-on-dark/90 sm:text-lg">
              {description}
            </p>
            {children}
            {actions.length > 0 ? (
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {actions.map((action) =>
                  isExternalHref(action.href) ? (
                    <a
                      key={`${action.href}-${action.label}`}
                      href={action.href}
                      className={actionClass[action.variant ?? "primary"]}
                      target={action.href.startsWith("http") ? "_blank" : undefined}
                      rel={action.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {action.label}
                      {action.icon}
                    </a>
                  ) : (
                    <Link
                      key={`${action.href}-${action.label}`}
                      href={action.href}
                      className={actionClass[action.variant ?? "primary"]}
                    >
                      {action.label}
                      {action.icon}
                    </Link>
                  )
                )}
              </div>
            ) : null}
          </div>

          {panelAside ? <div className="glass-card p-0">{panelAside}</div> : null}
        </div>
      </div>
    </section>
  );
}
