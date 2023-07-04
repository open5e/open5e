// add redirects for exact path matches here
const redirects = {
  '/monsters/monster-list': '/monsters',
  '/magicitems/magicitem-list': '/magicitems',
  '/spells/spells-table': '/spells',
};

// add redirects for partial path matches here
const substitutions = [
  {
    find: '/magicitems',
    replaceWith: '/magic-items',
  },
];

export default defineNuxtRouteMiddleware((to) => {
  // rmv terminal slash from path
  const path = to.fullPath.endsWith('/')
    ? to.fullPath.slice(0, -1)
    : to.fullPath;

  // if path is present in redirects obj, redirect the user
  if (redirects[path]) {
    return navigateTo(redirects[path]);
  }

  // check whether any part of the path needs to be replaced
  let pathWithSubs = path;
  substitutions.forEach(({ find, replaceWith }) => {
    if (path.search(find) > -1) {
      pathWithSubs = pathWithSubs.replace(find, replaceWith);
    }
  });

  // redirect if we made any substitutions into the path
  if (pathWithSubs !== path) {
    return navigateTo(pathWithSubs);
  }
});
