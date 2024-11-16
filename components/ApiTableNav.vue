<template>
  <div class="grid justify-end">
    <ul class="flex">
      <li v-for="button in buttons" :key="button.name">
        <ApiTableButton
          :name="button.name"
          :icon="button.icon"
          :disabled="!button.isActive.value"
          class="mt-1 border-2"
          @click="button.onClick()"
        />
      </li>
    </ul>
    <label class="block text-center font-bold">
      {{ `${pageNumber} of ${lastPageNumber}` }}
    </label>
  </div>
</template>
<script setup>
const props = defineProps({
  lastPageNumber: { type: Number, default: 1 },
  pageNumber: { type: Number, default: 1 },
});
const emit = defineEmits(['first', 'last', 'next', 'prev']);

// conditional properties control whenever certain buttons are enabled
const isNotFirstPage = computed(() => props.pageNumber > 1);
const isNotLastPage = computed(() => props.pageNumber < props.lastPageNumber);

const buttons = [
  {
    name: 'First page',
    isActive: isNotFirstPage,
    onClick: () => emit('first'),
    icon: 'heroicons:chevron-double-left',
  },
  {
    name: 'Previous page',
    isActive: isNotFirstPage,
    onClick: () => emit('prev'),
    icon: 'heroicons:chevron-left',
  },
  {
    name: 'Next page',
    isActive: isNotLastPage,
    onClick: () => emit('next'),
    icon: 'heroicons:chevron-right',
  },
  {
    name: 'Last page',
    isActive: isNotLastPage,
    onClick: () => emit('last'),
    icon: 'heroicons:chevron-double-right',
  },
];
</script>
