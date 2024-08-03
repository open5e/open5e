<template>
  <section class="container">
    <h1 class="filter-header">
      <span class="title-case">{{ charclass }} spells</span>
    </h1>
    <div v-if="spellsByLevel" :class="'three-column'">
      <p v-if="spellsByLevel.length == 0">No results</p>

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

const charclass = useRoute().params.charclass;

const { data: spellsByLevel } = useSpellsByClass(charclass, {
  fields: [
    'name',
    'slug',
    'level_int',
    'document__slug',
    'document__title',
    'dnd_class',
  ].join(),
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
