export interface ContentObject {
  __metadata?: {
    id?: string;
    modelName?: string;
    relProjectPath?: string;
    urlPath?: string;
  };
  [key: string]: unknown;
}

export interface PostObject extends ContentObject {
  date?: string;
  isDraft?: boolean;
  isFeatured?: boolean;
  category?: string;
}

interface DebugContext {
  keyPath: (string | number)[];
  stack: unknown[];
}

interface MapDeepOptions {
  postOrder?: boolean;
}

type MapDeepIterator = (
  _value: unknown,
  _keyPath: (string | number)[],
  _stack: unknown[]
) => Promise<unknown>;

export function getAllPostsSorted(objects: ContentObject[]): ContentObject[] {
  const allPosts = getAllPosts(objects);
  return sortPosts(allPosts);
}

export function getAllCategoryPostsSorted(
  objects: ContentObject[],
  categoryId: string
): ContentObject[] {
  const allPosts = getAllPosts(objects);
  const categoryPosts = allPosts.filter((post) => post.category === categoryId);
  return sortPosts(categoryPosts);
}

export function getAllPosts(objects: ContentObject[]): ContentObject[] {
  return objects.filter((object) => object.__metadata?.modelName === "PostLayout");
}

export function getAllFeaturedPostsSorted(objects: ContentObject[]): ContentObject[] {
  const allPosts = getAllPosts(objects);
  const featuredPosts = allPosts.filter((post) => post.isFeatured === true);
  return sortPosts(featuredPosts);
}

export function getAllNonFeaturedPostsSorted(objects: ContentObject[]): ContentObject[] {
  const allPosts = getAllPosts(objects);
  const nonFeaturedPosts = allPosts.filter((post) => post.isFeatured !== true);
  return sortPosts(nonFeaturedPosts);
}

export function sortPosts(posts: ContentObject[]): ContentObject[] {
  return posts.sort(
    (postA, postB) =>
      new Date(postB.date as string).getTime() - new Date(postA.date as string).getTime()
  );
}

export function isPublished(page: ContentObject): boolean {
  return !page.isDraft;
}

export function resolveReferences(
  object: ContentObject | ContentObject[],
  fieldPaths: string[],
  objects: ContentObject[],
  debugContext: DebugContext = { keyPath: [], stack: [] }
): ContentObject | ContentObject[] {
  const _resolveDeep = (
    value: unknown,
    fieldNames: string[],
    debugContext: DebugContext
  ): unknown => {
    if (typeof value === "string") {
      const result = findObjectById(value, objects, debugContext);
      return _resolveDeep(result, fieldNames, debugContext);
    } else if (Array.isArray(value)) {
      return value
        .map((item, index) =>
          _resolveDeep(item, fieldNames, {
            keyPath: debugContext.keyPath.concat(index),
            stack: debugContext.stack.concat([value]),
          })
        )
        .filter(Boolean);
    }

    if (!value || fieldNames.length === 0) {
      return value;
    }
    const [fieldName, ...tail] = fieldNames;
    const valueRecord = value as Record<string, unknown>;
    if (!(fieldName in valueRecord)) {
      return value;
    }
    const result = _resolveDeep(valueRecord[fieldName], tail, {
      keyPath: debugContext.keyPath.concat(fieldName),
      stack: debugContext.stack.concat(value),
    });
    return {
      ...valueRecord,
      [fieldName]: result,
    };
  };

  if (Array.isArray(object)) {
    return object.map((item) =>
      fieldPaths.reduce((obj, fieldPath) => {
        const fieldNames = fieldPath.split(".");
        return _resolveDeep(obj, fieldNames, debugContext) as ContentObject;
      }, item)
    );
  }

  return fieldPaths.reduce((obj, fieldPath) => {
    const fieldNames = fieldPath.split(".");
    return _resolveDeep(obj, fieldNames, debugContext) as ContentObject;
  }, object);
}

export function resolveReferenceField(
  object: ContentObject,
  fieldName: string,
  objects: ContentObject[],
  debugContext: DebugContext = { keyPath: [], stack: [] }
): ContentObject {
  if (!(fieldName in object)) {
    return object;
  }
  const result = findObjectById(object[fieldName] as string, objects, {
    keyPath: debugContext.keyPath.concat(fieldName),
    stack: debugContext.stack.concat(object),
  });
  return {
    ...object,
    [fieldName]: result,
  };
}

export function resolveReferenceArray(
  object: ContentObject,
  fieldName: string,
  objects: ContentObject[],
  debugContext: DebugContext
): ContentObject {
  if (!(fieldName in object)) {
    return object;
  }
  const result = mapObjectsById(object[fieldName] as string[], objects, {
    keyPath: debugContext.keyPath.concat(fieldName),
    stack: debugContext.stack.concat(object),
  });
  return {
    ...object,
    [fieldName]: result,
  };
}

export function mapObjectsById(
  objectIds: string[] | null | undefined,
  objects: ContentObject[],
  debugContext: DebugContext
): ContentObject[] {
  return (objectIds ?? [])
    .map((objectId, index) =>
      findObjectById(objectId, objects, {
        keyPath: debugContext.keyPath.concat(index),
        stack: debugContext.stack.concat([objectIds]),
      })
    )
    .filter((obj): obj is ContentObject => obj !== null);
}

export function findObjectById(
  objectId: string | null | undefined,
  objects: ContentObject[],
  debugContext?: DebugContext
): ContentObject | null {
  if (!objectId) {
    return null;
  }
  const object = objects.find((obj) => obj.__metadata?.id === objectId) || null;
  if (!object && debugContext) {
    const reverseStack = debugContext.stack.slice().reverse();
    const objectIndex = reverseStack.findIndex(
      (obj) => !!(obj as ContentObject).__metadata?.relProjectPath
    );
    if (objectIndex >= 0) {
      const filePath = (reverseStack[objectIndex] as ContentObject).__metadata?.relProjectPath;
      const fieldPath = debugContext.keyPath
        .slice()
        .reverse()
        .slice(0, objectIndex + 1)
        .reverse()
        .join(".");
      console.warn(
        `The '${objectId}' referenced in file '${filePath}' in field '${fieldPath}' was not found`
      );
    }
  }
  return object;
}

export function getRootPagePath(pagePath: string): string {
  const pagedPathMatch = pagePath.match(/\/page\/\d+$/);
  if (!pagedPathMatch) {
    return pagePath;
  }
  return pagePath.substring(0, pagedPathMatch.index!);
}

export function generatePagedPathsForPage(
  page: ContentObject,
  items: ContentObject[],
  numOfItemsPerPage: number
): string[] {
  const pageUrlPath = page.__metadata?.urlPath;
  if (numOfItemsPerPage === 0) {
    return [pageUrlPath!];
  }
  const numOfPages = Math.ceil(items.length / numOfItemsPerPage) || 1;
  const paths: string[] = [];
  for (let i = 0; i < numOfPages; i++) {
    paths.push(i === 0 ? pageUrlPath! : `${pageUrlPath}/page/${i + 1}`);
  }
  return paths;
}

export function getPagedItemsForPage(
  page: ContentObject,
  items: ContentObject[],
  numOfItemsPerPage: number
): {
  pageIndex: number;
  baseUrlPath: string;
  numOfPages: number;
  numOfTotalItems: number;
  items: ContentObject[];
} {
  const pageUrlPath = page.__metadata?.urlPath;
  const baseUrlPath = getRootPagePath(pageUrlPath!);
  if (numOfItemsPerPage === 0) {
    return {
      pageIndex: 0,
      baseUrlPath,
      numOfPages: 1,
      numOfTotalItems: items.length,
      items,
    };
  }
  const pageIndexMatch = pageUrlPath!.match(/\/page\/(\d+)$/);
  const pageIndex = pageIndexMatch ? parseInt(pageIndexMatch[1]) - 1 : 0;
  const numOfPages = Math.ceil(items.length / numOfItemsPerPage) || 1;
  const startIndex = pageIndex * numOfItemsPerPage;
  const endIndex = startIndex + numOfItemsPerPage;
  return {
    pageIndex,
    baseUrlPath,
    numOfPages,
    numOfTotalItems: items.length,
    items: items.slice(startIndex, endIndex),
  };
}

export async function mapDeepAsync(
  value: unknown,
  iteratee: MapDeepIterator,
  options: MapDeepOptions = {}
): Promise<unknown> {
  const postOrder = options?.postOrder ?? false;
  async function _mapDeep(
    val: unknown,
    keyPath: (string | number)[],
    stack: unknown[]
  ): Promise<unknown> {
    let result = val;
    if (!postOrder) {
      result = await iteratee(result, keyPath, stack);
    }
    const childrenIterator = async (childVal: unknown, key: string | number) => {
      return _mapDeep(childVal, keyPath.concat(key), stack.concat([result]));
    };
    if (result && typeof result === "object" && (result as object).constructor === Object) {
      const res: Record<string, unknown> = {};
      for (const [key, childVal] of Object.entries(result as Record<string, unknown>)) {
        res[key] = await childrenIterator(childVal, key);
      }
      result = res;
    } else if (Array.isArray(result)) {
      result = await Promise.all(result.map((item, idx) => childrenIterator(item, idx)));
    }
    if (postOrder) {
      result = await iteratee(result, keyPath, stack);
    }
    return result;
  }
  return _mapDeep(value, [], []);
}
