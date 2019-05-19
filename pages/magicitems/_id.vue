<template>
  <section class="container docs-container">
    <div>
      <h1>{{item.name}}</h1>
      <p><em>{{item.type}}, {{item.rarity}}</em></p>
      <md-viewer :text="item.desc"></md-viewer>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import StatBonus from '~/components/StatBonus.vue'
import MdViewer from '~/components/MdViewer.vue'

export default {
  components: {
    StatBonus,
    MdViewer,
  },
  mounted () {
    return axios.get(`${process.env.apiUrl}/magicitems/${this.$route.params.id}`) //you will need to enable CORS to make this work
    .then(response => {
      this.item = response.data
    })
  },
  data () {
    return {
      item: [],
    }
  },
  computed: {
    nextSpellId: function () {
      return (this.item.id + 1)
    },
    prevSpellId: function () {
      return (this.item.id - 1)
    }
  }
}
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>

