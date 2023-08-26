// add redirects for exact path matches here
const redirects = {
  '/monsters/monster-list': '/monsters',
  '/magicitems/magicitem-list': '/magic-items',
  '/spells/spells-table': '/spells',
  '/magicitems': 'magic-items',
};

// add redirects for partial path matches here
const substitutions = [
  {
    find: '/magicitems',
    replaceWith: '/magic-items',
  },
];

// redirects from /sections routes require extra data from API
async function replaceSectionsWithParent(path) {
  const slug = path.split('/')[2]; // isolate UID
  const apiURL = useRuntimeConfig().public.apiUrl;
  const endpoint = `${apiURL}/sections/${slug}`;
  const { data } = await useFetch(endpoint);
  if (data?.value) {
    return `/${data.value.parent.toLowerCase()}/${slug}`;
  }
}

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

  // check whether a /section/ route needs to be replaced with parent from API
  if (pathWithSubs.search('/sections/') > -1) {
    pathWithSubs = replaceSectionsWithParent(path);
  }

  // redirect if we made any substitutions into the path
  if (pathWithSubs !== path) {
    return navigateTo(pathWithSubs);
  }
});
