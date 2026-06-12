function cssClassesFromUrlPath(urlPath: string): string[] {
    const parts = urlPath
        .replace(/^\/|\/$/g, '')
        .split('/')
        .filter(Boolean);

    let css = 'page';
    return parts.map((part) => {
        css += `-${part}`;
        return css;
    });
}

function getPageUrl(page: { slug?: string; __metadata?: { modelName?: string } } | null): string | undefined {
    if (!page || !page.slug) {
        return undefined;
    }

    if (['PostLayout'].includes(page?.__metadata?.modelName ?? '')) {
        return `/blog${page.slug.startsWith('/') ? page.slug : `/${page.slug}`}`;
    }

    return page.slug.startsWith('/') ? page.slug : `/${page.slug}`;
}

function setEnvironmentVariables(): { URL?: string } {
    return {
        ...(process.env.URL && { URL: process.env.URL }),
    };
}

export { cssClassesFromUrlPath, getPageUrl, setEnvironmentVariables };
