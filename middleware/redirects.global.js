const redirects = {
  '/monsters/monster-list': '/monsters',
  '/magicitems/magicitem-list': '/magicitems',
  '/spells/spells-table': '/spells',
};

export default defineNuxtRouteMiddleware((to) => {
  // rmv terminal slash from path
  const path = to.fullPath.endsWith('/')
    ? to.fullPath.slice(0, -1)
    : to.fullPath;

  // if path is present in redirects obj, redirect the user
  if (redirects[path]) {
    return navigateTo(redirects[path]);
  }
});
