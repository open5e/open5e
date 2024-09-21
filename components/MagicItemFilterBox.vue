<template>
  <!-- FILTER BOX -->
  <div
    class="filter-header-wrapper flex flex-wrap bg-gray-50 px-2 dark:bg-slate-900 dark:text-white"
  >
    <div class="bg-blue flex w-full flex-wrap align-middle">
      <!-- FILTER BY ITEM NAME -->
      <label for="itemName" class="pt-1 font-bold md:w-1/6">ITEM NAME:</label>
      <input
        id="itemName"
        :value="filter.name__icontains"
        name="itemName"
        placeholder="Any"
        class="mt-2 w-1/2 rounded-md px-2 ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white md:w-5/6"
        @input="updateFilter('name__icontains', $event.target.value)"
      />

      <!-- FILTER BY MAGIC ITEM RARITY -->
      <div class="flex w-full flex-wrap">
        <div class="mt-2 flex w-full flex-wrap md:w-1/2">
          <label class="mr-2 w-full font-bold" for="rarity">RARITY:</label>
          <select
            id="rarity"
            :value="filter.rarity"
            name="rarity"
            class="flex w-full rounded-md ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white"
            @input="updateFilter('rarity', $event.target.value)"
          >
            <option :key="''" :value="''" text="Any" />
            <option
              v-for="rarity in MAGIC_ITEMS_RARITES"
              :key="rarity"
              :value="rarity.toLowerCase().split(' ').join('-')"
              v-text="rarity"
            />
          </select>
        </div>

        <!-- FILTER BY MAGIC ITEM TYPE -->
        <div class="mt-2 flex w-full flex-wrap md:w-1/2">
          <label class="mr-2 w-full font-bold md:ml-2" for="type">TYPE:</label>
          <select
            id="type"
            :value="filter.category"
            name="category"
            class="flex w-full rounded-md ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white md:ml-2"
            @input="updateFilter('category', $event.target.value)"
          >
            <option :key="''" :value="''" text="Any" />
            <option
              v-for="category in MAGIC_ITEMS_TYPES"
              :key="category"
              :value="category.toLowerCase().split(' ').join('-')"
              v-text="category"
            />
          </select>
        </div>

        <!-- FILTER BY ATTUNEMENT REQUIREMENT -->
        <div class="mt-4 flex w-full md:w-1/2">
          <label class="mr-2 font-bold after:content-[':_']" for="attunement">
            REQUIRES ATTUNEMENT
          </label>
          <input
            id="attunement"
            :value="filter.requires_attunement"
            type="checkbox"
            name="requires_attunement"
            class="mb-1 accent-blood"
            @input="
              updateFilter(
                'requires_attunement',
                $event.target.value === 'on' ? true : undefined
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  filter: { type: Object, default: copyMagicItemFilter() },
  updateFilter: { type: Function, required: true },
});
</script>
