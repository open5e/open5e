<script>
/**
 * NavLink.vue - Custom link designed to be used with the <NavBar>. Handles
 * styles, current route highlighting, and optional indentation.
 *
 * -= PROPS (INPUTS) =-
 * @prop {String} to - URL tag of the link
 * @prop {String} title - Link title (currently not used in the template)
 * @prop {Boolean} indent - A flag to apply additional indentation
 *
 * -= SLOTS =-
 * @slot default - The content to be as the Link's body
 *
 */
</script>

<template>
  <nuxt-link
    :class="`bold block w-full px-4  text-white hover:bg-slate-800/40 hover:underline
      dark:hover:bg-slate-600/40 ${
        useRoute().fullPath.includes(to) && 'bg-slate-800 font-bold'
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
