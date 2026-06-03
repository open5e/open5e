import { computed, ref } from 'vue';

const defaultSources = ['srd-2014', 'srd-2024', 'core', 'elderberry-inn-icons'];

function loadSourcesFromLocalStorage(): string[] {
  if (!import.meta.client) return [];
  const saved_sources = localStorage.getItem('sources');
  return saved_sources ? JSON.parse(saved_sources) : defaultSources;
}

function writeSourcesToLocalStorage(sourcesList: string[]) {
  localStorage.setItem('sources', JSON.stringify(sourcesList));
}

const _sources = ref<string[]>(loadSourcesFromLocalStorage());

function loadGameSystemFromStorage(): string {
  if (!import.meta.client) return '';
  return localStorage.getItem('gamesystem') ?? '';
}

const writeGameSystemToStorage = (input: string) => {
  if (input) localStorage.setItem('gamesystem', input);
  else localStorage.removeItem('gamesystem');
};

const gameSystem = ref<string>(loadGameSystemFromStorage());

const setGameSystem = (input: string) => {
  gameSystem.value = input;
  writeGameSystemToStorage(input);
};

export const setSources = (sources: string[]) => {
  const dedupedSources = [...new Set(sources)];
  _sources.value = dedupedSources;
  writeSourcesToLocalStorage(dedupedSources);
};

export const read_only_source_list = computed(() => _sources.value);

/** Access the global list of sources documents and the user's active game system key. */
export const useSourcesList = () => ({
  sources: read_only_source_list,
  gameSystem,
  setGameSystem,
  setSources,
});
