<template>
  <div class="grid items-center justify-end gap-2">
    <ul class="grid grid-flow-col grid-cols-5 gap-1">
      <li class="col-start-3 place-self-center font-bold">
        {{ pageNumber }}
      </li>
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
