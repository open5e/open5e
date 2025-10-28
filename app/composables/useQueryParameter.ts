export function useQueryParameter(parameterName: string): string {
  // fetch query parameter from useRoute composable
  const route = useRoute();
  const param = route.params[parameterName];
  if (!param) return '';

  // if param is an array, cast it to a string
  return Array.isArray(param) ? param[0] : param;
}