import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { unref } from 'vue';

export const API_ENDPOINTS = {
  backgrounds: 'v2/backgrounds/',
  classes: 'v2/classes/',
  conditions: 'v2/conditions/',
  documents: 'v2/documents/',
  feats: 'v2/feats/',
  magicitems: 'v2/items/',
  monsters: 'v2/creatures/',
  races: 'v2/races/',
  search: 'v2/search/',
  spells: 'v2/spells/',
  rules: 'v2/rulesets/',
  equipment: 'v2/items/',
} as const;

/** Provides the base functions to easily fetch data from the Open5e API. */
export const useAPI = () => {
  const API_URL = useRuntimeConfig().public.apiUrl;

  const api = axios.create({
    baseURL: API_URL,
    headers: { Accept: 'application/json' },
  });

  return {
    findMany: async (
      endpoint: string,
      sources: string[],
      params: Record<string, never> = {},
    ) => {
      const formattedSources
        = sources.length > 0 ? sources.join(',') : 'no-sources';
      const res = await api.get(endpoint, {
        params: {
          limit: 5000,
          document__key__in: formattedSources,
          ...params,
        },
      });

      return res.data.results as Record<string, never>[];
    },
    findPaginated: async (options: {
      endpoint: string;
      sources: string[];
      pageNo?: number;
      itemsPerPage?: number;
      sortByProperty?: string;
      isSortDescending?: boolean;
      queryParams?: Record<string, never>;
    }) => {
      const {
        endpoint,
        sources,
        pageNo = 1,
        itemsPerPage = 5,
        sortByProperty = 'name',
        isSortDescending = false,
        queryParams = {},
      } = options;

      const formattedSources = sources.join(',');
      const res = await api.get(endpoint, {
        params: {
          limit: itemsPerPage,
          page: pageNo,
          document__key__in: formattedSources,
          ordering: `${isSortDescending ? '-' : ''}${sortByProperty}`,
          ...queryParams,
        },
      });

      const data = res.data as {
        count: number;
        results: Record<string, never>[];
        next: string | null;
        previous: string | null;
      };

      return data;
    },
    get: async (...parts: string[]) => {
      const route = parts.join('');
      const res = await api.get(route, { params: { depth: '2' } }).catch(() => {
        // redirect to /search if API route returns nothing
        const searchTerm = parts.filter(exists => exists).slice(-1)[0];
        navigateTo(`/search?text=${searchTerm}`);
      });
      return res?.data as Record<string, never>;
    },
  };
};

export const useFindMany = (
  endpoint: MaybeRef<string>,
  params?: MaybeRef<Record<string, string | number | boolean>>,
) => {
  const { findMany } = useAPI();

  // API V1 & V2 use different PKs for sources. Select the correct one.
  const { sources, sourcesAPIVersion1 } = useSourcesList();
  const sourcesForAPIVersion = isV1Endpoint(unref(endpoint))
    ? sourcesAPIVersion1
    : sources;

  return useQuery({
    queryKey: ['findMany', endpoint, sourcesForAPIVersion, params],
    queryFn: () =>
      unref(
        findMany(unref(endpoint), unref(sourcesForAPIVersion), unref(params)),
      ),
  });
};

/**
 * Recursively fetch nested resources based on the specified fields.
 * @param data - The current data object.
 * @param fields - The list of fields to fetch.
 * @returns The data object with nested resources fetched.
 */
const fetchNestedResources = async (
  data: Record<string, never>,
  fields: string[],
): Promise<Record<string, never>> => {
  for (const field of fields) {
    const fieldParts = field.split('.');
    let currentData = data;
    let parentData = data;
    let parentKey = '';

    // Traverse the nested fields
    for (const part of fieldParts) {
      if (currentData[part]) {
        parentData = currentData;
        parentKey = part;
        currentData = currentData[part];
      } else {
        (currentData as Record<string, null>)[part] = null;
        break;
      }
    }

    // Fetch related data if the current field is a URL
    if (
      typeof currentData === 'string'
      && (currentData as string).startsWith('http')
    ) {
      const relatedData = await axios.get(currentData);
      parentData[parentKey] = relatedData.data;

      // Recursively fetch nested related fields
      const nestedFields = fields
        .filter(f => f.startsWith(`${field}.`))
        .map(f => f.slice(field.length + 1));
      if (nestedFields.length > 0) {
        await fetchNestedResources(parentData[parentKey], nestedFields);
      }
    }
  }
  return data;
};

export const useFindOne = (
  endpoint: string,
  id: MaybeRef<string>,
  options?: {
    params: Record<string, string>;
    relatedFields: string[];
  },
) => {
  const { get } = useAPI();

  const params = options?.params;
  const formattedParams = [];
  for (const name in params) {
    formattedParams.push(`${name}=${params[name]}`);
  }
  const paramString
    = formattedParams.length === 0 ? '' : '/?' + formattedParams.join('&');
  return useQuery({
    queryKey: [endpoint, id],
    queryFn: async () => {
      // Fetch the main data
      // const data = await get(endpoint, unref(id), '/?fields=key');
      const data = await get(endpoint, unref(id), paramString);
      // Fetch related data for the specified fields
      return await fetchNestedResources(
        data,
        options?.relatedFields ?? [],
      );
    },
  });
};

export const useFindByLink = (link: MaybeRef<string>) => {
  const { get } = useAPI();

  return useQuery({
    queryKey: ['findByLink', link],
    queryFn: async () => {
      const url = new URL(unref(link));
      const pathParts = url.pathname.split('/').filter(Boolean);
      const endpoint = pathParts.slice(0, 2).join('/');
      const objectId = pathParts[2];

      return get(endpoint, objectId);
    },
  });
};

export const useSubclass = (className: string, subclass: string) => {
  const api = useAPI();
  return useQuery({
    queryKey: ['subclass', className, subclass],
    queryFn: async () => {
      const class_result = await api.get(API_ENDPOINTS.classes, className);
      return class_result.archetypes.find((a: never) => a.slug === subclass);
    },
  });
};

export const useSections = (...categories: string[]) => {
  const { data: sections, isPending } = useFindMany(API_ENDPOINTS.sections, {
    fields: ['slug', 'name', 'parent'].join(),
  });
  const filtered_sections = computed(() =>
    sections.value?.filter(section =>
      categories.includes(`${section.parent}`),
    ),
  );
  return { data: filtered_sections, isPending };
};

/**
 * Returns a new array of items sorted by the given field
 */
export function sortByField(
  items: Record<string, never>[],
  field: string,
  direction: 'ascending' | 'descending' = 'ascending',
) {
  const isAscending = direction === 'ascending';
  return [...items].sort((a, b) => {
    if (a[field] < b[field]) {
      return isAscending ? -1 : 1;
    }
    if (a[field] > b[field]) {
      return isAscending ? 1 : -1;
    }
    return 0;
  });
}

export const useDocuments = (params: Record<string, never> = {}) => {
  params.depth = '1';
  const { findMany } = useAPI();
  return useQuery({
    queryKey: ['findMany', API_ENDPOINTS.documents, params],
    queryFn: () => findMany(API_ENDPOINTS.documents, [], params),
  });
};

export const useSearch = (queryRef: Ref<string>) => {
  const { findMany } = useAPI();
  return useQuery({
    queryKey: ['search', queryRef],
    queryFn: () =>
      queryRef.value
        ? findMany(API_ENDPOINTS.search, [], {
            schema: 'v2',
            query: queryRef.value,
          })
        : [],
  });
};

export const useQueryParam = (paramName: string) =>
  computed(() => useRoute().query[paramName]);

export function isV1Endpoint(endpoint: string) {
  return endpoint.includes('v1/');
}
