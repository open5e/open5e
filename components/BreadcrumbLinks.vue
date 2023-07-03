<template>
  <nav class="flex" aria-label="breadcrumbs">
    <ol class="inline-flex">
      <li v-for="crumb in crumbs" :key="crumb.url" class="inline">
        <nuxt-link :to="crumb.url">
          <Icon v-if="crumb.title === 'Home'" name="heroicons:home" />
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
  content: ' » ';
  display: inline;
}
li:last-child:after {
  content: '';
}
</style>
