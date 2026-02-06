import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { services, Service } from "@/data/services";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { ServiceDetailLayout } from "@/components/ServiceDetailLayout";
import { serviceDetailConfigs } from "@/data/serviceDetails";

type Props = {
  service: Service;
};

export default function ServicePage({ service }: Props) {
  const detailConfig = serviceDetailConfigs[service.slug];

  if (detailConfig) {
    return (
      <>
        <Head>
          <title>{service.title} | BS</title>
          <meta
            name="description"
            content={detailConfig.metaDescription ?? service.description}
          />
        </Head>
        <ServiceDetailLayout service={service} config={detailConfig} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{service.title} | BS</title>
        <meta
          name="description"
          content={`Más información sobre ${service.title}: pronto estará disponible con detalles personalizados.`}
        />
      </Head>
      <ServicePageTemplate service={service} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = services.map((service) => ({
    params: { slug: service.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return { notFound: true };
  }

  return {
    props: {
      service,
    },
  };
};
