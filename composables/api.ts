import { useQuery } from '@tanstack/vue-query';
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
  search: 'v2/search',
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
      const res = await api.get(endpoint, {
        params: {
          limit: 5000,
          document__slug__in: sources.join(','),
          ...params,
        },
      });

      return res.data.results as Record<string, any>[];
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
  params?: MaybeRef<Record<string, any>>
) => {
  const { findMany } = useAPI();
  const { sources } = useSourcesList();
  return useQuery({
    queryKey: ['findMany', endpoint, sources, params],
    queryFn: () => findMany(unref(endpoint), unref(sources), unref(params)),
  });
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
      return {
        result: class_result.archetypes.find((a: any) => a.slug === subclass),
      };
    },
  });
};

export const useSections = (...categories: string[]) => {
  const { data: sections, isPending } = useFindMany(API_ENDPOINTS.sections);
  const filtered_sections = computed(() =>
    sections.value?.filter((section) => categories.includes(section.parent))
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

export const useDocuments = () => {
  const { findMany } = useAPI();
  return useQuery({
    queryKey: ['findMany', API_ENDPOINTS.documents],
    queryFn: () => findMany(API_ENDPOINTS.documents, []),
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
