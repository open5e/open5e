<template>
  <!-- FILTER BOX -->
  <div
    class="filter-header-wrapper flex flex-wrap bg-gray-50 px-2 dark:bg-slate-900 dark:text-white"
  >
    <div class="bg-blue flex w-full flex-wrap align-middle">
      <!-- Filter by Monster Name -->
      <label for="monsterName" class="pt-1 font-bold md:w-1/6">
        MONSTER NAME:
      </label>
      <input
        id="monsterName"
        :value="filter.name__icontains"
        placeholder="Any"
        name="monsterName"
        class="mt-2 w-1/2 rounded-md px-2 ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white md:w-5/6"
        @input="updateFilter('name__icontains', $event.target.value)"
      />

      <!-- Filter by CR (lower bound) -->
      <span class="flex w-full font-bold">CHALLENGE RATING</span>
      <div class="flex w-full px-1 md:w-1/2">
        <label for="challengeRtgLow" class="w-1/2">From:</label>
        <select
          id="challengeRtgLow"
          :value="filter.challenge_rating_decimal__gte"
          name="challengeRtgLow"
          class="w-1/2 rounded-md ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white"
          @input="
            updateFilter('challenge_rating_decimal__gte', $event.target.value)
          "
        >
          <option :key="''" :value="''" text="Any" />
          <option
            v-for="[label, value] in MONSTER_CHALLENGE_RATINGS_MAP"
            :key="value"
            :value="value"
            v-text="label"
          />
        </select>
      </div>

      <!-- Filter by CR (upper bound) -->
      <div class="flex w-full px-1 md:w-1/2">
        <label for="challengeRtgHigh" class="w-1/2">To:</label>
        <select
          id="challengeRtgHigh"
          :value="filter.challenge_rating_decimal__lte"
          name="challengeRtgHigh"
          class="w-1/2 rounded-md ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white"
          @input="
            updateFilter('challenge_rating_decimal__lte', $event.target.value)
          "
        >
          <option :key="''" :value="''" text="Any" />
          <option
            v-for="[label, value] in MONSTER_CHALLENGE_RATINGS_MAP"
            :key="value"
            :value="value"
            v-text="label"
          />
        </select>
      </div>
    </div>

    <!-- Filter by Size -->
    <div class="flex w-full flex-wrap pr-1 pt-4 md:w-1/2">
      <label for="size" class="w-1/2 font-bold">SIZE:</label>
      <select
        id="size"
        :value="filter.size"
        name="size"
        class="w-1/2 rounded-md ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white"
        @input="updateFilter('size', $event.target.value)"
      >
        <option :key="''" :value="''" text="Any" />
        <option
          v-for="size in MONSTER_SIZES_LIST"
          :key="size"
          :value="size.toLowerCase()"
          v-text="size"
        />
      </select>
    </div>

    <!-- Filter by Monster Type -->
    <div class="flex w-full flex-wrap pt-4 md:w-1/2">
      <div class="flex w-full px-1">
        <label for="type" class="w-full font-bold">TYPE:</label>
        <select
          id="type"
          :value="filter.type"
          name="type"
          class="w-full rounded-md ring-1 ring-gray-500 focus:ring-2 focus:ring-blood dark:bg-slate-700 dark:text-white"
          @input="updateFilter('type', $event.target.value)"
        >
          <option :key="''" :value="''" text="Any" />
          <option
            v-for="monsterType in MONSTER_TYPES_LIST"
            :key="monsterType"
            :value="monsterType.toLowerCase()"
            :text="monsterType"
          />
        </select>
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
