// add redirects for exact path matches here
const redirects = {
  '/monsters/monster-list': '/monsters',
  '/magicitems/magicitem-list': '/magic-items',
  '/spells/spells-table': '/spells',
  '/magicitems': '/magic-items',
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

  // fetch section parent & create redirect URL
  const { data } = await useFetch(endpoint);
  if (!data?.value) {
    return;
  }

  // slugify section parent
  const parent = data.value.parent
    .toLowerCase()
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace('rules', 'gameplay-mechanics'); // handle common inconsistancy in data-set
  return `/${parent}/${slug}`;
}

export default defineNuxtRouteMiddleware((to) => {
  // redirecting only works client-side, return if server-side
  if (process.server) {
    return;
  }

  // remove terminal slash from path
  const path = to.fullPath.endsWith('/')
    ? to.fullPath.slice(0, -1)
    : to.fullPath;

  // if entire path is present in redirects obj, navigate to it
  if (redirects[path]) {
    return navigateTo(redirects[path], { redirectCode: 301 });
  }

  // check whether any part of the path needs to be replaced
  substitutions.forEach(({ find, replaceWith }) => {
    if (path.search(find) > -1) {
      return navigateTo(path.replace(find, replaceWith), { redirectCode: 301 });
    }
  });

  // check whether a /section/ route needs to be replaced with parent from API
  if (path.search('/sections/') > -1) {
    return navigateTo(replaceSectionsWithParent(path), { redirectCode: 301 });
  }
});
