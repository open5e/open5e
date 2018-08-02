<template>
  <section class="container">
    <div>
      <h2>{{monster.name}}</h2>
      <p>
        <span>AC {{monster.armor_class}}</span>
        <span> HP {{monster.hit_points}} ({{monster.hit_dice}})</span>
      </p>
      <p>
        <span>STR {{monster.strength}} (<stat-bonus :stat="monster.strength"></stat-bonus></span>) 
        <span>DEX {{monster.dexterity}} (<stat-bonus :stat="monster.dexterity"></stat-bonus></span>) 
        <span>CON {{monster.constitution}} (<stat-bonus :stat="monster.constitution"></stat-bonus></span>) 
        <span>INT {{monster.intelligence}} (<stat-bonus :stat="monster.intelligence"></stat-bonus></span>) 
        <span>WIS {{monster.wisdom}} (<stat-bonus :stat="monster.wisdom"></stat-bonus></span>) 
        <span>CHA {{monster.charisma}} (<stat-bonus :stat="monster.charisma"></stat-bonus></span>) 
      </p>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import StatBonus from '~/components/StatBonus.vue'

export default {
  components: {
    StatBonus
  },
  mounted () {
    return axios.get(`http://localhost:8000/monsters/${this.$route.params.id}`) //you will need to enable CORS to make this work
    .then(response => {
      this.monster = response.data
    })
  },
  data () {
    return {
      posts: [],
      errors: [],
      monster: [],
    }
  },
}
</script>

<style>
</style>

