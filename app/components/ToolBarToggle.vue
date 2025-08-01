<template>
  <button 
    class="size-10 rounded-full border bg-fog transition-all hover:bg-smoke dark:bg-charcoal dark:text-white dark:hover:bg-granite"
    @click="() => $emit('btn-clicked')"
  >
    <Icon name="majesticons:chevron-double-left-line"/>
  </button>
</template>

<script lang="ts" setup>
defineEmits(['btn-clicked']);
</script>

<style>

</style>