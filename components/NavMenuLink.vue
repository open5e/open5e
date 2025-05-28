<script>
/**
 * NavMenuLink.vue - Custom link designed to be used with the <NavMenu>. Handles
 * styles, current route highlighting, and optional indentation.
 *
 * -= PROPS (INPUTS) =-
 * @prop {String} to - URL tag of the link
 * @prop {String} title - Link title (currently not used in the template)
 * @prop {Number} indentationLevel - How deeply should the NavMenuLink be indented
 *
 * -= SLOTS =-
 * @slot default - The content to be as the Link's body
 *
 */
</script>

<template>
  <nuxt-link
    class="bold block w-full px-4 hover:bg-slate-800/40 hover:underline dark:hover:bg-slate-600/40"
    :class="
      [
        useRoute().fullPath.includes(to) && 'bg-slate-800 font-bold',
        indentationLevel === 0 && 'py-3',
        indentationLevel === 1 && 'py-1 pl-6',
        indentationLevel === 2 && 'py-1 pl-10 text-sm',
      ].join(' ')
    "
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
  indentationLevel: {
    type: Number,
    default: 0,
  },
});
</script>
