export function useFilterState<T extends Record<string, any>>(
  initialFilters: T
) {
  const filters = ref({ ...initialFilters }) as Ref<T>;

  const enabeledFiltersCount = computed(() => {
    return Object.values(filters.value).filter(
      (value) => value !== undefined && value !== ''
    ).length;
  });

  const canClearFilter = computed(() => enabeledFiltersCount.value > 0);

  function clear() {
    filters.value = { ...initialFilters };
  }

  return { clear, enabeledFiltersCount, filters, canClearFilter };
}
