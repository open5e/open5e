import { getLegacyContentRoute, resolveLegacySlug } from '@/helpers/legacyContentRoutes';

export default defineNuxtRouteMiddleware(async (to) => {
  const route = getLegacyContentRoute(to.path);
  if (!route) return;

  const { config, slug } = route;
  if (slug.includes('_')) return;

  const apiUrl = useRuntimeConfig().public.apiUrl as string;
  const resolution = await resolveLegacySlug(config, slug, apiUrl);

  if (resolution.status === 'redirect') {
    return navigateTo(resolution.url, { redirectCode: 301 });
  }

  if (resolution.status === 'disambiguate') {
    useState(`legacy-disambiguation:${to.fullPath}`, () => resolution.matches);
  }
});
