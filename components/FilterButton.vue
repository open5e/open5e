<template>
  <div>
    <button
      v-if="showClearButton"
      class="mr-2 rounded-md p-1 text-blood outline outline-1 outline-blood hover:bg-blood hover:text-fog dark:text-red-400"
      @click="$emit('clearFilter')"
    >
      <Icon name="heroicons:x-mark" class="mb-1 mr-1" />
      Clear {{ filterCount }} Filters
    </button>
    <button
      class="rounded-md p-1 text-blood outline outline-1 outline-blood hover:bg-blood hover:text-fog dark:text-red-400"
      @click="showFilter()"
    >
      <Icon name="heroicons:funnel" class="mr-1" />
      {{ filterShown ? 'Hide' : 'Show' }} Filters
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  showClearButton: {
    type: Boolean,
    default: false,
  },
  filterCount: {
    type: Number,
    default: 0,
  },
  filterShown: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['showFilter', 'clearFilter']);

function showFilter() {
  emit('showFilter');
}
</script>
