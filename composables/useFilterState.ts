// This composable maintains the state of multiple filters, eg. monsters, magic items, classes
import { ref, computed } from 'vue'
import { debouncedRef } from '@vueuse/core';

export type Fields = Record<string, string | boolean>

export type FilterStateOptions<Fields> = {
  key: string;
  fields?: Fields;
  debounceTimeMs?: number;
};

export type FilterState = typeof useFilterState

// Reactive global store for filters
const filters = ref<Record<string, Fields>>({});

export function useFilterState<T extends Fields>(
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
    filters.value[key] = { ...filters.value[key], [fieldKey]: fieldValue };
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
