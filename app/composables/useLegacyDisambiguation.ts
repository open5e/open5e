import type { SearchResult } from '@/types';

export function legacyDisambiguationStateKey(path: string): string {
  return `legacy-disambiguation:${path}`;
}

export function useLegacyDisambiguation(): Ref<SearchResult[] | null> {
  const route = useRoute();
  return useState<SearchResult[] | null>(legacyDisambiguationStateKey(route.path), () => null);
}

export function useLegacyContentDetail() {
  const disambiguation = useLegacyDisambiguation();
  const showDisambiguation = computed(() => !!disambiguation.value?.length);
  const fetchEnabled = computed(() => !showDisambiguation.value);

  return { disambiguation, showDisambiguation, fetchEnabled };
}
