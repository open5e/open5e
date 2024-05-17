<template>
  <div>
    <button
      class="rounded-md p-1 text-blood outline outline-1 outline-blood hover:bg-blood hover:text-fog"
      @click="showFilters()"
    >
      <Icon name="heroicons:funnel" class="mr-1" />
      Show Filters
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['showFilters']);
function showFilters() {
  emit('showFilters');
}
</script>
