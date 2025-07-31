<template>
  <button 
    class="size-10 rounded-full bg-red text-white"
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