<template>
  <div class="grid items-center justify-end gap-2">
    <div class="grid grid-flow-col grid-cols-5 gap-1">
      <div class="col-start-3 place-self-center font-bold">
        {{ pageNumber }}
      </div>
      <div v-for="button in buttons" :key="button.name">
        <ApiTableButton
          :name="button.name"
          :icon="button.icon"
          :disabled="!button.isActive.value"
          class="mt-1 border-2"
          @click="button.onClick()"
        />
      </div>
    </div>

    <div class="text-center font-bold">
      {{ (pageNumber - 1) * itemsPerPage + 1 }} to
      {{
        lastPageNumber === pageNumber ? totalItems : pageNumber * itemsPerPage
      }}
      of {{ totalItems }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  lastPageNumber: { type: Number, default: 1 },
  pageNumber: { type: Number, default: 1 },
  itemsPerPage: { type: Number, default: 1 },
  totalItems: { type: Number, default: 1 },
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
    class: 'col-start-1',
  },
  {
    name: 'Previous page',
    isActive: isNotFirstPage,
    onClick: () => emit('prev'),
    icon: 'heroicons:chevron-left',
    class: 'col-start-2',
  },
  {
    name: 'Next page',
    isActive: isNotLastPage,
    onClick: () => emit('next'),
    icon: 'heroicons:chevron-right',
    class: 'col-start-4',
  },
  {
    name: 'Last page',
    isActive: isNotLastPage,
    onClick: () => emit('last'),
    icon: 'heroicons:chevron-double-right',
    class: 'col-start-5',
  },
];
</script>
