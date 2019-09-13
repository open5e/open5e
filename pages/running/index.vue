<template>
  <section class="container docs-container">
    <h1>Running a Game</h1>
    <div class="docs-toc">
      <span v-if="$route.hash">{{$route.hash}}</span>
      <ul>
        <li v-for="section in sectionGroups.Rules" v-bind:key="section.slug"><nuxt-link tag="a" :to="`/running/${section.slug}`">{{section.name}}</nuxt-link></li>
      </ul>
    </div>
  </section>
</template>

<script>
import MdViewer from '~/components/MdViewer'
import { mapGetters, mapActions } from 'vuex'

Array.prototype.groupBy = function(prop) {
  return this.reduce(function(groups, item) {
    const val = item[prop]
    groups[val] = groups[val] || []
    groups[val].push(item)
    return groups
  }, {})
}

export default {
  beforeCreate () {
    this.$store.dispatch('LOAD_CLASSES');
    this.$store.dispatch('LOAD_SECTIONS');
    this.$store.dispatch('LOAD_RACES');
  },
  components: {
    MdViewer
  },
  computed: {
    ...mapActions({
      LOAD_CLASSES: 'LOAD_CLASSES',
      LOAD_SECTIONS: 'LOAD_CLASSES',
      LOAD_RACES: 'LOAD_CLASSES',
    }),
    ...mapGetters({
      sections: 'allSections',
    }),
    sectionGroups: function() {
      let groupedSections = this.sections.groupBy('parent');
      return groupedSections;
    },
  }
}
</script>

<style>
</style>

