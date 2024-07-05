<template>
  <!-- FILTER BOX -->
  <div
    class="filter-header-wrapper flex flex-wrap bg-gray-50 px-2 dark:bg-slate-900 dark:text-white"
  >
    <div class="bg-blue flex w-full flex-wrap align-middle">
      <label for="monsterName" class="pt-1 font-bold md:w-1/6"
        >MONSTER NAME:</label
      >
      <input
        id="monsterName"
        v-model="filters.name"
        placeholder="Any"
        name="monsterName"
        class="mt-2 w-1/2 rounded-md px-2 ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white md:w-5/6"
      />
      <span class="flex w-full font-bold">CHALLENGE RATING</span>
      <div class="flex w-full px-1 md:w-1/2">
        <label for="challengeRtgLow" class="w-1/2">From:</label>
        <select
          id="challengeRtgLow"
          v-model="filters.cr__gte"
          name="challengeRtgLow"
          class="w-1/2 rounded-md ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white"
        >
          <option :key="undefined" :value="undefined" text="Any" />
          <option
            v-for="[label, value] in MONSTER_CHALLENGE_RATINGS_MAP"
            :key="value"
            :value="value"
            v-text="label"
          />
        </select>
      </div>
      <div class="flex w-full px-1 md:w-1/2">
        <label for="challengeRtgHigh" class="w-1/2">To:</label>
        <select
          id="challengeRtgHigh"
          v-model="filters.cr__lte"
          name="challengeRtgHigh"
          class="w-1/2 rounded-md ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white"
        >
          <option :key="undefined" :value="undefined" text="Any" />
          <option
            v-for="[label, value] in MONSTER_CHALLENGE_RATINGS_MAP"
            :key="value"
            :value="value"
            v-text="label"
          />
        </select>
      </div>
    </div>
    <div class="flex w-full flex-wrap">
      <span class="flex w-full font-bold">HIT POINTS</span>
      <div class="flex w-full px-1 md:w-1/2">
        <label for="hpLow" class="w-1/2">From (low):</label>
        <input
          id="hpLow"
          v-model="filters.hpLow"
          placeholder="Any"
          type="number"
          min="0"
          max="9999"
          step="1"
          name="hpLow"
          class="w-1/2 rounded-md px-2 ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white"
        />
      </div>
      <div class="flex w-full px-1 md:w-1/2">
        <label for="hpHigh" class="w-1/2">To (high):</label>
        <input
          id="hpHigh"
          v-model="filters.hpHigh"
          placeholder="Any"
          type="number"
          min="0"
          max="9999"
          step="1"
          name="hpHigh"
          class="w-1/2 rounded-md px-2 ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white"
        />
      </div>
    </div>
    <div class="flex w-full flex-wrap pr-1 pt-4 md:w-1/2">
      <label for="size" class="w-1/2 font-bold">SIZE:</label>
      <select
        id="size"
        v-model="filters.size"
        name="size"
        class="w-1/2 rounded-md ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white"
      >
        <option :key="undefined" :value="undefined" text="Any" />
        <option v-for="size in MONSTER_SIZES_LIST" :key="size" v-text="size" />
      </select>
    </div>
    <div class="flex w-full flex-wrap pt-4 md:w-1/2">
      <div class="flex w-full px-1">
        <label for="type" class="w-full font-bold">TYPE:</label>
        <select
          id="type"
          v-model="filters.type"
          name="type"
          class="w-full rounded-md ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white"
        >
          <option :key="undefined" :value="undefined" text="Any" />
          <option
            v-for="monsterType in MONSTER_TYPES_LIST"
            :key="monsterType"
            v-text="monsterType"
          />
        </select>
      </div>
    </div>
  </div>
  <!-- END FILTER BOX -->
</template>
<script setup>
const filters = defineModel({ default: () => copyDefaultMonsterFilter() });

function clearFilters() {
  filters.value = copyDefaultMonsterFilter();
}

defineExpose({ clearFilters });
</script>
