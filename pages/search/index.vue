<template>
  <section class="container docs-container">
    <h1>Search results</h1>
    <hr />
    <p v-if="loading"> Searching Open5e... </p>
    <p v-if="!loading && results.length == 0">No results</p>
    <div v-show="!loading" class="search-result" v-bind:key="result.slug" v-for="result in orderedResults">
      <nuxt-link tag="a" 
        :params="{id: result.slug}" 
        :to="`/${result.route}${result.slug}`">
      {{result.name}}
      </nuxt-link>

      <p class="result-summary" v-if="result.route == 'monsters/'"> 
        <em>CR{{result.challenge_rating}} {{result.hit_points}}hp AC {{result.armor_class}}</em>  |  
        Str <StatBonus :stat="parseInt(result.strength)"></StatBonus>
        Dex <StatBonus :stat="parseInt(result.dexterity)"></StatBonus>
        Con <StatBonus :stat="parseInt(result.constitution)"></StatBonus>
        Int <StatBonus :stat="parseInt(result.intelligence)"></StatBonus>
        Wis <StatBonus :stat="parseInt(result.wisdom)"></StatBonus>
        Cha <StatBonus :stat="parseInt(result.charisma)"></StatBonus>
      </p>

      <p class="result-summary" v-if="result.route == 'spells/'">
        {{result.level}} {{result.school}} spell | {{result.dnd_class}}
      </p>

      <p class="result-summary" v-if="result.route == 'magicitems/'">
        {{result.type}}, {{result.rarity}}
      </p>
      
      <p v-html="result.highlighted"></p>
    </div>
    <p v-if="!loading && results.length > 0">No more results</p>
  </section>
</template>

<script>
import axios from 'axios';
import MdViewer from '~/components/MdViewer';
import VueRouter from 'vue-router';
import StatBonus from '~/components/StatBonus';

function sortFunction(a, b) {
  var textA = a.name.toUpperCase();
  var textB = b.name.toUpperCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

export default {
  components: {
    MdViewer,
    StatBonus
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
      return axios.get(`http://api-beta.open5e.com/search?text=${this.$route.query.text}`) //you will need to enable CORS to make this work
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
          console.log(tmp[i]);
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

.search-result {
  margin-bottom: 2rem;

  .result-summary {
    font-style: italic;
  }

  /deep/ .highlighted {
    background-color: lightgoldenrodyellow;
    font-weight: bold;
  }
}

hr {
  margin-bottom: 2rem;
}
</style>

