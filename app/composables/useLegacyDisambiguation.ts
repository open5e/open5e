import type { SearchResult } from '@/types';

export function useLegacyDisambiguation(): Ref<SearchResult[] | null> {
  const route = useRoute();
  return useState<SearchResult[] | null>(`legacy-disambiguation:${route.fullPath}`, () => null);
}
