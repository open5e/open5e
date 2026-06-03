// This middleware strips query params from urls site-wide, and if a `sources` 
// parameter is present, it uses its payload to update sources in localStroage.
//
// ie. `open5e.com/?sources=srd-2024` will redirect to `open5e.com` but will 
// also update the sources lists so that only `srd-2024` in enabled.

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return;
  const [path, queryString] = to.fullPath.split('?');

  if (!queryString) return;

  const params = parseQueryString(queryString);
  const sources = params?.['sources'];

  if (!sources) return;
  
  const { setSources } = useSourcesList();
  setSources(sources);
  return navigateTo(path);   // redirect to path w/o query parameters
});

function parseQueryString(input: string): Record<string, string[]> {
  if (!input) return {};

  const queryString = sanitizeQueryString(input);
  const output = {} as Record<string, string[]>;

  queryString.split('&').forEach((property) => {
      const [propName, values] = property.split('=');
      output[propName] = values.split(',');
    }
  );

  return output;
}

// filter characters we wouldn't expect in a query string to help prevent XSS
function sanitizeQueryString(input: string): string {
  return input.replace(/[^a-zA-Z0-9_&,=-]/g, '');
}