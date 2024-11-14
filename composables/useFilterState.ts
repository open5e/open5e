import { debouncedRef } from '@vueuse/core';

export type FilterStateOptions<T> = {
  initialFilters?: T;
  debounceTimeMs?: number;
};

const filter = ref({});

export function useFilterState<T extends Record<string, any>>(
  options?: FilterStateOptions<T>
) {
  const filterInitialised = computed(() => {
    return Object.keys(filter.value).length > 0;
  });

  if (!filterInitialised && options?.initialFilters) {
    setFilter(options.initialFilters);
  }

  function setFilter<T>(filterToSet) {
    filter.value = filterToSet;
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
