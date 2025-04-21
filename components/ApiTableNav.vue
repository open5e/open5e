<script>
/**
 * ApiTableNav.vue - Pagination controls, designed to be used with the
 * `<ApiResultsTable />` component
 *
 * -= PROPS (INPUTS) =-
 * @prop {Number} lastPageNumber - Last page number
 * @prop {Number} pageNumber - Current page number
 * @prop {Number} itemsPerPage - The number of items displayed per page
 * @prop {Number} totalItems - The total number of items across all pages
 *
 * -= EMITS (OUTPUTS) =-
 * @emits first - Emitted when "first page" button clicked
 * @emits last - Emitted when "last page" button clicked
 * @emits next - Emitted when "next page" button clicked
 * @emits prev - Emitted when "prev page" button clicked
 *
 * -= DEPENDENCIES =-
 * @component ApiTableButton – Renders pagination buttons with icons.
 */
</script>

<template>
  <div class="grid w-full items-center justify-end">
    <ul class="grid grid-flow-col grid-cols-5 gap-1">
      <li class="col-start-3 place-self-center font-bold">
        <sup>{{ pageNumber }}</sup>
        <span>&frasl;</span>
        <sub>{{ lastPageNumber }}</sub>
      </li>
      <li
        v-for="button in buttons"
        :key="button.name"
      >
        <ApiTableButton
          :name="button.name"
          :icon="button.icon"
          :disabled="!button.isActive.value"
          class="mt-1 border-2"
          @click="button.onClick()"
        />
      </li>
    </ul>

    <div class="grid grid-cols-[2fr,_1fr,_2fr] text-center text-xs">
      <span class="mr-2 text-center">
        {{ (pageNumber - 1) * itemsPerPage + 1 }}
        <span class="font-bold">–</span>
        {{
          lastPageNumber === pageNumber ? totalItems : pageNumber * itemsPerPage
        }}
      </span>
      <span class="mx-4 font-bold">&frasl;</span>
      <span class="text-center">{{ totalItems }}</span>
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
