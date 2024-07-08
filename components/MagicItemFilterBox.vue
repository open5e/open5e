<template>
  <!-- FILTER BOX -->
  <div
    class="filter-header-wrapper flex flex-wrap bg-gray-50 px-2 dark:bg-slate-900 dark:text-white"
  >
    <div class="bg-blue flex w-full flex-wrap align-middle">
      <label for="itemName" class="pt-1 font-bold md:w-1/6">ITEM NAME:</label>
      <input
        id="itemName"
        v-model="filter.name"
        name="itemName"
        class="mt-2 w-1/2 rounded-md px-2 ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white md:w-5/6"
      />
      <div class="flex w-full flex-wrap">
        <div class="mt-2 flex w-full flex-wrap md:w-1/2">
          <span class="mr-2 w-full font-bold">RARITY:</span>
          <select
            id="rarity"
            v-model="filter.rarity"
            name="rarity"
            class="flex w-full rounded-md ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white"
          >
            <option :key="undefined" :value="undefined" text="Any" />
            <option
              v-for="rtg in MAGIC_ITEMS_RARITES"
              :key="rtg"
              class=""
              v-text="rtg"
            />
          </select>
        </div>
        <div class="mt-2 flex w-full flex-wrap md:w-1/2">
          <span class="mr-2 w-full font-bold md:ml-2">TYPE:</span>
          <select
            id="type"
            v-model="filter.type"
            name="type"
            class="flex w-full rounded-md ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white md:ml-2"
          >
            <option :key="undefined" :value="undefined" text="Any" />
            <option
              v-for="rtg in MAGIC_ITEMS_TYPES"
              :key="rtg"
              class=""
              v-text="rtg"
            />
          </select>
        </div>
        <div class="mt-4 flex w-full md:w-1/2">
          <span class="mr-2 font-bold">REQUIRES ATTUNEMENT:</span>
          <input
            id="attunement"
            v-model="filter.isAttunementRequired"
            type="checkbox"
            name="attunement"
            class="mb-1 accent-blood"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- END FILTER BOX -->
</template>

<script setup>
const filter = defineModel({ default: DefaultMagicItemFilter });
</script>
