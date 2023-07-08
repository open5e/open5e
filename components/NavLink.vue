<template>
  <nuxt-link
    :class="`bold block px-4 py-3 text-white hover:bg-slate-800/40
      hover:underline ${
        useRoute().fullPath === to && 'bg-slate-800 font-bold'
      }`"
    :to="to"
  >
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
