export function useFilterState<T extends Record<string, any>>(
  initialFilters: T
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

  return { clear, enabeledFiltersCount, filter, canClearFilter };
}
