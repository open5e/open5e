import { debouncedRef } from '@vueuse/core';
import { MAGIC_ITEMS_FILTER_KEY } from '~/composables/magic-items';

export type FilterStateOptions<T> = {
  defaultFilters: T;
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

  if (options?.initialFilters) {
    setFilter(options.initialFilters);
  } else if (
    options?.localStorageKey &&
    import.meta.client &&
    localStorage.getItem(options.localStorageKey)
  ) {
    setFilter(JSON.parse(localStorage.getItem(options.localStorageKey)));
  } else {
    setFilter(options.defaultFilter);
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
    filter,
    debouncedFilter,
    canClearFilter,
  };
}
