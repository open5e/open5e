import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { API_ENDPOINTS, useAPI } from '@/composables/api';
import { sortGameSystemKeys as sortGameSystemKeysHelper, sortGameSystems } from '@/helpers';
import type { Document } from '@/types';
import type { components } from '@/types/open5e-api';

type GameSystem = components['schemas']['GameSystem'];

const CATALOG_DOCUMENT_PARAMS = {
  fields: ['key', 'name', 'type', 'desc', 'publisher', 'gamesystem', 'licenses'].join(','),
  publisher__fields: ['name', 'key'].join(','),
  gamesystem__fields: ['name', 'key'].join(','),
};

export function useCatalog() {
  const { findMany } = useAPI();

  const documentsQuery = useQuery({
    queryKey: ['catalog', 'documents'],
    queryFn: async (): Promise<Document[]> =>
      findMany(API_ENDPOINTS.documents, [], CATALOG_DOCUMENT_PARAMS),
  });

  const gameSystemsQuery = useQuery({
    queryKey: ['catalog', 'gameSystems'],
    queryFn: async (): Promise<GameSystem[]> => {
      const data = await findMany(
        API_ENDPOINTS.gamesystems,
        [],
        { fields: 'key,name' },
      );
      return sortGameSystems(data);
    },
  });

  const documents = computed(() => documentsQuery.data.value ?? []);
  const gameSystems = computed(() => gameSystemsQuery.data.value ?? []);

  const sourceDocuments = computed(() =>
    documents.value.filter(document => document.type === 'SOURCE'),
  );

  const miscDocuments = computed(() =>
    documents.value.filter(document => document.type !== 'SOURCE'),
  );

  const sortedGameSystemsForSourceDocuments = computed(() => {
    const presentKeys = new Set(
      sourceDocuments.value
        .map(document => document.gamesystem?.key)
        .filter(Boolean),
    );
    return gameSystems.value.filter(system => presentKeys.has(system.key));
  });

  const documentName = (key: string) =>
    documents.value.find(document => document.key === key)?.name ?? key;

  const gameSystemName = (key: string) =>
    gameSystems.value.find(system => system.key === key)?.name ?? key;

  const sortGameSystemKeys = (keys: string[]) =>
    sortGameSystemKeysHelper(
      keys,
      Object.fromEntries(gameSystems.value.map(system => [system.key, system.name])),
    );

  return {
    documents,
    sourceDocuments,
    miscDocuments,
    sortedGameSystemsForSourceDocuments,
    documentName,
    gameSystemName,
    sortGameSystemKeys,
    isLoading: computed(() =>
      documentsQuery.isLoading.value || gameSystemsQuery.isLoading.value,
    ),
  };
}
