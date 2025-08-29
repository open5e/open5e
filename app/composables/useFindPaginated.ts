/* useFindPaginated handles paginated queries to the Open5e API. It will return
 * one page of data at a time, handling refetching as query parameters change.
 * It also returns a 'paginator' obj, which contains methods for changing the
 * requested page */

import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/vue-query';

export function useFindPaginated<T extends keyof EndpointToPaginatedTypeMap>(options: {
  endpoint: MaybeRef<T>;
  itemsPerPage?: MaybeRef<number>;
  initialPage?: MaybeRef<number>;
  sortByProperty?: MaybeRef<string>;
  isSortDescending?: MaybeRef<boolean>;
  filter?: MaybeRef<Record<string, string | number | boolean>>;
  params?: MaybeRef<Record<string, string | number | boolean>>;
}) {

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
  const queryClient = useQueryClient();
  const { sources } = useSourcesList();

  // query parameters generator helper function
  const createQueryParams = (targetPageNo: number) => ({
    endpoint: unref(endpoint),
    sources: unref(sources),
    pageNo: targetPageNo,
    sortByProperty: unref(sortByProperty),
    isSortDescending: unref(isSortDescending),
    itemsPerPage: unref(itemsPerPage),
    queryParams: { ...unref(params), ...unref(filter) },
  });

  // query key controls caching of pages
  const queryKey = [
    'findPaginated',
    endpoint,
    sources,
    itemsPerPage,
    sortByProperty,
    isSortDescending,
    filter,
    params,
  ];

  const { data, isFetching, error } = useQuery({
    queryKey: [...queryKey, pageNo],
    placeholderData: keepPreviousData,
    queryFn: () => findPaginated(createQueryParams(unref(pageNo))),
  });

  const lastPageNo = computed(() => {
    return data.value ? Math.ceil(data.value.count / unref(itemsPerPage)) : 1;
  });

  // Prefetch next page when data changes
  watch(data, () => {
    if (!data.value || pageNo.value === lastPageNo.value ) return;
    const nextPageNo = pageNo.value + 1;
    queryClient.prefetchQuery({
      queryKey: [...queryKey, nextPageNo],
      queryFn: () => findPaginated(createQueryParams(unref(nextPageNo))),
    });
});

  // pagination controls
  const nextPage = () => pageNo.value++;
  const prevPage = () => pageNo.value--;
  const firstPage = () => pageNo.value = 1;
  const lastPage = () => pageNo.value = lastPageNo.value ?? pageNo.value;

  // Move to the first page when the filter changes, to avoid showing an empty page due to fewer results
  watch(filter, () => firstPage());

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
