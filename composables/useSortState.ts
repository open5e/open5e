// This composable is designed to

export const useSortState = () => {
  const currentSortingProperty = ref('name');
  const isSortDescending = ref(false);

  const setSortState = (sortBy: string) => {
    if (sortBy === currentSortingProperty.value) {
      isSortDescending.value = !isSortDescending.value;
    } else {
      currentSortingProperty.value = sortBy;
      isSortDescending.value = false;
    }
  };

  return {
    sortBy: currentSortingProperty,
    isSortDescending,
    setSortState,
  };
};
