import axios from 'axios';

export function useFindOne(
  endpoint: string,
  id: MaybeRef<string>,
  options?: {
    params: Record<string, string>;
    relatedFields: string[];
  },
) {
  const { get } = useAPI();

  const params = options?.params;
  const formattedParams: string[] = [];
  for (const name in params) {
    formattedParams.push(`${name}=${params[name]}`);
  }
  const paramString
    = formattedParams.length === 0 ? '' : '/?' + formattedParams.join('&');

  return useQuery({
    queryKey: [endpoint, id],
    queryFn: async () => {
      const data = await get(endpoint, unref(id), paramString);
      return await fetchNestedResources(
        data,
        options?.relatedFields ?? [],
      );
    },
  });
};

/**
 * Recursively fetch nested resources based on the specified fields.
 * @param data - The current data object.
 * @param fields - The list of fields to fetch.
 * @returns The data object with nested resources fetched.
 */
async function fetchNestedResources (
  data: Record<string, unknown>,
  fields: string[],
): Promise<Record<string, unknown>> {
  for (const field of fields) {
    const fieldParts = field.split('.');
    let currentData = data;
    let parentData = data;
    let parentKey = '';

    // Traverse the nested fields
    for (const part of fieldParts) {
      if (currentData[part]) {
        parentData = currentData;
        parentKey = part;
        currentData = currentData[part] as Record<string, unknown>;
      } else {
        (currentData as Record<string, null>)[part] = null;
        break;
      }
    }

    // Fetch related data if the current field is a URL
    if (
      typeof currentData === 'string'
      && (currentData as string).startsWith('http')
    ) {
      const relatedData = await axios.get(currentData);
      parentData[parentKey] = relatedData.data;

      // Recursively fetch nested related fields
      const nestedFields = fields
        .filter(f => f.startsWith(`${field}.`))
        .map(f => f.slice(field.length + 1));

      if (nestedFields.length === 0) return data;

      await fetchNestedResources(
        parentData[parentKey] as Record<string, unknown>,
        nestedFields,
      );
    }
  }
  return data;
};