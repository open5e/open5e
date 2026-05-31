// Legacy flat-slug URLs (no source prefix): 301 redirect, 404, or send to /{type}/{slug}/choose.
import { getLegacyContentRoute, resolveLegacySlug } from '@/helpers/legacyContentRoutes';

export default defineNuxtRouteMiddleware(async (to) => {
  const route = getLegacyContentRoute(to.path);
  if (!route) return;

  const { routeSegment, config, slug } = route;
  if (slug.includes('_')) return;

  const apiUrl = useRuntimeConfig().public.apiUrl as string;
  const resolution = await resolveLegacySlug(routeSegment, config, slug, apiUrl);

  if (resolution.status === 'redirect') {
    return navigateTo(resolution.url, { redirectCode: 301 });
  }

  if (resolution.status === 'disambiguate') {
    const contentType = to.path.split('/').filter(Boolean)[0];
    return navigateTo(`/${contentType}/${slug}/choose`, { redirectCode: 302 });
  }

  if (resolution.status === 'not_found') {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' });
  }
});
