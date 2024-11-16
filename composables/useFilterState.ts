// This composable maintains the state of multiple filters, eg. monsters, magic items, classes
import { debouncedRef } from '@vueuse/core';

export type FilterStateOptions<T extends Record<string, any>> = {
  key: string;
  fields?: T;
  debounceTimeMs?: number;
};

// Reactive global store for filters
const filters = ref<Record<string, Record<string, any>>>({});

export function useFilterState<T extends Record<string, any>>(
  options: FilterStateOptions<T>
) {
  const { key, fields = {} as T, debounceTimeMs = 300 } = options;

  // Initialize filter fields if not already set
  if (!filters.value[key]) {
    filters.value[key] = { ...fields };
  }

  const fieldsState = computed(() => filters.value[key] || ({} as T));

  const filterInitialized = computed(
    () => Object.keys(fieldsState.value).length > 0
  );

  const filteringByFields = computed(() =>
    Object.keys(fieldsState.value).filter((key) => !!fieldsState.value[key])
  );

  const canClearFilter = computed(() => filteringByFields.value.length > 0);

  const debouncedFilter = debouncedRef(fieldsState, debounceTimeMs);

  function setFilterFields(newFields: Partial<T>) {
    filters.value[key] = { ...filters.value[key], ...newFields };
  }

  function clearFilter() {
    filters.value[key] = {} as T;
  }

  function updateField<K extends keyof T>(fieldKey: K, fieldValue: T[K]) {
    setFilterFields({ [fieldKey]: fieldValue } as Partial<T>);
  }

  return {
    fieldsState,
    filterInitialized,
    filteringByFields,
    canClearFilter,
    debouncedFilter,
    setFilterFields,
    clearFilter,
    updateField,
  };
}
