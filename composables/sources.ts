function loadSourcesFromLocalStorage() {
  if (!process.client) return []; // skip on server
  const saved_sources = localStorage.getItem('sources');
  return saved_sources ? JSON.parse(saved_sources) : [];
}

function writeSourcesToLocalStorage(sourcesList: string[]) {
  localStorage.setItem('sources', JSON.stringify(sourcesList));
}

const _sources = ref<string[]>(loadSourcesFromLocalStorage());

export const setSources = (sources: string[]) => {
  _sources.value = sources;
  writeSourcesToLocalStorage(sources);
};

export const read_only_source_list = computed(() => _sources.value);

/** Access the global list of sources documents. These are used to limit which documents are used in API queries. */
export const useSourcesList = () => ({
  /** List of source tags */
  sources: read_only_source_list,
  /** Overwrite the list of source tags */
  setSources,
});
