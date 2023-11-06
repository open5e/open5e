<template>
  <div class="flex w-full flex-wrap align-middle">
    <div class="mt-2 flex w-full flex-wrap text-blood md:w-1/2">
      <div class="flex w-full justify-center italic md:justify-start">
        Total of {{ listLength }} {{ listWording }}
      </div>
      <div
        class="flex w-full justify-center italic md:justify-start"
        v-if="showItemsPerPage"
      >
        <span class="pr-2">Items Per Page:</span>
        <select
          id="spellsPerPage"
          v-model="spellsPerPage"
          name="spellsPerPage"
          class="w-1/2 rounded-md ring-1 ring-blood focus:ring-2 focus:ring-blood"
          @change="setPerPage()"
        >
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="250">250</option>
        </select>
      </div>
    </div>
    <div class="flex w-full justify-center md:w-1/2 md:justify-end">
      <button
        @click="firstPage()"
        :disabled="pageNumber == 0"
        class="mt-1 rounded-md border-2 bg-fog p-1 pl-2 text-blood hover:border-blood hover:bg-blood hover:text-fog"
      >
        <Icon name="heroicons:chevron-double-left" class="mr-1"></Icon>
      </button>
      <button
        @click="prevPage()"
        :disabled="pageNumber == 0"
        class="mt-1 rounded-md border-2 bg-fog p-1 px-2 text-blood hover:border-blood hover:bg-blood hover:text-fog"
      >
        <Icon name="heroicons:chevron-left" class="mr-1"></Icon> Prev
      </button>
      <button
        disabled
        class="mt-1 rounded-md border-2 bg-fog p-1 px-2 text-blood"
      >
        Page {{ pageNumber + 1 }}
      </button>
      <button
        @click="nextPage()"
        :disabled="pageNumber == pageCount - 1"
        class="mt-1 rounded-md border-2 bg-fog p-1 px-2 text-blood hover:border-blood hover:bg-blood hover:text-fog"
      >
        Next <Icon name="heroicons:chevron-right" class="mr-1"></Icon>
      </button>
      <button
        @click="lastPage()"
        :disabled="pageNumber == pageCount - 1"
        class="mt-1 rounded-md border-2 bg-fog p-1 pl-2 text-blood hover:border-blood hover:bg-blood hover:text-fog"
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
    showItemsPerPage: Boolean,
  },
  data() {
    return {
      spellsPerPage: 50,
    };
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
    setPerPage() {
      this.$emit('changePerPage', this.spellsPerPage);
    },
  },
};
</script>
