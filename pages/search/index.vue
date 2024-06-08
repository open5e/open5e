<template>
  <section class="docs-container container">
    <h1>Search results</h1>
    <hr />
    <h3 v-if="!search_results" class="font-sans font-bold text-slate-400">
      Searching Open5e...
    </h3>
    <h3 v-else-if="!searchText" class="font-sans font-bold text-slate-400">
      <Icon name="majesticons:search-line" class="mr-2 h-8 w-8" />
      Search for something to see results...
    </h3>
    <h3
      v-if="search_results && search_results.length == 0"
      class="font-sans font-bold text-slate-400"
    >
      <Icon name="majesticons:scroll-line" class="mr-2 h-8 w-8" />
      No results
    </h3>
    <div v-if="search_results">
      <div
        v-for="result in search_results"
        :key="result.object_pk"
        class="search-result"
      >
        <!-- Result summary for creatures including mini statblock -->
        <div v-if="result.object_model == 'Monster'" class="result-summary">
          <nuxt-link
            tag="a"
            :params="{ id: result.object_pk }"
            :to="`/monsters/${result.object_pk}`"
          >
            {{ result.object_name }}
          </nuxt-link>
          <span> CR{{ result.object.challenge_rating }} </span
          ><span class="title-case">{{ result.type }} | </span>
          <em
            >{{ result.object.hit_points }}hp, AC
            {{ result.object.armor_class }}</em
          >
          <source-tag
            v-if="result.document.key !== 'wotc-srd'"
            class="source-tag"
            :title="result.document.name"
            :text="result.document.key"
          />
          <div>
            <stat-bar
              class="top-border"
              :stats="{
                str: result.object.strength,
                dex: result.object.dexterity,
                con: result.object.constitution,
                int: result.object.intelligence,
                wis: result.object.wisdom,
                cha: result.object.charisma,
              }"
            />
          </div>
        </div>

        <!-- Result summary for spells including basic spell info -->
        <div v-else-if="result.object_model == 'Spell'" class="result-summary">
          <nuxt-link
            tag="a"
            :params="{ id: result.object_pk }"
            :to="`/spells/${result.object_pk}`"
          >
            {{ result.object_name }}
          </nuxt-link>
          {{ result.object.level }} {{ result.object.school }} spell |
          {{ result.object.dnd_class }}
          <source-tag
            v-if="result.document.key !== 'wotc-srd'"
            class="source-tag"
            :title="result.document.name"
            :text="result.document.key"
          />
          <p class="result-highlights" v-html="result.highlighted" />
        </div>

        <!-- Result summary for magic items -->
        <div
          v-else-if="result.object_model == 'MagicItem'"
          class="result-summary"
        >
          <nuxt-link
            tag="a"
            :params="{ id: result.object_pk }"
            :to="`/magic-items/${result.object_pk}`"
          >
            {{ result.object_name }}
          </nuxt-link>
          {{ result.object.type }}, {{ result.object.rarity }}
          <source-tag
            v-if="result.document.key !== 'wotc-srd'"
            class="source-tag"
            :title="result.document.name"
            :text="result.document.key"
          />
          <p class="result-highlights" v-html="result.highlighted" />
        </div>

        <!-- Result summary for everything else -->
        <div v-else class="result-summary">
          <nuxt-link
            tag="a"
            :params="{ id: result.object_pk }"
            :to="`/${getRoute(result.object_model)}/${result.object_pk}`"
          >
            {{ result.object_name }}
          </nuxt-link>
          <source-tag
            v-if="result.document.key !== 'wotc-srd'"
            class="source-tag"
            :title="result.document.name"
            :text="result.document.key"
          />
          <p class="result-highlights" v-html="result.highlighted" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import StatBar from '~/components/StatBar';
import SourceTag from '~/components/SourceTag';

const ModelToRoute = {
  Monster: 'monsters',
  Spell: 'spells',
  Race: 'races',
  Section: 'sections',
  MagicItem: 'magic-items',
  Feat: 'feats',
  Background: 'backgrounds',
  CharClass: 'classes',
};

function getRoute(model) {
  return ModelToRoute[model] ?? 'error';
}

const searchText = useQueryParam('text');
const { data: search_results } = useSearch(searchText);
</script>

<style lang="scss" scoped>
@import './assets/variables';

.search-result {
  margin-bottom: 2rem;

  a {
    font-weight: bold;
  }

  :deep(.highlighted) {
    background-color: lightgoldenrodyellow;
    font-weight: bold;
  }
}

.top-border {
  margin-top: 0.35rem;
  padding-top: 0.25rem;
  border-top: 1px solid rgba($color-smoke, 0.5);
  font-size: 14px;
  opacity: 0.7;
}

hr {
  margin-bottom: 2rem;
}

.result-highlights {
  font-size: 14px;
  opacity: 0.8;
}
</style>
