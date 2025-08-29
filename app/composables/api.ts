import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import { navigateTo, useRoute, useRuntimeConfig } from 'nuxt/app';
import type { MaybeRef, Ref } from 'vue';
import { computed, unref } from 'vue';
import { useSourcesList } from './sources';
import type { components } from '~/types/open5e-api';

// Extract schemas from OpenAPI components
type Schemas = components['schemas'];

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
  licenses: 'v2/licenses/',
} as const;

export interface EndpointToFindOneTypeMap {
  'v2/backgrounds/': Schemas['Background'];
  'v2/classes/': Schemas['CharacterClass'];
  'v2/conditions/': Schemas['Condition'];
  'v2/documents/': Schemas['Document'];
  'v2/feats/': Schemas['Feat'];
  'v2/items/': Schemas['Item'];
  'v2/creatures/': Schemas['Creature'];
  'v2/search/': Schemas['SearchResult'];
  'v2/species/': Schemas['Species'];
  'v2/spells/': Schemas['Spell'];
  'v2/rulesets/': Schemas['RuleSet'];
}

export interface EndpointToPaginatedTypeMap {
  'v2/backgrounds/': Schemas['PaginatedBackgroundList'];
  'v2/classes/': Schemas['PaginatedCharacterClassList'];
  'v2/conditions/': Schemas['PaginatedConditionList'];
  'v2/documents/': Schemas['PaginatedDocumentList'];
  'v2/feats/': Schemas['PaginatedFeatList'];
  'v2/items/': Schemas['PaginatedItemList'];
  'v2/creatures/': Schemas['PaginatedCreatureList'];
  'v2/search/': Schemas['PaginatedSearchResultList'];
  'v2/species/': Schemas['PaginatedSpeciesList'];
  'v2/spells/': Schemas['PaginatedSpellList'];
  'v2/rulesets/': Schemas['PaginatedRuleSetList'];
}

// utility type to extract the item type from paginated responses
export type ExtractItemType<T> = T extends { results: (infer U)[] } ? U : never;

// convenience type to get item type from endpoint key
export type ExtractPaginatedItemType<T extends keyof EndpointToPaginatedTypeMap> = 
  ExtractItemType<EndpointToPaginatedTypeMap[T]>;

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
    findPaginated: async <T extends keyof EndpointToPaginatedTypeMap> (options: {
      endpoint: T;
      sources: string[];
      pageNo?: number;
      itemsPerPage?: number;
      sortByProperty?: string;
      isSortDescending?: boolean;
      queryParams?: Record<string, unknown>;
    }): Promise<EndpointToPaginatedTypeMap[T]> => {
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
      return res?.data;
    },
    get: async <T extends keyof EndpointToFindOneTypeMap>(
      endpoint: T,
      ...parts: string[]
    ): Promise<EndpointToFindOneTypeMap[T]> => {
      const route = [endpoint, ...parts].join('');
      const res = await api.get(route).catch(() => {
        // redirect to /search if API route returns nothing
        const searchTerm = parts.filter(exists => exists).slice(-1)[0];
        navigateTo(`/search?text=${searchTerm}`);
      });
      return res?.data;
    },
  };
};

export const useFindMany = (
  endpoint: MaybeRef<string>,
  params?: MaybeRef<Record<string, string | number | boolean>>,
) => {
  const { findMany } = useAPI();

  const { sources } = useSourcesList();

  return useQuery({
    queryKey: ['findMany', endpoint, sources, params],
    queryFn: () =>
      unref(
        findMany(unref(endpoint), unref(sources), unref(params)),
      ),
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