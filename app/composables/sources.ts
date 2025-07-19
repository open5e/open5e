import { computed, ref } from 'vue';

function loadSourcesFromLocalStorage() {
  if (!import.meta.client) return []; // skip on server
  const saved_sources = localStorage.getItem('sources');
  return saved_sources ? JSON.parse(saved_sources) : [];
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

/* _sourcesV1 maps Document keys from API V2 onto their V1 equivalents. This
 * has been added so that we can move the /documents endpoint over to V2 w/o
 * breaking the seleciton by source functionality for routes pulling from V1.
 * Keys omitted from the sourcemap will be the same for V1 & V2 endpoints */

const _sourcesV1 = computed(() => {
  if (!_sources.value || _sources.value.length === 0) return [];
  const sourcemap: { [key: string]: string } = {
    'a5e-ag': 'a5e',
    'bfrd': 'blackflag',
    'ccdx': 'cc',
    'deepm': 'dmag',
    'deepmx': 'dmag-e',
    'mmenag': 'menagerie',
    'open5e': 'o5e',
    'srd': 'wotc-srd',
    'tdcs': 'taldorei',
    'wz': 'warlock',
  };
  return _sources.value.map((source) => {
    if (source in sourcemap) return sourcemap[source];
    return source;
  });
});

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
  sourcesAPIVersion1: _sourcesV1,
});
