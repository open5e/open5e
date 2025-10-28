import { computed, ref } from 'vue';

function loadSourcesFromLocalStorage(): string[] {
  if (!import.meta.client) return []; // skip on server
  const saved_sources = localStorage.getItem('sources');
  return saved_sources ? JSON.parse(saved_sources) : ['srd-2014', 'srd-2024'];
}

function writeSourcesToLocalStorage(sourcesList: string[]) {
  localStorage.setItem('sources', JSON.stringify(sourcesList));
}

const _sources = ref<string[]>(loadSourcesFromLocalStorage());

const loadGameSystemFromStorage = () => {
  if (!import.meta.client) return '';
  return localStorage.getItem('gamesystem');
};

const writeGameSystenToStorage = (input: string) =>
  localStorage.setItem('gamesystem', input);

const gameSystem = ref<string | null>(loadGameSystemFromStorage());

const setGameSystem = (input: string) => {
  gameSystem.value = input;
  writeGameSystenToStorage(input);
};

// Overwrite all sources, update local storage
export const setSources = (sources: string[]) => {
  _sources.value = sources;
  writeSourcesToLocalStorage(sources);
};

export const read_only_source_list = computed(() => _sources.value);

/** Access the global list of sources documents. These are used to limit which documents are used in API queries. */
export const useSourcesList = () => ({
  /** List of source tags */
  sources: read_only_source_list,
  gameSystem,
  setGameSystem,
  setSources,
});
