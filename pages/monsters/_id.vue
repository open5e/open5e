<template>
  <section class="container docs-container">
      <h1>{{monster.name}}</h1>
      <p><em>{{monster.size}} {{monster.type}}, {{monster.alignment}}</em></p>
      <hr/>
      <p> <b>Armor Class</b> {{monster.armor_class}}</p>
      <p> <b>Hit Points</b> {{monster.hit_points}} ({{monster.hit_dice}})</p>
      <p> <b>Speed</b> {{monster.speed}}</p>
      <hr/>
      <div class="ability-array">
        <div class="ability-block">
          <span class="ability-name">STR</span>
          <span class="ability-score">{{monster.strength}} (<stat-bonus :stat="monster.strength"></stat-bonus>)</span> 
          
        </div> 
        <div class="ability-block">
          <span class="ability-name">DEX</span>
          <span class="ability-score">{{monster.dexterity}} (<stat-bonus :stat="monster.dexterity"></stat-bonus>)</span> 
          
        </div> 
        <div class="ability-block">
          <span class="ability-name">CON</span>
          <span class="ability-score">{{monster.constitution}} (<stat-bonus :stat="monster.constitution"></stat-bonus>)</span> 
          
        </div> 
        <div class="ability-block">
          <span class="ability-name">INT</span>
          <span class="ability-score">{{monster.intelligence}} (<stat-bonus :stat="monster.intelligence"></stat-bonus>)</span> 
          
        </div> 
        <div class="ability-block">
          <span class="ability-name">WIS</span>
          <span class="ability-score">{{monster.wisdom}} (<stat-bonus :stat="monster.wisdom"></stat-bonus>)</span> 
          
        </div>
        <div class="ability-block">
          <span class="ability-name">CHA</span>
          <span class="ability-score">{{monster.charisma}} (<stat-bonus :stat="monster.charisma"></stat-bonus>)</span> 
          
        </div>
      </div>
      <hr/>
      <p v-if="getSaves">
        <b>Saving Throws</b>
        {{getSaves}}
      </p>
      <p v-if="getSkills"> <b>Skills</b> {{getSkills}} </p>
      <p v-if="monster.damage_vulnerabilities"> <b>Damage Vulnerabilities</b> {{monster.damage_vulnerabilities}} </p>
      <p v-if="monster.damage_resistances"> <b>Damage Resistances</b> {{monster.damage_resistances}} </p>
      <p v-if="monster.damage_immunities"> <b>Damage Immunities</b> {{monster.damage_immunities}} </p>
      <p v-if="monster.senses"> <b>Senses</b> {{monster.senses}} </p>
      <p v-if="monster.languages"> <b>Languages</b> {{monster.languages}} </p>
      <p v-if="monster.challenge_rating"> <b>Challenge</b> <challenge-render :challenge="monster.challenge_rating"></challenge-render> </p>
      <hr/>
      <p class="action-block" v-for="ability in monster.special_abilities" v-bind:key="ability.name">
        <b class="action-name">{{ability.name}}. </b> <md-viewer class="inline" :text="ability.desc"></md-viewer>
      </p>
      <h2 v-if="monster.actions">Actions</h2>
      <p class="action-block" v-for="action in monster.actions" v-bind:key="action.name">
        <b class="action-name">{{action.name}}. </b> <md-viewer class="inline" :text="action.desc"></md-viewer>
      </p>
      <h2 v-if="monster.reactions">Reactions</h2>
      <p class="action-block" v-for="action in monster.reactions" v-bind:key="action.name">
        <b class="action-name">{{action.name}}. </b> <md-viewer class="inline" :text="action.desc"></md-viewer>
      </p>
      <h2 v-if="monster.legendary_actions">Legendary Actions</h2>
      <p class="action-block" v-for="action in monster.legendary_actions" v-bind:key="action.name">
        <b class="action-name">{{action.name}}. </b> <md-viewer class='inline' :text="action.desc"></md-viewer>
      </p>
  </section>
</template>

<script>
import axios from 'axios'
import StatBonus from '~/components/StatBonus.vue'
import ChallengeRender from '~/components/ChallengeRender.vue'
import MdViewer from '~/components/MdViewer';

export default {
  components: {
    StatBonus,
    ChallengeRender,
    MdViewer
  },
  mounted () {
    return axios.get(`${process.env.apiUrl}/monsters/${this.$route.params.id}.json`) //you will need to enable CORS to make this work
    .then(response => {
      this.monster = response.data
    })
  },
  computed: {
    getSaves: function() {
      let saveString = '';
      let saves = [];
      // build an object of save bonuses if they exist
      if (this.monster.hasOwnProperty('strength_save')){
        saves.push({name: 'Con', val: this.monster.strength_save});
      }
      if (this.monster.hasOwnProperty('dexterity_save')){
        saves.push({name: 'Str', val: this.monster.dexterity_save});
      }
      if (this.monster.hasOwnProperty('constitution_save')){
        saves.push({name: 'Con', val: this.monster.constitution_save});
      }
      if (this.monster.hasOwnProperty('intelligence_save')){
        saves.push({name: 'Int', val: this.monster.intelligence_save});
      }
      if (this.monster.hasOwnProperty('wisdom_save')){
        saves.push({name: 'Wis', val: this.monster.wisdom_save});
      }
      if (this.monster.hasOwnProperty('charisma_save')){
        saves.push({name: 'Cha', val: this.monster.charisma_save});
      }

      for (let i = 0; i < saves.length; i++) {
        const s = saves[i];
        saveString += `${s.name} `
        if (s.val >=  0) { saveString += `+${s.val}` }
        if (s.val < 0) {saveString += `-${s.val}` }
        if (i < saves.length - 1) { saveString += ', '}
      }

      return saveString;
    },

    getSkillList: function() {
      let skillList = []
      let keys = [
        'Acrobatics',
        'Animal Handling',
        'Arcana',
        'Athletics',
        'Deception',
        'History',
        'Insight',
        'Intimidation',
        'Investigation',
        'Medicine',
        'Nature',
        'Perception',
        'Persuasion',
        'Religion',
        'Sleight of Hand',
        'Stealth',
        'Survival'
      ]
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const keyValue = k.split(' ').join('_').toLowerCase();
        if (this.monster.hasOwnProperty(keyValue)) {
          skillList.push({name: [k], val: this.monster[keyValue]});
        }
      }
      return skillList
    },

    getSkills: function() {
      let skills = this.getSkillList;
      let skillString = '';

      for (let i = 0; i < skills.length; i++) {
        const s = skills[i];
        skillString += `${s.name} `
        if (s.val >=  0) { skillString += `+${s.val}` }
        if (s.val < 0) {skillString += `-${s.val}` }
        if (i < skills.length - 1) { skillString += ', '}
      }

      return skillString;

    }
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

<style scoped lang="scss">
.action-block {

  .inline {
    display: inline;

    /deep/ p:first-child {
      display: inline;
    }
  }

  .action-name {
    font-size: 1.1rem;
  }
}

.ability-array {
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
  max-width: 30rem;
  
  .ability-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .ability-name {
      font-weight: bold;
    }
  }
}
</style>

