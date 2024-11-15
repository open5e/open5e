// This composable maintains the state of multiple filters, eg. monsters, magic items, classes
import { debouncedRef } from '@vueuse/core';

export type FilterStateOptions<T> = {
  key: string;
  fields?: T;
  debounceTimeMs?: number;
};

type FilterFieldKey = string;
type FilterFieldValue = string;
type Fields = Record<FilterFieldKey, FilterFieldValue>;

type FilterKey = string;
type Filters = Record<FilterKey, Fields>;

const filters = ref<Filters>({});

export function useFilterState<T extends Record<string, any>>(
  options?: FilterStateOptions<T>
) {
  const fieldsState = computed<Fields>(() => {
    return filters.value[options.key] || {};
  });

  const filterInitialised = computed(() => {
    return Object.keys(fieldsState.value).length > 0;
  });

  if (!filterInitialised && options?.fields) {
    setFilterFields(options.fields);
  }

  function setFilterFields<T>(filterFieldsToSet: Fields) {
    filters.value = {
      ...filters.value,
      [options.key]: filterFieldsToSet,
    };
  }

  const filteringByFields = computed(() => {
    return Object.values(fieldsState.value).filter(
      (value) => value !== undefined && value !== ''
    );
  });

  const canClearFilter = computed(() => filteringByFields.value.length > 0);

  function clearFilter() {
    setFilterFields({});
  }

  const debouncedFilter = debouncedRef(
    fieldsState,
    options?.debounceTimeMs || 300
  );

  function updateField(key: FilterFieldKey, value: FilterFieldValue) {
    setFilterFields({ ...fieldsState.value, [key]: value });
  }

  return {
    clearFilter,
    updateField,
    filteringByFields,
    fieldsState,
    debouncedFilter,
    canClearFilter,
  };
}
