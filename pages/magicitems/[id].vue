<template>
  <section class="container docs-container">
    <p v-if="loading"> Loading... </p>
    <div v-else>
      <h1 class="inline">{{ item.name }}</h1>
      <source-tag v-show="item.document__slug" :title="item.document__title" :text="item.document__slug"></source-tag>
      <p><em>{{ item.type }}, {{ item.rarity }} <span v-show="item.requires_attunement">({{ item.requires_attunement
      }})</span></em></p>
      <md-viewer :text="item.desc"></md-viewer>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import StatBonus from '~/components/StatBonus.vue'
import SourceTag from '~/components/SourceTag.vue'
import MdViewer from '~/components/MdViewer.vue'

export default {
  components: {
    StatBonus,
    MdViewer,
    SourceTag
  },
  mounted() {
    return axios.get(`${useRuntimeConfig().public.apiUrl}/magicitems/${this.$route.params.id}`) //you will need to enable CORS to make this work
      .then(response => {
        this.item = response.data;
        this.loading = false
      })
  },
  data() {
    return {
      item: [],
      loading: true,
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

.inline {
  display: inline-block;
}
</style>

