<template>
  <section class="docs-container container">
    <div class="flex w-full">
      <h1 class="my-2 text-nowrap">
        Monsters
      </h1>

      <ResultsTablePaginator
        :page-number="paginator.pageNo || 1"
        :last-page-number="paginator.lastPageNo || 1"
        :items-per-page="paginator.itemsPerPage || 1"
        :total-items="data?.count || 1"
        @first="paginator.firstPage()"
        @next="paginator.nextPage()"
        @prev="paginator.prevPage()"
        @last="paginator.lastPage()"
      />
    </div>

    <ResultsTableFilter
      :filter-state="filterState"
      :search="{
        name: 'Search Monsters',
        filterField: 'name__icontains',
      }"
      :select-fields="filterSelectFieldsDefinition"
    />

    <ResultsTable
      :data="data?.results"
      :cols="[
        {
          displayName: 'Name',
          value: (data) => data.name,
          sortValue: 'name',
          link: (data) => `/monsters/${data.key}`,
        },
        {
          displayName: 'CR',
          value: (data) => parseChallengeRating(data.challenge_rating_decimal),
          sortValue: 'challenge_rating_decimal',
        },
        {
          displayName: 'Type',
          value: (data) => data.type?.name,
          sortValue: 'type',
        },
        {
          displayName: 'Size',
          value: (data) => data.size.name,
          sortValue: 'size',
          isLeastPriority: true,
        },
        {
          displayName: '',
          value: () => '',
          customTemplate: (data) => ({
            render: () => {
              const monsterInEncounter = encounterStore.monsters.value.find(
                (m) => m.key === data.key,
              );
              return h(
                'div',
                { class: 'flex gap-2 justify-end hidden lg:flex' },
                [
                  monsterInEncounter
                    && h(
                      'button',
                      {
                        class:
                          'p-1 text-sm font-medium text-white bg-red rounded hover:bg-blood/80',
                        onClick: () => removeFromEncounter(data),
                      },
                      h(MinusIcon, { class: 'w-4 h-4' }),
                    ),
                  h(
                    'button',
                    {
                      'class':
                        'p-1 text-sm font-medium text-white bg-red rounded hover:bg-blood/80',
                      'onClick': () => addToEncounter(data),
                      'data-testid': 'add-to-encounter',
                    },
                    h(PlusIcon, { class: 'w-4 h-4' }),
                  ),
                ],
              );
            },
          }),
        },
      ]"
      :sort-by="sortBy"
      :is-sort-descending="isSortDescending"
      @sort="(sortValue) => setSortState(sortValue)"
    />
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/solid';
import type { Monster } from '@/types';
import { parseChallengeRating } from '@/helpers';

const filterSelectFieldsDefinition = [
  {
    name: 'Type',
    filterField: 'type',
    options: MONSTER_TYPES_LIST.map((monsterType) => ({
      name: monsterType,
      value: monsterType.toLowerCase(),
    })),
  },
  {
    name: 'Size',
    filterField: 'size',
    options: MONSTER_SIZES_LIST.map((monsterSize) => ({
      name: monsterSize,
      value: monsterSize.toLowerCase(),
    })),
    isLeastPriority: true,
  },
  {
    name: 'CR (min)',
    filterField: 'challenge_rating_decimal__gte',
    options: MONSTER_CHALLENGE_RATINGS_MAP.map(([name, value]) => ({
      name: name,
      value: value.toString(),
    })),
  },
  {
    name: 'CR (max)',
    filterField: 'challenge_rating_decimal__lte',
    options: MONSTER_CHALLENGE_RATINGS_MAP.map(([name, value]) => ({
      name: name,
      value: value.toString(),
    })),
  },
];

// Set up filters
const filterState = useFilterState<MonsterFilter>({
  key: 'monsters',
  fields: DefaultMonsterFilter,
});

// State handlers for sorting results table
const { sortBy, isSortDescending, setSortState } = useSortState();

// fields to fetch from API to populate table
const fields = [
  'key',
  'name',
  'document',
  'challenge_rating_decimal',
  'document',
  'type',
  'size',
].join(',');

// fetch page of data from API and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.monsters,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  filter: filterState.debouncedFilter,
  params: {
    fields,
    document__fields: 'name,key',
    type__fields: 'name',
    size__fields: 'name',
  },
});

const encounterStore = useEncounterStore();

const addToEncounter = (monster: Monster) => {
  encounterStore.addMonster(
    monster.key,
    monster.name,
    parseFloat(monster.challenge_rating_decimal),
    monster.challenge_rating_text,
  );
};

const removeFromEncounter = (monster: Monster) => {
  encounterStore.removeMonster(monster.key);
};

const debouncedFilter = computed(() => filterState.debouncedFilter);

// Expose values to template
defineExpose({
  filterState,
  debouncedFilter,
  MONSTER_CHALLENGE_RATINGS_MAP,
});


</script>
