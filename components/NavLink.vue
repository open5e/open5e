<template>
  <nuxt-link
    :class="`bold block w-full px-4  text-white hover:bg-slate-800/40 hover:underline
      dark:hover:bg-slate-600/40 ${
        useRoute().fullPath === to && 'bg-slate-800 font-bold'
      } ${indent && 'py-1 pl-8'} ${!indent && 'py-3'}
      `"
    :to="to"
  >
    <slot />
  </nuxt-link>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  indent: {
    type: Boolean,
    default: false,
  },
});
</script>
