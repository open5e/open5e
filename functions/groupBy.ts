/**
 * Groups an array of objects by a key.
 */
export function groupBy<T extends Record<string, never>>(
  array: T[],
  key: keyof T,
): Record<string, T[]> {
  return array.reduce((result: Record<string, T[]>, item: T) => {
    const keyValue = item[key];
    if (!result[keyValue]) {
      result[keyValue] = [];
    }
    result[keyValue].push(item);
    return result;
  }, {});
}
