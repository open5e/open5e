// if a url matches a key, trigger redirect to value
const exactMatchesToRedirect = {
  '/monsters/monster-list': '/monsters',
  '/magicitems/magicitem-list': '/magic-items',
  '/spells/spells-table': '/spells',
  '/magicitems': '/magic-items',
  '/sections': '/rules',
};

// if a url contains 'find' as a substring, trigger redirect to 'to'
const partialMatchesToRedirect = [
  { find: '/combat', to: '/rules' },
  { find: '/characters', to: '/rules' },
  { find: '/gameplay-mechanics', to: '/rules' },
  { find: '/running', to: '/rules' },
];

// if a url contains a substring, replace it with another substring
const substitutions = [{ find: '/magicitems', replaceWith: '/magic-items' }];

export default defineNuxtRouteMiddleware((to) => {
  // remove terminal slash from path
  const path = to.fullPath.endsWith('/')
    ? to.fullPath.slice(0, -1)
    : to.fullPath;

  // handle exact url match redirects
  if (exactMatchesToRedirect[path]) {
    return navigateTo(exactMatchesToRedirect[path], { redirectCode: 301 });
  }

  // handle partial url match redirects
  const partialMatchRedirect = partialMatchesToRedirect
    .map(({ find, to }) => {
      if (path.search(find) > -1) return to;
    })
    .filter(exists => !!exists);
  if (partialMatchRedirect.length > 0)
    return navigateTo(partialMatchRedirect[0], { redirectCode: 301 });

  // finally, check if any substring substitutions need to be made
  substitutions.forEach(({ find, replaceWith }) => {
    if (path.search(find) > -1) {
      return navigateTo(path.replace(find, replaceWith), { redirectCode: 301 });
    }
  });
});
