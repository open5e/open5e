<script>
/**
 * InlineRoller - creates a clickable dice roller link. Essentially a UI
 * wrapper for the `useDiceRoller` composable. Global so that is can be
 * inserted into Markdown via the `MdViewer` component.
 *
 * -= PROPS (INPUTS) =-
 * @prop {String} signature - Dice signature (ie. 1d6+3) to pass to the
 *   `useDiceRoller` composable.
 *
 * -= DEPENDENCIES =-
 * @composable useDiceRoller – parses dice signatures and handles dice rolling
 *
 */
</script>

<template>
  <span
    class="cursor-pointer font-bold text-blood hover:text-black dark:hover:text-fog"
    @click="useDiceRoller(signature)"
  >
    <slot />
  </span>
</template>

<script setup>
defineProps({
  signature: { type: String, default: '' },
});
</script>
