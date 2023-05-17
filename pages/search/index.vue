<template>
  <section class="container docs-container">
    <h1>Search results</h1>
    <hr />
    <p v-if="loading"> Searching Open5e... </p>
    <p v-if="!loading && results.length == 0">No results</p>
    <div v-show="!loading" class="search-result" v-bind:key="result.slug" v-for="result in orderedResults">

      <!-- Result summary for creatures including mini statblock -->
      <div class="result-summary" v-if="result.route == 'monsters/'"> 
        <nuxt-link tag="a" 
          :params="{id: result.slug}" 
          :to="`/${result.route}${result.slug}`">
          {{result.name}}</nuxt-link>
        <source-tag v-if="result.document_slug !== 'wotc-srd'" class="source-tag" :title="result.document_title" :text="result.document_slug"></source-tag>
        <span> CR{{result.challenge_rating}} </span><span class="title-case">{{result.type}} | </span>
        <em>{{result.hit_points}}hp, AC {{result.armor_class}}</em>
        <div>
          <stat-bar class="top-border" :stats="{
            str: result.strength, 
            dex:result.dexterity, 
            con: result.constitution, 
            int: result.intelligence, 
            wis: result.wisdom, 
            cha: result.charisma}">
          </stat-bar>
        </div>
      </div>

      <!-- Result summary for spells including basic spell info -->
      <div class="result-summary" v-else-if="result.route == 'spells/'">
        <nuxt-link tag="a" 
          :params="{id: result.slug}" 
          :to="`/${result.route}${result.slug}`">
          {{result.name}}
        </nuxt-link>
        {{result.level}} {{result.school}} spell | {{result.dnd_class}}
        <p class="result-highlights" v-html="result.highlighted"></p>
      </div>

      <!-- Result summary for magic items -->
      <div class="result-summary" v-else-if="result.route == 'magicitems/'">
        <nuxt-link tag="a" 
          :params="{id: result.slug}" 
          :to="`/${result.route}${result.slug}`">
          {{result.name}}
        </nuxt-link>
        {{result.type}}, {{result.rarity}}
        <p class="result-highlights" v-html="result.highlighted"></p>
      </div>

      <!-- Result summary for everything else -->
      <div class="result-summary" v-else>
        <nuxt-link tag="a" 
          :params="{id: result.slug}" 
          :to="`/${result.route}${result.slug}`">
          {{result.name}}
        </nuxt-link>
        <p class="result-highlights" v-html="result.highlighted"></p>
      </div>
    </div>
    <p v-if="!loading && results.length > 0">No more results</p>
  </section>
</template>

<script>
import axios from 'axios';
import MdViewer from '~/components/MdViewer';
import VueRouter from 'vue-router';
import StatBonus from '~/components/StatBonus';
import StatBar from '~/components/StatBar';
import SourceTag from '~/components/SourceTag';

function sortFunction(a, b) {
  var textA = a.name.toUpperCase();
  var textB = b.name.toUpperCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

export default {
  components: {
    MdViewer,
    StatBonus,
    StatBar,
    SourceTag,
  },
  watch: {
    '$route.params': function (query) {
      this.getSearchResults()
    }
  },
  data () {
    return {
      results: [],
      text: this.$route.query.text,
      loading: true,
    }
  },
  mounted() {
    this.getSearchResults();
  },
  methods: {
    getSearchResults: function() {
      this.loading = true;
      return axios.get(`${process.env.apiUrl}/search?text=${this.$route.query.text}`) //you will need to enable CORS to make this work
      .then(response => {
        this.results = response.data.results
        this.loading = false
      })
    }
  },
  computed: {
    orderedResults : function() {
      let tmp = this.results.slice()
      const term = this.text.toUpperCase()
      let first = []
      let next = []
      let others = []
      for (var i = 0; i < tmp.length; i++) {
          if (tmp[i].name.toUpperCase().indexOf(term) == 0) {
            first.push(tmp[i]);
          }
          else if (tmp[i].name.toUpperCase().indexOf(term) != -1) {
            next.push(tmp[i])
          } 
          else {
            others.push(tmp[i]);
          }
      }

      first.sort(function(a, b) {
        return sortFunction(a,b);
      });
      next.sort(function(a, b) {
        return sortFunction(a,b);
      });
      others.sort(function(a, b) {
        return sortFunction(a,b);
      });
      return(first.concat(next).concat(others));
    }
  }
}
</script>

<style lang="scss" scoped>
@import './assets/variables';

.search-result {
  margin-bottom: 2rem;

  a {
    font-weight: bold;
  }

  /deep/ .highlighted {
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

.result-highlights{
  font-size: 14px;
  opacity: 0.8;
}
</style>

