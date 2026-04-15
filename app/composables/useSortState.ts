/* useSortState contains logic for controlling api result table sorting.
 * Values returned are designed to interface btwn the useFindPaginated
 * composable and the ResultsTableHeader component */

import { ref } from 'vue';

export const useSortState = () => {
  // api field to sort results by
  const currentSortingProperty = ref('name');

  // state controlling sort direction of results (asc. or desc.)
  const isSortDescending = ref(false);

  // setter for updating sort state, handles interactions btwn sorting prop
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
    isSortDescending, // boolean: is sort asc. or desc.
    setSortState,
  };
};
