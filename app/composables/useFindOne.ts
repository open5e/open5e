import type { EndpointToFindOneTypeMap } from './api';

function formatQueryString(params?: Record<string, string>): string {
  // iterate over params: format as string[] of the form `field=value`
  if (!params) return '';
  const formattedParams = Object.entries(params).map(
    (([field, value]) => `${field}=${value}`)
  );

  return formattedParams.length === 0 ? '' : `/?${formattedParams.join('&')}`;
}

export function useFindOne<T extends keyof EndpointToFindOneTypeMap>(
  endpoint: T,
  id: MaybeRef<string>,
  options?: {
    params?: Record<string, string>;
  },
) {
  const { get } = useAPI();
  const queryString = formatQueryString(options?.params);

  return useQuery({
    queryKey: [endpoint, id, options],
    queryFn: async (): Promise<EndpointToFindOneTypeMap[T]> => {
      const data = await get(endpoint, unref(id), queryString);
      return data;
    },
  });
};
