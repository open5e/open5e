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

<script>
import { useMainStore } from '~/store';
import axios from 'axios';
import SourceTag from '~/components/SourceTag.vue';
import * as _ from 'underscore';
export default {
  components: {
    SourceTag,
  },
  data() {
    return {
      spells: [],
      filter: '',
      isLoading: false,
      available_classes: [
        'bard',
        'cleric',
        'sorcerer',
        'wizard',
        'druid',
        'paladin',
        'warlock',
        'ranger',
      ],
    };
  },
  computed: {
    store() {
      return useMainStore();
    },
    sourceString: function () {
      return this.store.getSourceString;
    },
    spellsByLevel: function () {
      let levels = [];
      for (let i = 0; i < this.filteredSpells.length; i++) {
        let spellLevel = this.filteredSpells[i].level_int;
        var found = false;
        for (let j = 0; j < levels.length; j++) {
          if (levels[j].lvl == spellLevel) {
            levels[j].spells.push(this.filteredSpells[i]);
            found = true;
          }
        }
        if (!found) {
          levels.push({
            lvl: spellLevel,
            lvlText: this.filteredSpells[i].level,
            spells: [this.filteredSpells[i]],
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
    },
    filteredSpells: function () {
      if (this.filter) {
        return this.spells.filter((spell) => {
          return (
            spell.dnd_class
              .toLowerCase()
              .indexOf(this.$data.filter.toLowerCase()) > -1
          );
        });
      } else {
        return this.spells;
      }
    },
    columnClassObject: function () {
      return {
        'three-column': !this.filter,
      };
    },
    spellListLength: function () {
      return this.filteredSpells.length;
    },
  },
  watch: {
    'store.getSourceString': function () {
      this.getSpells();
    },
  },
  mounted() {
    // throw an error if the class is not a valid spellcasting class
    if (!this.available_classes.includes(useRoute().params.charclass)) {
      throw createError({
        statusCode: 404,
        fatal: true,
        message: `The page ${useRoute().path} does not exist`,
      });
    }
    this.filter = this.$route.params.charclass;
    this.getSpells();
  },
  methods: {
    updateFilter: function (val) {
      this.filter = val;
    },
    getSpells: async function () {
      this.isLoading = true;
      return axios
        .get(
          `${this.$nuxt.$config.public.apiUrl}/spells/?fields=slug,name,level_int,level,dnd_class,document__slug,document__title&limit=1000&document_slug__in=${this.sourceString}`
        ) //you will need to enable CORS to make this work
        .then((response) => {
          this.spells = [];
          this.spells = response.data.results;
          this.isLoading = false;
        });
    },
  },
};
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
