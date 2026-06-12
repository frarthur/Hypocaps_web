export interface SeoMetaTag {
  property: string;
  content: string;
  format: "property" | "name";
}

interface SiteConfig {
  defaultMetaTags?: { property: string; content: string }[];
  titleSuffix?: string;
  defaultSocialImage?: string;
  env?: { URL?: string };
  [key: string]: unknown;
}

interface PageSeo {
  metaTitle?: string;
  metaDescription?: string;
  socialImage?: string;
  addTitleSuffix?: boolean;
  metaTags?: { property: string; content: string }[];
}

interface Page {
  __metadata?: { modelName?: string };
  title?: string;
  excerpt?: string;
  featuredImage?: { url?: string };
  seo?: PageSeo;
}

export function seoGenerateMetaTags(page: Page, site: SiteConfig): SeoMetaTag[] {
  let pageMetaTags: Record<string, string> = {};

  if (site.defaultMetaTags?.length) {
    site.defaultMetaTags.forEach((metaTag) => {
      pageMetaTags[metaTag.property] = metaTag.content;
    });
  }

  const seoTitle = seoGenerateTitle(page, site);
  const ogImage = seoGenerateOgImage(page, site);

  pageMetaTags = {
    ...pageMetaTags,
    ...(seoTitle && { "og:title": seoTitle }),
    ...(ogImage && { "og:image": ogImage }),
  };

  if (page.seo?.metaTags?.length) {
    page.seo?.metaTags.forEach((metaTag) => {
      pageMetaTags[metaTag.property] = metaTag.content;
    });
  }

  const metaTags: SeoMetaTag[] = [];
  Object.keys(pageMetaTags).forEach((key) => {
    if (pageMetaTags[key] !== null) {
      metaTags.push({
        property: key,
        content: pageMetaTags[key],
        format: key.startsWith("og") ? "property" : "name",
      });
    }
  });

  return metaTags;
}

export function seoGenerateTitle(page: Page, site: SiteConfig): string {
  let title = page.seo?.metaTitle ? page.seo?.metaTitle : page.title;
  if (site.titleSuffix && page.seo?.addTitleSuffix !== false) {
    title = `${title} - ${site.titleSuffix}`;
  }
  return title ?? "";
}

export function seoGenerateMetaDescription(page: Page, _site: SiteConfig): string | null {
  let metaDescription: string | null = null;
  if (page.__metadata?.modelName === "PostLayout") {
    metaDescription = page.excerpt ?? null;
  }
  if (page.seo?.metaDescription) {
    metaDescription = page.seo?.metaDescription;
  }
  return metaDescription;
}

export function seoGenerateOgImage(page: Page, site: SiteConfig): string | null {
  let ogImage: string | null = null;
  if (site.defaultSocialImage) {
    ogImage = site.defaultSocialImage;
  }
  if (page.__metadata?.modelName === "PostLayout") {
    if (page.featuredImage?.url) {
      ogImage = page.featuredImage.url;
    }
  }
  if (page.seo?.socialImage) {
    ogImage = page.seo?.socialImage;
  }

  const domainUrl = site.env?.URL ? site.env.URL : null;

  if (ogImage) {
    if (domainUrl) {
      return domainUrl + ogImage;
    }
    return ogImage;
  }
  return null;
}
