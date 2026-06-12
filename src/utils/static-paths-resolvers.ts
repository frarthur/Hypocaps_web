import {
  getAllNonFeaturedPostsSorted,
  getAllCategoryPostsSorted,
  generatePagedPathsForPage,
  isPublished,
  type ContentObject,
} from "./data-utils";

export function resolveStaticPaths({
  pages,
  objects,
}: {
  pages: ContentObject[];
  objects: ContentObject[];
}): string[] {
  return pages.reduce<string[]>((paths, page) => {
    if (!process.env.stackbitPreview && page.isDraft) {
      return paths;
    }
    const objectType = page.__metadata?.modelName;
    const pageUrlPath = page.__metadata?.urlPath;
    if (objectType && objectType in StaticPathsResolvers) {
      const resolver = StaticPathsResolvers[objectType as keyof typeof StaticPathsResolvers];
      return paths.concat(resolver(page, objects));
    }
    return paths.concat(pageUrlPath!);
  }, []);
}

const StaticPathsResolvers = {
  PostFeedLayout: (page: ContentObject, objects: ContentObject[]): string[] => {
    let posts = getAllNonFeaturedPostsSorted(objects);
    if (!process.env.stackbitPreview) {
      posts = posts.filter(isPublished);
    }
    const numOfPostsPerPage = (page.numOfPostsPerPage as number) ?? 10;
    return generatePagedPathsForPage(page, posts, numOfPostsPerPage);
  },
  PostFeedCategoryLayout: (page: ContentObject, objects: ContentObject[]): string[] => {
    const categoryId = page.__metadata?.id;
    const numOfPostsPerPage = (page.numOfPostsPerPage as number) ?? 10;
    let categoryPosts = getAllCategoryPostsSorted(objects, categoryId!);
    if (!process.env.stackbitPreview) {
      categoryPosts = categoryPosts.filter(isPublished);
    }
    return generatePagedPathsForPage(page, categoryPosts, numOfPostsPerPage);
  },
};
