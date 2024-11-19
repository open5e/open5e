<template>
  <span
    class="cursor-pointer font-bold text-blood hover:text-black dark:hover:text-fog"
    @click="useDiceRoller(signature)"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{ type: string }>()
</script>
