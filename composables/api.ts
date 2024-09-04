import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import axios from 'axios';

export const API_ENDPOINTS = {
  backgrounds: 'v2/backgrounds/',
  characters: 'v1/characters/',
  classes: 'v1/classes/',
  conditions: 'v1/conditions/',
  documents: 'v2/documents/',
  feats: 'v1/feats/',
  magicitems: 'v2/items/',
  monsters: 'v2/creatures/',
  races: 'v1/races/',
  search: 'v2/search/',
  sections: 'v1/sections/',
  spells: 'v2/spells/',
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
      params: Record<string, any> = {}
    ) => {
      const formattedSources =
        sources.length > 0 ? sources.join(',') : 'no-sources';
      const res = await api.get(endpoint, {
        params: {
          limit: 5000,
          document__key__in: formattedSources,
          ...params,
        },
      });

      return res.data.results as Record<string, any>[];
    },
    findPaginated: async (options: {
      endpoint: string;
      sources: string[];
      pageNo?: number;
      itemsPerPage?: number;
      sortByProperty?: string;
      isSortDescending?: boolean;
      queryParams?: Record<string, any>;
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

      const formattedSources =
        sources.length > 0 ? sources.join(',') : 'no-sources';
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
        results: Record<string, any>[];
        next: string | null;
        previous: string | null;
      };

      return data;
    },
    get: async (...parts: string[]) => {
      const route = parts.join('');
      const res = await api.get(route, {
        params: { depth: '2' },
      });
      return res.data as Record<string, any>;
    },
  };
};

export const useFindMany = (
  endpoint: MaybeRef<string>,
  params?: MaybeRef<Record<string, string | number>>
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
        findMany(unref(endpoint), unref(sourcesForAPIVersion), unref(params))
      ),
  });
};

export const useFindPaginated = (options: {
  endpoint: MaybeRef<string>;
  itemsPerPage?: MaybeRef<number>;
  initialPage?: MaybeRef<number>;
  sortByProperty?: MaybeRef<string>;
  isSortDescending?: MaybeRef<boolean>;
  filter?: MaybeRef<Record<string, any>>;
  params?: MaybeRef<Record<string, any>>;
}) => {
  const {
    endpoint,
    itemsPerPage = 50,
    initialPage = 1,
    sortByProperty = 'name',
    isSortDescending = false,
    filter = {},
    params = {},
  } = options;
  const pageNo = ref(unref(initialPage));
  const { findPaginated } = useAPI();
  const { sources, sourcesAPIVersion1 } = useSourcesList();
  const sourcesForAPIVersion = isV1Endpoint(unref(endpoint))
    ? sourcesAPIVersion1
    : sources;

  const { data, isFetching, error } = useQuery({
    queryKey: [
      'findPaginated',
      endpoint,
      sourcesForAPIVersion,
      itemsPerPage,
      pageNo,
      sortByProperty,
      isSortDescending,
      filter,
      params,
    ],
    placeholderData: keepPreviousData,
    queryFn: () =>
      findPaginated({
        endpoint: unref(endpoint),
        sources: unref(sourcesForAPIVersion),
        pageNo: unref(pageNo),
        sortByProperty: unref(sortByProperty),
        isSortDescending: unref(isSortDescending),
        itemsPerPage: unref(itemsPerPage),
        queryParams: { ...unref(params), ...unref(filter) },
      }),
  });

  const lastPageNo = computed(() => {
    return data.value ? Math.ceil(data.value.count / unref(itemsPerPage)) : 1;
  });

  const nextPage = () => {
    pageNo.value++;
  };

  const prevPage = () => {
    if (pageNo.value > 1) {
      pageNo.value--;
    }
  };

  const firstPage = () => {
    pageNo.value = 1;
  };

  const lastPage = () => {
    if (data.value) {
      pageNo.value = lastPageNo.value;
    }
  };

  // Move to the first page when the filter changes, to avoid showing an empty page due to fewer results
  watch(filter, () => {
    firstPage();
  });

  return {
    data,
    isFetching,
    error,
    firstPage,
    prevPage,
    nextPage,
    lastPage,
    pageNo,
    lastPageNo,
  };
};

/**
 * Recursively fetch nested resources based on the specified fields.
 * @param data - The current data object.
 * @param fields - The list of fields to fetch.
 * @returns The data object with nested resources fetched.
 */
const fetchNestedResources = async (
  data: Record<string, any>,
  fields: string[]
): Promise<Record<string, any>> => {
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
        (currentData as Record<string, any>)[part] = null;
        break;
      }
    }

    // Fetch related data if the current field is a URL
    if (
      typeof currentData === 'string' &&
      (currentData as string).startsWith('http')
    ) {
      const relatedData = await axios.get(currentData);
      parentData[parentKey] = relatedData.data;

      // Recursively fetch nested related fields
      const nestedFields = fields
        .filter((f) => f.startsWith(`${field}.`))
        .map((f) => f.slice(field.length + 1));
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
  relatedFields: string[] = []
) => {
  const { get } = useAPI();

  return useQuery({
    queryKey: [endpoint, id],
    queryFn: async () => {
      // Fetch the main data
      const data = await get(endpoint, unref(id));
      // Fetch related data for the specified fields
      const enrichedData = await fetchNestedResources(data, relatedFields);

      return enrichedData;
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
      return class_result.archetypes.find((a: any) => a.slug === subclass);
    },
  });
};

export const useSections = (...categories: string[]) => {
  const { data: sections, isPending } = useFindMany(API_ENDPOINTS.sections, {
    fields: ['slug', 'name', 'parent'].join(),
  });
  const filtered_sections = computed(() =>
    sections.value?.filter((section) =>
      categories.includes(`${section.parent}`)
    )
  );
  return { data: filtered_sections, isPending };
};

/**
 * Returns a new array of items sorted by the given field
 */
export function sortByField(
  items: Record<string, any>[],
  field: string,
  direction: 'ascending' | 'descending' = 'ascending'
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

export type MagicItemsFilter = {
  name?: string;
  rarity?: string;
  type?: string;
  isAttunementRequired?: boolean;
};

export const useDocuments = (params: Record<string, any> = {}) => {
  params.depth = '1';
  const { findMany } = useAPI();
  return useQuery({
    queryKey: ['findMany', API_ENDPOINTS.documents],
    queryFn: () => findMany(API_ENDPOINTS.documents, [], params),
  });
};

export const useSearch = (queryRef: Ref<string>) => {
  const { findMany } = useAPI();
  return useQuery({
    queryKey: ['search', queryRef],
    queryFn: () =>
      queryRef.value
        ? findMany(`${API_ENDPOINTS.search}`, [], {
            schema: 'v1',
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
