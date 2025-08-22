import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { navigateTo, useRoute, useRuntimeConfig } from 'nuxt/app';
import type { MaybeRef, Ref } from 'vue';
import { computed, unref } from 'vue';
import { useSourcesList } from './sources';


export const API_ENDPOINTS = {
  backgrounds: 'v2/backgrounds/',
  classes: 'v2/classes/',
  conditions: 'v2/conditions/',
  documents: 'v2/documents/',
  feats: 'v2/feats/',
  magicitems: 'v2/items/',
  monsters: 'v2/creatures/',
  search: 'v2/search/',
  species: 'v2/species/',
  spells: 'v2/spells/',
  rules: 'v2/rulesets/',
  equipment: 'v2/items/',
} as const;

/** Provides the base functions to easily fetch data from the Open5e API. */
export const useAPI = () => {
  const API_URL = useRuntimeConfig().public.apiUrl;

  const api = axios.create({
    baseURL: API_URL as string,
    headers: { Accept: 'application/json' },
  });

  return {
    findMany: async (
      endpoint: string,
      sources: string[],
      params: Record<string, unknown> = {},
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

      return res.data.results as Record<string, unknown>[];
    },
    findPaginated: async <T = Record<string, unknown>> (options: {
      endpoint: string;
      sources: string[];
      pageNo?: number;
      itemsPerPage?: number;
      sortByProperty?: string;
      isSortDescending?: boolean;
      queryParams?: Record<string, unknown>;
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
        results: T[];
        next: string | null;
        previous: string | null;
      };

      return data;
    },
    get: async (...parts: string[]) => {
      const route = parts.join('');
      const res = await api.get(route).catch(() => {
        // redirect to /search if API route returns nothing
        const searchTerm = parts.filter(exists => exists).slice(-1)[0];
        navigateTo(`/search?text=${searchTerm}`);
      });
      return res?.data as Record<string, unknown>;
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

export const useDocuments = (params: Record<string, unknown> = {}) => {
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
