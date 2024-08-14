<template>
  <div class="flex w-full justify-end md:w-1/2">
    <button
      :disabled="isFirstPage"
      :class="
        isFirstPage
          ? 'mt-1 rounded-md border-2 bg-slate-800 p-1 pl-2 text-fog'
          : 'mt-1 rounded-md border-2 bg-blood p-1 pl-2 text-fog hover:border-blood hover:bg-fog hover:text-blood'
      "
      @click="firstPage()"
    >
      <Icon name="heroicons:chevron-double-left" class="mr-1" />
    </button>
    <button
      :disabled="isFirstPage"
      :class="
        isFirstPage
          ? 'mt-1 rounded-md border-2 bg-slate-800 p-1 pl-2 text-fog'
          : 'mt-1 rounded-md border-2 bg-blood p-1 pl-2 text-fog hover:border-blood hover:bg-fog hover:text-blood'
      "
      @click="prevPage()"
    >
      <Icon name="heroicons:chevron-left" class="mr-1" />
    </button>
    <button
      :disabled="isLastPage"
      :class="
        isLastPage
          ? 'mt-1 rounded-md border-2 bg-slate-800 p-1 pl-2 text-fog'
          : 'mt-1 rounded-md border-2 bg-blood p-1 pl-2 text-fog hover:border-blood hover:bg-fog hover:text-blood'
      "
      @click="nextPage()"
    >
      <Icon name="heroicons:chevron-right" class="mr-1" />
    </button>
    <button
      :disabled="isLastPage"
      :class="
        isLastPage
          ? 'mt-1 rounded-md border-2 bg-slate-800 p-1 pl-2 text-fog'
          : 'mt-1 rounded-md border-2 bg-blood p-1 pl-2 text-fog hover:border-blood hover:bg-fog hover:text-blood'
      "
      @click="lastPage()"
    >
      <Icon name="heroicons:chevron-double-right" class="mr-1" />
    </button>
  </div>
</template>
<script setup>
const props = defineProps({
  lastPageNumber: { type: Number, default: 1 },
  pageNumber: { type: Number, default: 1 },
});
const emit = defineEmits(['first', 'last', 'next', 'prev']);

const isFirstPage = computed(() => props.pageNumber <= 1);
const isLastPage = computed(() => props.pageNumber >= props.lastPageNumber);

function firstPage() {
  emit('first');
}
function lastPage() {
  emit('last');
}
function nextPage() {
  emit('next');
}
function prevPage() {
  emit('prev');
}
</script>
