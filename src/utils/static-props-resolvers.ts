import {
  getRootPagePath,
  resolveReferences,
  getAllPostsSorted,
  getAllNonFeaturedPostsSorted,
  getAllCategoryPostsSorted,
  getPagedItemsForPage,
  isPublished,
  mapDeepAsync,
  type ContentObject,
} from "./data-utils";

export async function resolveStaticProps(
  urlPath: string,
  data: { pages: ContentObject[]; objects: ContentObject[]; props: Record<string, unknown> }
): Promise<Record<string, unknown>> {
  const rootUrlPath = getRootPagePath(urlPath);
  const { __metadata, ...rest } = data.pages.find(
    (page) => page.__metadata?.urlPath === rootUrlPath
  )!;
  const props: Record<string, unknown> = {
    page: {
      __metadata: {
        ...__metadata,
        urlPath,
      },
      ...rest,
    },
    ...data.props,
  };
  return mapDeepAsync(
    props,
    async (value: unknown, _keyPath: (string | number)[], _stack: unknown[]) => {
      const obj = value as Record<string, unknown> | null | undefined;
      const objectType = obj?.__metadata
        ? ((obj.__metadata as Record<string, unknown>).modelName as string)
        : undefined;
      if (objectType && objectType in StaticPropsResolvers) {
        const resolver = StaticPropsResolvers[objectType as keyof typeof StaticPropsResolvers];
        return resolver(obj as ContentObject, data);
      }
      return value;
    },
    { postOrder: true }
  ) as Promise<Record<string, unknown>>;
}

interface ResolverData {
  pages: ContentObject[];
  objects: ContentObject[];
  props: Record<string, unknown>;
}

const StaticPropsResolvers = {
  PostLayout: (props: ContentObject, data: ResolverData) => {
    return resolveReferences(props, ["author", "category"], data.objects);
  },
  PostFeedLayout: (props: ContentObject, data: ResolverData) => {
    const numOfPostsPerPage = (props.numOfPostsPerPage as number) ?? 10;
    let allPosts = getAllNonFeaturedPostsSorted(data.objects);
    if (!process.env.stackbitPreview) {
      allPosts = allPosts.filter(isPublished);
    }
    const paginationData = getPagedItemsForPage(props, allPosts, numOfPostsPerPage);
    const items = resolveReferences(paginationData.items, ["author", "category"], data.objects);
    return {
      ...props,
      ...paginationData,
      items,
    };
  },
  PostFeedCategoryLayout: (props: ContentObject, data: ResolverData) => {
    const categoryId = props.__metadata?.id;
    const numOfPostsPerPage = (props.numOfPostsPerPage as number) ?? 10;
    let allCategoryPosts = getAllCategoryPostsSorted(data.objects, categoryId!);
    if (!process.env.stackbitPreview) {
      allCategoryPosts = allCategoryPosts.filter(isPublished);
    }
    const paginationData = getPagedItemsForPage(props, allCategoryPosts, numOfPostsPerPage);
    const items = resolveReferences(paginationData.items, ["author", "category"], data.objects);
    return {
      ...props,
      ...paginationData,
      items,
    };
  },
  RecentPostsSection: (props: ContentObject, data: ResolverData) => {
    let allPosts = getAllPostsSorted(data.objects);
    if (!process.env.stackbitPreview) {
      allPosts = allPosts.filter(isPublished);
    }
    allPosts = allPosts.slice(0, (props.recentCount as number) || 6);
    const recentPosts = resolveReferences(allPosts, ["author", "category"], data.objects);
    return {
      ...props,
      posts: recentPosts,
    };
  },
  FeaturedPostsSection: (props: ContentObject, data: ResolverData) => {
    return resolveReferences(props, ["posts.author", "posts.category"], data.objects);
  },
  FeaturedPeopleSection: (props: ContentObject, data: ResolverData) => {
    return resolveReferences(props, ["people"], data.objects);
  },
};
