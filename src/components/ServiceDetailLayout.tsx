import Link from "next/link";
import { Service } from "@/data/services";
import {
  HeroActionVariant,
  ServiceDetailConfig,
  ServiceDetailSection,
} from "@/types/serviceDetails";

type Props = {
  service: Service;
  config: ServiceDetailConfig;
};

const sectionClass =
  "rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur-sm";

const actionBaseClasses =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200";

const primaryActionClasses =
  " bg-orange-600 text-white hover:bg-orange-500 focus-visible:outline-white";
const secondaryActionClasses =
  " border border-white/70 text-white hover:bg-white/10";

const finalPrimaryClasses =
  " bg-orange-600 text-white hover:bg-orange-500 focus-visible:outline-white";
const finalSecondaryClasses =
  " border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white focus-visible:outline-slate-900";

const defaultGalleryStyle = {
  backgroundImage:
    "linear-gradient(to bottom, rgba(15,23,42,0.15), rgba(2,6,23,0.6))",
};

function getActionClass(variant: HeroActionVariant, isFinal = false) {
  if (isFinal) {
    return variant === "primary" ? finalPrimaryClasses : finalSecondaryClasses;
  }
  return variant === "primary" ? primaryActionClasses : secondaryActionClasses;
}

function renderSectionContent(section: ServiceDetailSection) {
  if (section.type === "text") {
    return (
      <p className="mt-3 text-sm text-slate-600">
        {section.copy}
      </p>
    );
  }

  if (section.type === "bullets") {
    return (
      <>
        {section.copy && (
          <p className="mt-3 text-sm text-slate-600">{section.copy}</p>
        )}
        <ul className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <span aria-hidden className="text-orange-500">
                •
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      {section.copy && (
        <p className="text-sm text-slate-600">{section.copy}</p>
      )}
      <div className="mt-4 space-y-3 text-sm text-slate-600">
        {section.steps.map((step) => (
          <p key={step}>{step}</p>
        ))}
      </div>
    </>
  );
}

export function ServiceDetailLayout({ service, config }: Props) {
  return (
    <div className="space-y-12 px-6 py-10 sm:px-10 lg:px-16">
      <section className="rounded-3xl bg-slate-900/80 p-8 text-white shadow-lg backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-200">
          Servicios
        </p>
        <h1 className="mt-4 text-3xl font-semibold">{service.title}</h1>
        {service.subtitle && (
          <p className="mt-2 text-base text-slate-200">{service.subtitle}</p>
        )}
        <p className="mt-4 text-sm text-slate-200">{config.heroDescription}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {config.heroActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              aria-label={action.ariaLabel ?? action.label}
              className={`${actionBaseClasses}${getActionClass(
                action.variant
              )}`}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </section>

      {config.sections.map((section) => (
        <section key={section.title} className={sectionClass}>
          <h2 className="text-xl font-semibold text-slate-900">
            {section.title}
          </h2>
          {section.note && (
            <p className="mt-3 text-sm italic text-slate-500">{section.note}</p>
          )}
          {renderSectionContent(section)}
        </section>
      ))}

      <section className={sectionClass}>
        <h2 className="text-xl font-semibold text-slate-900">Galería</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {config.galleryItems.map((item) => {
          const hasImage = Boolean(item.imageSrc);
          return (
            <div
              key={item.title}
              className={`flex h-44 flex-col items-end justify-end rounded-2xl border border-dashed border-slate-300 bg-gradient-to-br from-slate-100 to-slate-200 p-4 text-xs font-semibold uppercase tracking-wide ${
                hasImage ? "text-white" : "text-slate-600"
              }`}
              style={
                hasImage
                  ? {
                        backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.15), rgba(2,6,23,0.6)), url(${item.imageSrc})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : defaultGalleryStyle
                }
              >
                <span>{item.title}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-xl font-semibold text-slate-900">
          {config.finalCta.title}
        </h2>
        <p className="mt-3 text-sm text-slate-600">{config.finalCta.text}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={config.finalCta.primary.href}
            className={`${actionBaseClasses}${getActionClass(
              config.finalCta.primary.variant,
              true
            )}`}
          >
            {config.finalCta.primary.label}
          </Link>
          <Link
            href={config.finalCta.secondary.href}
            className={`${actionBaseClasses}${getActionClass(
              config.finalCta.secondary.variant,
              true
            )}`}
          >
            {config.finalCta.secondary.label}
          </Link>
        </div>
        {config.finalCta.footnote && (
          <p className="mt-3 text-xs italic text-slate-500">
            {config.finalCta.footnote}
          </p>
        )}
      </section>
    </div>
  );
}
