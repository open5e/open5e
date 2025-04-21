/* useFindPaginated handles paginated queries to the Open5e API. It will return
 * one page of data at a time, handling refetching as query parameters change.
 * It also returns a 'paginator' obj, which contains methods for changing the
 * requested page */

import { keepPreviousData, useQuery } from '@tanstack/vue-query';

export const useFindPaginated = (options: {
  endpoint: MaybeRef<string>;
  itemsPerPage?: MaybeRef<number>;
  initialPage?: MaybeRef<number>;
  sortByProperty?: MaybeRef<string>;
  isSortDescending?: MaybeRef<boolean>;
  filter?: MaybeRef<Record<string, never>>;
  params?: MaybeRef<Record<string, never>>;
}) => {
  const {
    endpoint,
    itemsPerPage = 50,
    initialPage = 1,
    sortByProperty = 'name',
    isSortDescending = false,
    filter = {},
    params = {},
  } = options;
  const pageNo = ref(unref(initialPage));
  const { findPaginated } = useAPI();

  // map V2 source keys to V1 source slugs if necessary
  const { sources, sourcesAPIVersion1 } = useSourcesList();
  const sourcesForAPIVersion = isV1Endpoint(unref(endpoint))
    ? sourcesAPIVersion1
    : sources;

  const { data, isFetching, error } = useQuery({
    queryKey: [
      'findPaginated',
      endpoint,
      sourcesForAPIVersion,
      itemsPerPage,
      pageNo,
      sortByProperty,
      isSortDescending,
      filter,
      params,
    ],
    placeholderData: keepPreviousData,
    queryFn: () =>
      findPaginated({
        endpoint: unref(endpoint),
        sources: unref(sourcesForAPIVersion),
        pageNo: unref(pageNo),
        sortByProperty: unref(sortByProperty),
        isSortDescending: unref(isSortDescending),
        itemsPerPage: unref(itemsPerPage),
        queryParams: { ...unref(params), ...unref(filter) },
      }),
  });

  const lastPageNo = computed(() => {
    return data.value ? Math.ceil(data.value.count / unref(itemsPerPage)) : 1;
  });

  const nextPage = () => {
    pageNo.value++;
  };

  const prevPage = () => {
    if (pageNo.value > 1) {
      pageNo.value--;
    }
  };

  const firstPage = () => {
    pageNo.value = 1;
  };

  const lastPage = () => {
    if (data.value) {
      pageNo.value = lastPageNo.value;
    }
  };

  // Move to the first page when the filter changes, to avoid showing an empty page due to fewer results
  watch(filter, () => {
    firstPage();
  });

  return {
    data,
    paginator: {
      isFetching,
      error,
      firstPage,
      prevPage,
      nextPage,
      lastPage,
      pageNo,
      lastPageNo,
      itemsPerPage,
    },
  };
};
