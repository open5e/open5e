<template>
  <!-- FILTER BOX -->
  <div class="filter-header-wrapper flex flex-wrap bg-smoke px-2">
    <div class="bg-blue flex w-full flex-wrap align-middle">
      <label for="monsterName" class="pt-1 font-bold md:w-1/6"
        >MONSTER NAME:</label
      >
      <input
        id="monsterName"
        v-model="filters.name"
        name="monsterName"
        class="mt-2 w-1/2 rounded-md px-2 ring-1 ring-blood focus:ring-2 focus:ring-blood md:w-5/6"
      />
      <span class="flex w-full font-bold">CHALLENGE RATING</span>
      <div class="flex w-full px-1 md:w-1/2">
        <label for="challengeRtgLow" class="w-1/2">From:</label>
        <select
          id="challengeRtgLow"
          v-model="filters.challengeLow"
          name="challengeRtgLow"
          class="w-1/2 rounded-md ring-1 ring-blood focus:ring-2 focus:ring-blood"
        >
          <option :key="null" :value="null" text="Any"></option>
          <option
            v-for="[label, value] in MONSTER_CHALLENGE_RATINGS_MAP"
            :key="value"
            :value="value"
            v-text="label"
          ></option>
        </select>
      </div>
      <div class="flex w-full px-1 md:w-1/2">
        <label for="challengeRtgHigh" class="w-1/2">To:</label>
        <select
          id="challengeRtgHigh"
          v-model="filters.challengeHigh"
          name="challengeRtgHigh"
          class="w-1/2 rounded-md ring-1 ring-blood focus:ring-2 focus:ring-blood"
        >
          <option :key="null" :value="null" text="Any"></option>
          <option
            v-for="[label, value] in MONSTER_CHALLENGE_RATINGS_MAP"
            :key="value"
            :value="value"
            v-text="label"
          ></option>
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
          type="number"
          min="0"
          max="9999"
          step="1"
          name="hpLow"
          class="w-1/2 rounded-md px-2 ring-1 ring-blood focus:ring-2 focus:ring-blood"
        />
      </div>
      <div class="flex w-full px-1 md:w-1/2">
        <label for="hpHigh" class="w-1/2">To (high):</label>
        <input
          id="hpHigh"
          v-model="filters.hpHigh"
          type="number"
          min="0"
          max="9999"
          step="1"
          name="hpHigh"
          class="w-1/2 rounded-md px-2 ring-1 ring-blood focus:ring-2 focus:ring-blood"
        />
      </div>
    </div>
    <div class="flex w-full flex-wrap pr-1 pt-4 md:w-1/2">
      <label for="size" class="w-1/2 font-bold">SIZE:</label>
      <select
        id="size"
        v-model="filters.size"
        name="size"
        class="w-1/2 rounded-md ring-1 ring-blood focus:ring-2 focus:ring-blood"
      >
        <option :key="null" :value="null" text="Any"></option>
        <option
          v-for="size in MONSTER_SIZES_LIST"
          :key="size"
          v-text="size"
        ></option>
      </select>
    </div>
    <div class="flex w-full flex-wrap pt-4 md:w-1/2">
      <div class="flex w-full px-1">
        <label for="type" class="w-full font-bold">TYPE:</label>
        <select
          id="type"
          v-model="filters.type"
          name="type"
          class="w-full rounded-md ring-1 ring-blood focus:ring-2 focus:ring-blood"
        >
          <option :key="null" :value="null" text="Any"></option>
          <option
            v-for="monsterType in MONSTER_TYPES_LIST"
            :key="monsterType"
            v-text="monsterType"
          ></option>
        </select>
      </div>
    </div>
    <div class="flex w-full flex-wrap pt-4">
      <div class="flex w-full justify-end">
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
  <!-- END FILTER BOX -->
</template>
<script setup>
const filters = defineModel({
  name: null,
  challengeLow: null,
  challengeHigh: null,
  hpLow: null,
  hpHigh: null,
  size: null,
  type: null,
});

function clearFilters() {
  filters.value.name = null;
  filters.value.challengeLow = null;
  filters.value.challengeHigh = null;
  filters.value.hpLow = null;
  filters.value.hpHigh = null;
  filters.value.size = null;
  filters.value.type = null;
}
</script>
