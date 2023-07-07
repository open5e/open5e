<template>
  <nav
    class="md:text-md mt-1 flex items-center border border-gray-200 py-1 align-middle text-sm font-semibold uppercase md:ml-8 md:px-4"
    aria-label="breadcrumbs"
  >
    <ol class="space-x-3">
      <li
        v-for="crumb in crumbs"
        :key="crumb.url"
        class="inline-flex h-10 items-center align-middle"
      >
        <nuxt-link
          :to="crumb.url"
          class="inline-flex items-center align-middle text-gray-700 visited:text-gray-700 hover:text-red-700"
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

<style scoped>
li:after {
  content: ' / ';
  color: rgb(159 33 20);
  display: inline;
  margin-left: 1rem;
}

li:last-child:after {
  content: '';
}
</style>
