<template>
  <section class="container docs-container">
    <h1>Search results</h1>
    <hr />
    <div class="search-result" v-bind:key="result.slug" v-for="result in orderedResults">
      <b>{{result.name}}</b>
      <p v-html="result.highlighted"></p>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import MdViewer from '~/components/MdViewer';
import VueRouter from 'vue-router'

export default {
  components: {
    MdViewer
  },
  mounted () {
    return axios.get(`http://localhost:8000/search?text=${this.$route.query.text}`) //you will need to enable CORS to make this work
    .then(response => {
      this.results = response.data.results
    })
  },
  data () {
    return {
      results: [],
      text: this.$route.query.text,
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
      console.log(tmp)
      console.log(this.text)
      console.log(first)
      console.log(others)

      first.sort(function(a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      next.sort(function(a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      others.sort(function(a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      return(first.concat(next).concat(others));
    }
  }
}
</script>

<style>
.highlighted {
  background-color: lightgoldenrodyellow;
  font-weight: bold;
}

.search-result {
  margin-bottom: 2rem;
}

hr {
  margin-bottom: 2rem;
}
</style>

