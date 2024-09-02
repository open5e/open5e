<template>
  <!-- FILTER BOX -->
  <div
    class="filter-header-wrapper flex flex-wrap bg-gray-50 px-2 dark:bg-slate-900 dark:text-white"
  >
    <div class="bg-blue flex w-full flex-wrap align-middle">
      <!-- FILTER BY ITEM NAME -->
      <!-- TODO: filtering by name unsupported by API (2 Sep. 24) -->
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
      <!-- TODO: filtering by rarity unsupported by API (2 Sep. 24) -->
      <div class="flex w-full flex-wrap">
        <div class="mt-2 flex w-full flex-wrap md:w-1/2">
          <span class="mr-2 w-full font-bold">RARITY:</span>
          <select
            id="rarity"
            :value="filter.rarity"
            name="rarity"
            class="flex w-full rounded-md ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white"
            @input="updateFilter('rarity', $event.target.value)"
          >
            <option :key="''" :value="''" text="Any" />
            <option
              v-for="rtg in MAGIC_ITEMS_RARITES"
              :key="rtg"
              :value="rtg"
              v-text="rtg"
            />
          </select>
        </div>

        <!-- FILTER BY MAGIC ITEM TYPE -->
        <!-- TODO: filtering by type unsupported by API (2 Sep. 24) -->
        <div class="mt-2 flex w-full flex-wrap md:w-1/2">
          <span class="mr-2 w-full font-bold md:ml-2">TYPE:</span>
          <select
            id="type"
            :value="filter.type"
            name="type"
            class="flex w-full rounded-md ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white md:ml-2"
            @input="updateFilter('type', $event.target.value)"
          >
            <option :key="''" :value="''" text="Any" />
            <option
              v-for="rtg in MAGIC_ITEMS_TYPES"
              :key="rtg"
              class=""
              v-text="rtg"
            />
          </select>
        </div>

        <!-- FILTER BY ATTUNEMENT REQUIREMENT -->
        <div class="mt-4 flex w-full md:w-1/2">
          <span class="mr-2 font-bold">REQUIRES ATTUNEMENT:</span>
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
  <!-- END FILTER BOX -->
</template>

<script setup>
const props = defineProps({
  filter: { type: Object, default: copyDefaultMonsterFilter() },
  updateFilter: { type: Function, required: true },
});
</script>
