<template>
  <section class="container">
    <h1 class="filter-header">
      <span class="title-case">{{ filter }} spells</span>
    </h1>
    <div :class="'three-column'">
      <p v-if="!spellListLength && !isLoading">No results</p>
      <p v-else-if="isLoading">Loading...</p>
      <ul
        v-for="level in spellsByLevel"
        v-else
        :key="level.lvl"
        class="list--items"
      >
        <h3>{{ level.lvlText }}</h3>
        <li v-for="spell in level.spells" :key="spell.name">
          <nuxt-link
            tag="a"
            :params="{ id: spell.slug }"
            :to="`/spells/${spell.slug}`"
          >
            {{ spell.name }}
          </nuxt-link>
          <source-tag
            v-if="spell.document__slug && spell.document__slug !== 'wotc-srd'"
            class=""
            :title="spell.document__title"
            :text="spell.document__slug"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import SourceTag from '~/components/SourceTag.vue';
import { useMainStore } from '~/store';
import * as _ from 'underscore';

const filter = ref('');
const isLoading = ref(false);
const available_classes = ref([
  'bard',
  'cleric',
  'sorcerer',
  'wizard',
  'druid',
  'paladin',
  'warlock',
  'ranger',
]);

const store = useMainStore();
const sourceString = computed(() => store.getSourceString);
const spells2 = computed(() => {
  return store.allSpells;
});

const filteredSpells = computed(() => {
  sourceString.value; // rerun when sources are changed
  if (filter.value) {
    return spells2.value.filter((spell) => {
      return (
        spell.dnd_class.toLowerCase().indexOf(filter.value.toLowerCase()) > -1
      );
    });
  } else {
    return spells2.value;
  }
});

const spellsByLevel = computed(() => {
  let levels = [];
  for (let i = 0; i < filteredSpells.value.length; i++) {
    let spellLevel = filteredSpells.value[i].level_int;
    var found = false;
    for (let j = 0; j < levels.length; j++) {
      if (levels[j].lvl == spellLevel) {
        levels[j].spells.push(filteredSpells.value[i]);
        found = true;
      }
    }
    if (!found) {
      levels.push({
        lvl: spellLevel,
        lvlText: filteredSpells.value[i].level,
        spells: [filteredSpells.value[i]],
      });
    }
  }
  if (levels.length > 0) {
    levels = levels.sort(function (a, b) {
      return a.lvl - b.lvl;
    });
  } else {
    return false;
  }
  return levels;
});

const spellListLength = computed(() => {
  return filteredSpells.value.length;
});

onMounted(() => {
  if (!available_classes.value.includes(useRoute().params.charclass)) {
    throw createError({
      statusCode: 404,
      fatal: true,
      message: `The page ${useRoute().path} does not exist`,
    });
  }
  filter.value = useRoute().params.charclass;
  store.loadSpells();
});
</script>

<style lang="scss" scoped>
.table-link {
  font-size: 0.5em;
  text-decoration: underline;
}

.title-case {
  text-transform: capitalize;
}

.class-selector {
  font-size: 1rem;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  flex-grow: 1;
  text-align: right;
}
</style>
