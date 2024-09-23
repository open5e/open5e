<template>
  <section class="docs-container container">
    <div class="flex">
      <h1 class="my-2">Spells</h1>
      <api-table-nav
        :page-number="pageNo"
        :last-page-number="lastPageNo"
        @first="firstPage()"
        @next="nextPage()"
        @prev="prevPage()"
        @last="lastPage()"
      />
    </div>

    <!-- SEARCH FILTERS -->
    <div class="my-2 flex flex-wrap items-end justify-between gap-4">
      <div class="relative">
        <icon
          name="majesticons:search-line"
          class="absolute bottom-1.5 mr-2 h-4 w-4"
        />
        <input
          id="spellName"
          default=""
          name="spellName"
          placeholder="Search by spell name..."
          class="border-b-2 border-red-400 bg-transparent pl-6"
          @input="update('name__contains', $event.target.value)"
        />
      </div>
      <div class="grid columns-1 justify-center">
        <label class="font-serif text-xs" for="spellLevel">Level</label>
        <select
          id="spellLevel"
          name="spellLevel"
          class="bg-transparent text-center"
          value=""
          @input="update('level', $event.target.value)"
        >
          <option selected value="">-</option>
          <option
            v-for="level in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]"
            :key="level"
            :value="level"
          >
            {{ level }}
          </option>
        </select>
      </div>
      <div class="grid columns-1 justify-center">
        <label class="font-serif text-xs" for="spellSchool">School</label>
        <select
          id="spellSchool"
          name="spellSchool"
          class="bg-transparent"
          @input="update('school__key', $event.target.value)"
        >
          <option value="">-</option>
          <option
            v-for="school in [
              'Abjuration',
              'Conjuration',
              'Divination',
              'Enchantment',
              'Evocation',
              'Illusion',
              'Necromancy',
              'Transmutation',
            ]"
            :key="school"
            :value="school.toLowerCase()"
          >
            {{ school }}
          </option>
        </select>
      </div>
      <div class="grid columns-1 justify-center">
        <label class="font-serif text-xs" for="spellClassList">Class</label>
        <select
          id="spellClassList"
          name="spellClassList"
          class="bg-transparent"
          @input="update('classes__key__in', $event.target.value)"
        >
          <option value="" class="text-smoke">-</option>
          <option
            v-for="charClass in [
              'Bard',
              'Cleric',
              'Druid',
              'Sorcerer',
              'Warlock',
              'Wizard',
            ]"
            :key="charClass"
            :value="'srd_' + charClass.toLowerCase()"
          >
            {{ charClass }}
          </option>
        </select>
      </div>
    </div>
    <api-results-table
      :data="data?.results"
      :cols="[
        {
          displayName: 'Name',
          value: (data) => data.name,
          sortValue: 'name',
          link: (data) => `/spells/${data.key}`,
        },
        {
          displayName: 'Level',
          value: (data) => data.level,
          sortValue: 'level',
        },
        {
          displayName: 'School',
          value: (data) => data.school.name,
          sortValue: 'school',
        },
        {
          displayName: 'Classes',
          value: (data) => {
            return data.classes.map((c) => c.name).join(', ');
          },
        },
        {
          displayName: 'Concentration',
          value: (data) => (data.concentration ? '√' : '-'),
          sortValue: 'concentration',
        },
      ]"
      :sort-by="sortBy"
      :is-sort-descending="isSortDescending"
      @sort="(sortValue) => setSortState(sortValue)"
    />
  </section>
</template>

<script setup>
// State handlers for sorting results table
const { sortBy, isSortDescending, setSortState } = useSortState();

// fields to fetch from API to populate table
const fields = ['name', 'document', 'level', 'school', 'classes'];

const { filter, update } = useFilterState(DefaultMonsterFilter);

// Fetch a page of results and pagination controls
const { data, paginator } = useFindPaginated({
  endpoint: API_ENDPOINTS.spells,
  sortByProperty: sortBy,
  isSortDescending: isSortDescending,
  filter,
  params: { fields, depth: 1 },
});

// destructure pagination controls
const { pageNo, lastPageNo, firstPage, lastPage, prevPage, nextPage } =
  paginator;
</script>
