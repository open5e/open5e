<template>
  <div class="grid w-full justify-end">
    <ul class="flex">
      <li v-for="button in buttons" :key="button.name">
        <button
          class="mt-1 rounded-md border-2 px-2 py-1 text-fog"
          :disabled="!button.isActive.value"
          :class="
            button.isActive.value
              ? 'bg-blood hover:bg-fog hover:text-blood'
              : 'bg-slate-800'
          "
          :aria-roledescription="button.name"
          @click="button.onClick()"
        >
          <span class="sr-only">{{ button.name }}</span>
          <icon :name="button.icon" />
        </button>
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
    name: 'To first page',
    isActive: isNotFirstPage,
    onClick: () => emit('first'),
    icon: 'heroicons:chevron-double-left',
  },
  {
    name: 'Previous Page',
    isActive: isNotFirstPage,
    onClick: () => emit('prev'),
    icon: 'heroicons:chevron-left',
  },
  {
    name: 'Next Page',
    isActive: isNotLastPage,
    onClick: () => emit('next'),
    icon: 'heroicons:chevron-right',
  },
  {
    name: 'To Last page',
    isActive: isNotLastPage,
    onClick: () => emit('last'),
    icon: 'heroicons:chevron-double-right',
  },
];
</script>
