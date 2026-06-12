import React from "react";
import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next";
import { allContent } from "../utils/local-content";
import { getComponent } from "../components/components-registry";
import { resolveStaticProps } from "../utils/static-props-resolvers";
import { resolveStaticPaths } from "../utils/static-paths-resolvers";
import {
  seoGenerateTitle,
  seoGenerateMetaTags,
  seoGenerateMetaDescription,
  type SeoMetaTag,
} from "../utils/seo-utils";
import type { ContentObject } from "../utils/data-utils";

interface PageLayoutRendererProps {
  page: ContentObject;
  site: ContentObject;
}

function PageLayoutRenderer({ page, site }: PageLayoutRendererProps) {
  const { modelName } = page.__metadata ?? {};
  if (!modelName) {
    throw new Error(`page has no type, page '${page.__metadata?.urlPath}'`);
  }
  const Layout = getComponent(modelName);
  if (!Layout) {
    throw new Error(`no page layout matching the page model: ${modelName}`);
  }
  return React.createElement(Layout, { page, site });
}

interface PageProps {
  page: ContentObject;
  site: ContentObject;
}

function Page({ page, site }: PageProps) {
  const title = seoGenerateTitle(page, site);
  const metaTags: SeoMetaTag[] = seoGenerateMetaTags(page, site);
  const metaDescription: string | null = seoGenerateMetaDescription(page, site);
  return (
    <>
      <Head>
        <title>{title}</title>
        {metaDescription && <meta name="description" content={metaDescription} />}
        {metaTags.map((metaTag) => {
          if (metaTag.format === "property") {
            return (
              <meta key={metaTag.property} property={metaTag.property} content={metaTag.content} />
            );
          }
          return <meta key={metaTag.property} name={metaTag.property} content={metaTag.content} />;
        })}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {(site.favicon as string | undefined) && <link rel="icon" href={site.favicon as string} />}
      </Head>
      <PageLayoutRenderer page={page} site={site} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const data = allContent();
  const paths = resolveStaticPaths(data);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const data = allContent();
  const urlPath = "/" + ((params?.slug as string[]) || []).join("/");
  const props = await resolveStaticProps(urlPath, data);
  return { props: props as unknown as PageProps };
};

export default Page;
