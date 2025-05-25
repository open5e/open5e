// This composable maintains the state of multiple filters, eg. monsters, magic items, classes
import { ref, computed } from 'vue';
import { debouncedRef } from '@vueuse/core';

export type Fields = Record<string, string | boolean>;

export type FilterStateOptions<TFields extends Fields> = {
  key: string;
  fields?: TFields;
  debounceTimeMs?: number;
};

export type FilterState<TFields extends Fields> = ReturnType<typeof useFilterState<TFields>>;

// Reactive global store for filters
const filters = ref<Record<string, Fields>>({});

export function useFilterState<TFields extends Fields>(
  options: FilterStateOptions<TFields>,
) {
  // Initialize filter fields if not already set
  if (!filters.value[options.key]) {
    filters.value[options.key] = { ...options.fields };
  }

  const fieldsState = computed(() => filters.value[options.key] || ({} as TFields));

  const filterInitialized = computed(
    () => Object.keys(fieldsState.value).length > 0,
  );

  const filteringByFields = computed(() =>
    Object.keys(fieldsState.value).filter(key => !!fieldsState.value[key]),
  );

  const canClearFilter = computed(() => filteringByFields.value.length > 0);

  const debouncedFilter = debouncedRef(fieldsState, options.debounceTimeMs || 300);

  function setFilterFields(newFields: Partial<TFields>) {
    filters.value[options.key] = { ...filters.value[options.key], ...newFields };
  }

  function clearFilter() {
    filters.value[options.key] = {} as TFields;
  }

  function updateField<K extends keyof TFields>(fieldKey: K, fieldValue: TFields[K]) {
    filters.value[options.key] = { ...filters.value[options.key], [fieldKey]: fieldValue };
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
