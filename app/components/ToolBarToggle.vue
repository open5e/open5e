<template>
  <button 
    class="size-10 rounded-full border-2 bg-red text-white hover:bg-blood"
    @click="() => $emit('btn-clicked')"
  >
    <Icon name="majesticons:chevron-double-left-line"/>
  </button>
</template>

<script lang="ts" setup>
defineEmits(['btn-clicked']);
</script>