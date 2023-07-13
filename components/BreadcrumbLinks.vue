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
        </nuxt-link>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  computed: {
    crumbs() {
      const params = this.$route.fullPath.split('/');

      let path = '';

      const crumbs = params
        .map((param) => {
          // ignore initial & trailing slashes
          if (param === '' || param === '/') {
            return;
          }

          path = `${path}/${param}`;

          // format breadcrumb title from path
          const title = param
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          return { title: title, url: path };
        })
        .filter((element) => element); // remove null crumbs

      // prepend Home route
      return [{ title: 'Home', url: '/' }, ...crumbs];
    },
  },
};
</script>
