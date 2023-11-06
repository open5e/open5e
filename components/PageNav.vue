<template>
  <div class="flex w-full flex-wrap align-middle">
    <div class="flex w-full justify-start italic text-blood md:w-1/2">
      Total of {{ listLength }} {{ listWording }}
    </div>
    <div class="flex w-full justify-end md:w-1/2">
      <button
        @click="firstPage()"
        :disabled="pageNumber == 0"
        class="mt-1 rounded-md border-2 bg-blood p-1 pl-2 text-fog hover:border-blood hover:bg-fog hover:text-blood"
      >
        <Icon name="heroicons:chevron-double-left" class="mr-1"></Icon>
      </button>
      <button
        @click="prevPage()"
        :disabled="pageNumber == 0"
        class="mt-1 rounded-md border-2 bg-blood p-1 pl-2 text-fog hover:border-blood hover:bg-fog hover:text-blood"
      >
        <Icon name="heroicons:chevron-left" class="mr-1"></Icon>
      </button>
      <button
        @click="nextPage()"
        :disabled="pageNumber == pageCount - 1"
        class="mt-1 rounded-md border-2 bg-blood p-1 pl-2 text-fog hover:border-blood hover:bg-fog hover:text-blood"
      >
        <Icon name="heroicons:chevron-right" class="mr-1"></Icon>
      </button>
      <button
        @click="lastPage()"
        :disabled="pageNumber == pageCount - 1"
        class="mt-1 rounded-md border-2 bg-blood p-1 pl-2 text-fog hover:border-blood hover:bg-fog hover:text-blood"
      >
        <Icon name="heroicons:chevron-double-right" class="mr-1"></Icon>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    listLength: Number,
    listWording: String,
    pageCount: Number,
    pageNumber: Number,
  },
  methods: {
    firstPage() {
      this.$emit('first');
    },
    lastPage() {
      this.$emit('last');
    },
    nextPage() {
      this.$emit('next');
    },
    prevPage() {
      this.$emit('prev');
    },
  },
};
</script>
