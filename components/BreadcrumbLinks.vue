<template>
  <nav
    class="md:text-md my-1 flex items-center border border-gray-200 px-2 py-0 align-middle text-sm font-semibold uppercase dark:border-basalt md:ml-8 md:px-4 md:py-2"
    aria-label="breadcrumbs"
  >
    <ol class="space-x-3">
      <li
        v-for="crumb in crumbs"
        :key="crumb.url"
        class="inline-flex h-10 items-center align-middle after:ml-4 after:text-blood after:content-['/'] last:after:content-['']"
      >
        <nuxt-link
          :to="crumb.url"
          class="inline-flex items-center align-middle text-gray-700 visited:text-gray-700 hover:text-red-700 dark:text-gray-200 dark:visited:text-gray-200 dark:hover:text-red-400"
        >
          <Icon
            v-if="crumb.title === 'Home'"
            name="heroicons:home"
            class="mr-1"
          />
          <span>{{ crumb.title }}</span>
          <span v-if="crumb.subtitle" class="ml-2 font-thin text-granite">
            ({{ crumb.subtitle }})
          </span>
        </nuxt-link>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  computed: {
    crumbs() {
      // iterate over segments of current path to create breadcrumbs
      let url = '';
      const breadcrumbs = this.$route.fullPath
        .split('/')
        .map((segment) => {
          // ignore initial & trailing slashes
          if (segment === '' || segment === '/') {
            return;
          }

          // rebuild link urls segment by segment
          url += `/${segment}`;

          // seperate segment title & query params
          const [title, queryParams] = segment.split('?');
          // extract & format the search params if on the /search route
          const searchParam =
            title === 'search' &&
            queryParams.split('text=')[1].split('+').join(' ');

          return {
            url,
            title: title // format crumb title
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' '),
            subtitle: searchParam,
          };
        })
        .filter((breadcrumb) => breadcrumb); // filter null crumbs

      // prepend Home route to list of crumbs
      return [{ title: 'Home', url: '/' }, ...breadcrumbs];
    },
  },
};
</script>
