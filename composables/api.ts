import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import axios from 'axios';

export const API_ENDPOINTS = {
  backgrounds: 'v1/backgrounds',
  characters: 'v1/characters',
  classes: 'v1/classes',
  conditions: 'v1/conditions',
  documents: 'v1/documents',
  feats: 'v1/feats',
  magicitems: 'v1/magicitems',
  monsters: 'v1/monsters',
  races: 'v1/races',
  search: 'v2/search/',
  sections: 'v1/sections',
  spells: 'v1/spells',
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
          document__slug__in: formattedSources,
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
          document__slug__in: formattedSources,
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
      const route = '/' + parts.join('/');
      const res = await api.get(route);
      return res.data as Record<string, any>;
    },
  };
};

export const useFindMany = (
  endpoint: MaybeRef<string>,
  params?: MaybeRef<Record<string, string | number>>
) => {
  const { findMany } = useAPI();
  const { sources } = useSourcesList();
  return useQuery({
    queryKey: ['findMany', endpoint, sources, params],
    queryFn: () =>
      unref(findMany(unref(endpoint), unref(sources), unref(params))),
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
  const { sources } = useSourcesList();
  const { data, isFetching, error } = useQuery({
    queryKey: [
      'findPaginated',
      endpoint,
      sources,
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
        sources: unref(sources),
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

export const useFindOne = (
  endpoint: MaybeRef<string>,
  slug: MaybeRef<string>
) => {
  const { get } = useAPI();
  return useQuery({
    queryKey: ['get', endpoint, slug],
    queryFn: () => get(unref(endpoint), unref(slug)),
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
