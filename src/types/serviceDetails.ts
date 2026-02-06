export type HeroActionVariant = "primary" | "secondary";

export type HeroAction = {
  label: string;
  href: string;
  ariaLabel?: string;
  variant: HeroActionVariant;
};

type BaseSection = {
  id?: string;
  title: string;
  copy?: string;
  note?: string;
};

export type TextSection = BaseSection & {
  type: "text";
  copy: string;
};

export type BulletsSection = BaseSection & {
  type: "bullets";
  bullets: string[];
};

export type StepsSection = BaseSection & {
  type: "steps";
  steps: string[];
};

export type ServiceDetailSection = TextSection | BulletsSection | StepsSection;

export type GalleryItem = {
  title: string;
  description?: string;
  imageSrc?: string;
};

export type FinalCta = {
  title: string;
  text: string;
  primary: HeroAction;
  secondary: HeroAction;
  footnote?: string;
};

export type ServiceDetailConfig = {
  heroDescription: string;
  heroActions: [HeroAction, HeroAction];
  sections: ServiceDetailSection[];
  galleryItems: GalleryItem[];
  finalCta: FinalCta;
  metaDescription?: string;
};
