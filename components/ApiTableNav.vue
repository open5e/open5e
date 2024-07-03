<template>
  <div class="flex w-full justify-end md:w-1/2">
    <button
      class="mt-1 rounded-md border-2 bg-blood p-1 pl-2 text-fog hover:border-blood hover:bg-fog hover:text-blood"
      @click="firstPage()"
    >
      <Icon name="heroicons:chevron-double-left" class="mr-1" />
    </button>
    <button
      class="mt-1 rounded-md border-2 bg-blood p-1 pl-2 text-fog hover:border-blood hover:bg-fog hover:text-blood"
      @click="prevPage()"
    >
      <Icon name="heroicons:chevron-left" class="mr-1" />
    </button>
    <button
      class="mt-1 rounded-md border-2 bg-blood p-1 pl-2 text-fog hover:border-blood hover:bg-fog hover:text-blood"
      @click="nextPage()"
    >
      <Icon name="heroicons:chevron-right" class="mr-1" />
    </button>
    <button
      class="mt-1 rounded-md border-2 bg-blood p-1 pl-2 text-fog hover:border-blood hover:bg-fog hover:text-blood"
      @click="lastPage()"
    >
      <Icon name="heroicons:chevron-double-right" class="mr-1" />
    </button>
  </div>
</template>
<script setup>
defineProps({
  listLength: { type: Number, default: 0 },
  listWording: { type: String, default: '' },
  pageCount: { type: Number, default: 0 },
  pageNumber: { type: Number, default: 0 },
});
const emit = defineEmits(['first', 'last', 'next', 'prev']);

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
  console.log('prevPage');
  emit('prev');
}
</script>
