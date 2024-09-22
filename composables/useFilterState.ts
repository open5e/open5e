import { debouncedRef } from '@vueuse/core';

export function useFilterState<T extends Record<string, any>>(
  initialFilters: T,
  debounceTimeMs = 300
) {
  const filter = ref({ ...initialFilters }) as Ref<T>;

  const enabeledFiltersCount = computed(() => {
    return Object.values(filter.value).filter(
      (value) => value !== undefined && value !== ''
    ).length;
  });

  const canClearFilter = computed(() => enabeledFiltersCount.value > 0);

  function clear() {
    filter.value = { ...initialFilters };
  }

  const debouncedFilter = debouncedRef(filter, debounceTimeMs);

  function update(key: string, value: any) {
    filter.value = { ...filter.value, [key]: value };
  }

  return {
    clear,
    update,
    enabeledFiltersCount,
    filter: computed(() => filter.value),
    debouncedFilter,
    canClearFilter,
  };
}
