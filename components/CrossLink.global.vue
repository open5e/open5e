<template>
  <nuxt-link :to="url">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: '',
    },
  },
};
</script>

<style></style>
