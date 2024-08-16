function loadSourcesFromLocalStorage() {
  if (!import.meta.client) return []; // skip on server
  const saved_sources = localStorage.getItem('sources');
  return saved_sources ? JSON.parse(saved_sources) : [];
}

function writeSourcesToLocalStorage(sourcesList: string[]) {
  localStorage.setItem('sources', JSON.stringify(sourcesList));
}

const _sources = ref<string[]>(loadSourcesFromLocalStorage());

const _sourcesV1 = computed(() => {
  if (!_sources.value || _sources.value.length === 0) return [];
  const sourcemap: { [key: string]: string } = {
    'a5e-ag': 'a5e',
    'a5e-ddg': 'a5e',
    'a5e-gpg': 'a5e',
    bfrd: 'blackflag',
    ccdx: 'cc',
    deepm: 'dmag',
    mmenag: 'menagerie',
    open5e: 'o5e',
    srd: 'wotc-srd',
    tdcs: 'taldorei',
    warlock: 'wz',
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
  setSources,
  sourcesAPIVersion1: _sourcesV1,
});
