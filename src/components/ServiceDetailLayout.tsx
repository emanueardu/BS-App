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

const sectionClass = "section-shell px-8 py-8";

function actionClass(variant: HeroActionVariant) {
  return variant === "primary" ? "btn btn-primary" : "btn btn-ghost-dark";
}

function finalActionClass(variant: HeroActionVariant) {
  return variant === "primary" ? "btn btn-primary" : "btn btn-outline";
}

function renderSectionContent(section: ServiceDetailSection) {
  if (section.type === "text") {
    return <p className="mt-3 text-sm leading-6 text-brand-text-muted">{section.copy}</p>;
  }

  if (section.type === "bullets") {
    return (
      <>
        {section.copy ? (
          <p className="mt-3 text-sm leading-6 text-brand-text-muted">{section.copy}</p>
        ) : null}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {section.bullets.map((bullet) => (
            <div key={bullet} className="rounded-2xl bg-brand-bg px-4 py-3 text-sm leading-6 text-brand-text">
              <span className="mr-2 font-semibold text-brand-copper">•</span>
              {bullet}
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      {section.copy ? (
        <p className="text-sm leading-6 text-brand-text-muted">{section.copy}</p>
      ) : null}
      <div className="mt-4 space-y-3 text-sm leading-6 text-brand-text-muted">
        {section.steps.map((step) => (
          <p key={step}>{step}</p>
        ))}
      </div>
    </>
  );
}

export function ServiceDetailLayout({ service, config }: Props) {
  const heroBackgroundStyle = service.imageSrc
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(8,20,29,0.7), rgba(8,20,29,0.84)), url(${service.imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { backgroundColor: "rgba(12,34,48,0.94)" };

  return (
    <div className="space-y-8 px-0 py-8">
      <section
        className="relative overflow-hidden rounded-[1.75rem] px-8 py-10 text-brand-text-on-dark shadow-e4"
        style={heroBackgroundStyle}
      >
        <div className="hero-veil opacity-75" />
        <div className="relative z-10 max-w-4xl">
          <p className="eyebrow text-brand-sand">Servicios</p>
          <h1 className="mt-4 text-4xl font-semibold">{service.title}</h1>
          {service.subtitle ? (
            <p className="mt-3 text-base text-brand-text-on-dark/84">{service.subtitle}</p>
          ) : null}
          <p className="mt-4 text-sm leading-6 text-brand-text-on-dark/82">
            {config.heroDescription}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {config.heroActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                aria-label={action.ariaLabel ?? action.label}
                className={actionClass(action.variant)}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {config.sections.map((section) => (
        <section key={section.title} className={sectionClass}>
          <h2 className="text-xl font-semibold text-brand-text">{section.title}</h2>
          {section.note ? (
            <p className="mt-3 text-sm italic text-brand-text-muted">{section.note}</p>
          ) : null}
          {renderSectionContent(section)}
        </section>
      ))}

      {config.galleryItems.length > 0 ? (
        <section className={sectionClass}>
          <h2 className="text-xl font-semibold text-brand-text">Galeria</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {config.galleryItems.map((item) => {
              const hasImage = Boolean(item.imageSrc);
              return (
                <div
                  key={item.title}
                  className="flex h-44 flex-col justify-end rounded-2xl border border-brand-border p-4 text-xs font-semibold uppercase tracking-wide"
                  style={
                    hasImage
                      ? {
                          color: "#eaf7f8",
                          backgroundImage: `linear-gradient(to bottom, rgba(8,20,29,0.18), rgba(8,20,29,0.7)), url(${item.imageSrc})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : undefined
                  }
                >
                  {!hasImage ? (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-bg-alt to-brand-bg" />
                  ) : null}
                  <span className="relative z-10">{item.title}</span>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className={sectionClass}>
        <h2 className="text-xl font-semibold text-brand-text">{config.finalCta.title}</h2>
        <p className="mt-3 text-sm leading-6 text-brand-text-muted">{config.finalCta.text}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={config.finalCta.primary.href} className={finalActionClass(config.finalCta.primary.variant)}>
            {config.finalCta.primary.label}
          </Link>
          <Link
            href={config.finalCta.secondary.href}
            className={finalActionClass(config.finalCta.secondary.variant)}
          >
            {config.finalCta.secondary.label}
          </Link>
        </div>
        {config.finalCta.footnote ? (
          <p className="mt-3 text-xs italic text-brand-text-muted">
            {config.finalCta.footnote}
          </p>
        ) : null}
      </section>
    </div>
  );
}
