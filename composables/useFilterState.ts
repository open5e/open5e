import { debouncedRef } from '@vueuse/core';

export type FilterStateOptions<T> = {
  initialFilters?: T;
  localStorageKey?: string;
  debounceTimeMs?: number;
};

export function useFilterState<T extends Record<string, any>>(
  options?: FilterStateOptions<T>
) {
  const filter = ref<T>({});

  function setFilter<T>(filterToSet) {
    filter.value = filterToSet;
    if (options?.localStorageKey && import.meta.client) {
      localStorage.setItem(
        options.localStorageKey,
        JSON.stringify(filterToSet)
      );
    }
  }

  if (
    options?.localStorageKey &&
    import.meta.client &&
    localStorage.getItem(options.localStorageKey)
  ) {
    setFilter(JSON.parse(localStorage.getItem(options.localStorageKey)));
  } else if (options?.initialFilters) {
    setFilter(options.initialFilters);
  }

  const enabledFiltersCount = computed(() => {
    return Object.values(filter.value).filter(
      (value) => value !== undefined && value !== ''
    ).length;
  });

  const canClearFilter = computed(() => enabledFiltersCount.value > 0);

  function clear() {
    setFilter({});
  }

  const debouncedFilter = debouncedRef(filter, options?.debounceTimeMs || 300);

  function update(key: string, value: any) {
    setFilter({ ...filter.value, [key]: value });
  }

  return {
    clearFilter: clear,
    updateFilter: update,
    enabledFiltersCount,
    currentFilter: filter,
    debouncedFilter,
    canClearFilter,
  };
}
