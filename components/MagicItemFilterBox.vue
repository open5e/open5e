<template>
  <!-- FILTER BOX -->
  <div class="filter-header-wrapper flex flex-wrap bg-smoke px-2">
    <div class="bg-blue flex w-full flex-wrap align-middle">
      <label for="hpLow" class="w-full pt-1 font-bold md:w-1/6"
        >ITEM NAME:</label
      >
      <input
        id="itemName"
        v-model="filters.name"
        name="itemName"
        class="mt-2 w-full rounded-md px-2 ring-1 ring-blood focus:ring-2 focus:ring-blood md:w-5/6"
      />
      <div class="flex w-full flex-wrap">
        <div class="mt-2 flex w-full flex-wrap md:w-1/2">
          <span class="mr-2 w-full font-bold">RARITY:</span>
          <select
            id="rarity"
            v-model="filters.rarity"
            name="rarity"
            class="flex w-full rounded-md ring-1 ring-blood focus:ring-2 focus:ring-blood"
          >
            <option :key="null" :value="null" text="Any"></option>
            <option
              v-for="rtg in MAGIC_ITEMS_RARITES"
              :key="rtg"
              class=""
              v-text="rtg"
            ></option>
          </select>
        </div>
        <div class="mt-2 flex w-full flex-wrap md:w-1/2">
          <span class="mr-2 w-full font-bold md:ml-2">TYPE:</span>
          <select
            id="type"
            v-model="filters.type"
            name="type"
            class="flex w-full rounded-md ring-1 ring-blood focus:ring-2 focus:ring-blood md:ml-2"
          >
            <option :key="null" :value="null" text="Any"></option>
            <option
              v-for="rtg in MAGIC_ITEMS_TYPES"
              :key="rtg"
              class=""
              v-text="rtg"
            ></option>
          </select>
        </div>
        <div class="mt-4 flex w-full md:w-1/2">
          <span class="mr-2 font-bold">REQUIRES ATTUNEMENT:</span>
          <input
            id="attunement"
            v-model="filters.isAttunementRequired"
            type="checkbox"
            name="attunement"
            class="mb-1 accent-blood"
          />
        </div>
        <div class="mt-4 flex w-full justify-end md:w-1/2">
          <button
            class="rounded-md bg-fog p-1 text-blood outline outline-1 outline-blood hover:bg-blood hover:text-fog"
            @click="clearFilters()"
          >
            <Icon name="heroicons:x-mark" class="mb-1 mr-1" />
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- END FILTER BOX -->
</template>
<script setup>
const filters = defineModel({
  name: null,
  rarity: null,
  type: null,
  isAttunementRequired: null,
});

function clearFilters() {
  filters.value.name = null;
  filters.value.rarity = null;
  filters.value.type = null;
  filters.value.isAttunementRequired = null;
}
</script>
