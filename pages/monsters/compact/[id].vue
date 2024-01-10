<template>
  <section class="docs-container container">
    <p v-if="loading">Loading...</p>
    <div v-else class="compact">
      <b>{{ monster.name }}</b
      ><br />
      <em
        >{{ monster.size }} {{ monster.type }} {{ monster.subtype }},
        {{ monster.alignment }}
      </em>
      <hr />
      <b>Armor Class</b> {{ monster.armor_class }} {{ monster.armor_desc
      }}<br />
      <b>Hit Points</b> {{ monster.hit_points }} ({{ monster.hit_dice }})<br />

      <b class="pad-r-sm">Speed </b>
      <span
        v-for="(speed, key, index) in monster.speed"
        v-show="key !== 'hover'"
        :key="index"
      >
        {{ key.charAt(0).toUpperCase() + key.slice(1) }} {{ speed }}ft.
        <span v-if="monster.speed.hasOwnProperty('hover') && key === 'fly'"
          >(hover)</span
        >
      </span>

      <hr />

      <b>STR</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <b>DEX</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <b>CON</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <b>INT</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <b>WIS</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>CHA</b><br />
      {{ fixedWidth(monster.strength) }} (<stat-bonus
        :stat="monster.strength"
      />)&nbsp;&nbsp;&nbsp;{{ fixedWidth(monster.dexterity) }} (<stat-bonus
        :stat="monster.dexterity"
      />)&nbsp;&nbsp;&nbsp;{{ fixedWidth(monster.constitution) }} (<stat-bonus
        :stat="monster.constitution"
      />)&nbsp;&nbsp;&nbsp;{{ fixedWidth(monster.intelligence) }} (<stat-bonus
        :stat="monster.intelligence"
      />)&nbsp;&nbsp;&nbsp;{{ fixedWidth(monster.wisdom) }} (<stat-bonus
        :stat="monster.wisdom"
      />)&nbsp;&nbsp;&nbsp;{{ fixedWidth(monster.charisma) }} (<stat-bonus
        :stat="monster.charisma"
      />)

      <hr />

      <div v-if="getSaves">
        <b class="pad-r-sm">Saving Throws </b>
        <span v-for="(save, index) in getSaves" :key="save.name">
          {{ save.name }}
          <stat-bonus :stat="save.val" :type="save.type" /><span
            v-show="index < getSaves.length - 1"
            >,
          </span>
        </span>
      </div>
      <div v-if="monster.skills.length > 0">
        <b class="pad-r-sm">Skills </b>
        <span
          v-for="(skill, key, index) in monster.skills"
          v-show="key !== 'hover'"
          :key="index"
        >
          {{ key.charAt(0).toUpperCase() + key.slice(1) }}
          <span v-if="skill >= 0">+</span>{{ skill
          }}<span v-if="index < getSaves.length - 1">, </span>
        </span>
      </div>
      <div v-if="monster.damage_vulnerabilities">
        <b class="pad-r-sm">Damage Vulnerabilities </b>
        {{ monster.damage_vulnerabilities }}
      </div>
      <div v-if="monster.damage_resistances">
        <b>Damage Resistances </b> {{ monster.damage_resistances }}
      </div>
      <div v-if="monster.damage_immunities">
        <b>Damage Immunities </b> {{ monster.damage_immunities }}
      </div>
      <div v-if="monster.senses"><b>Senses </b> {{ monster.senses }}</div>
      <div v-if="monster.languages">
        <b>Languages </b> {{ monster.languages }}
      </div>
      <div>
        <b class="pad-r-sm">Challenge </b>
        <challenge-render :challenge="monster.challenge_rating" />
      </div>

      <hr v-if="monster.special_abilities.length > 0" />
      <p
        v-for="ability in monster.special_abilities"
        :key="ability.name"
        class="action-block"
      >
        <b class="action-name">{{ ability.name }}. </b>
        <md-viewer class="inline" :text="ability.desc" />
      </p>

      <hr v-if="monster.actions.length > 0" />
      <b v-if="monster.actions.length > 0">Actions</b>
      <p
        v-for="action in monster.actions"
        :key="action.name"
        class="action-block"
      >
        <b class="action-name">{{ action.name }}. </b>
        <md-viewer class="inline" :text="action.desc" />
      </p>

      <hr v-if="monster.reactions.length > 0" />
      <b v-if="monster.reactions.length > 0">Reactions</b>
      <p
        v-for="action in monster.reactions"
        :key="action.name"
        class="action-block"
      >
        <b class="action-name">{{ action.name }}. </b>
        <md-viewer class="inline" :text="action.desc" />
      </p>

      <hr v-if="monster.legendary_actions.length > 0" />
      <b v-if="monster.legendary_actions.length > 0">Legendary Actions</b>
      <p
        v-for="action in monster.legendary_actions"
        :key="action.name"
        class="action-block"
      >
        <b class="action-name">{{ action.name }}. </b>
        <md-viewer class="inline" :text="action.desc" />
      </p>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import StatBonus from '~/components/StatBonus.vue';
import ChallengeRender from '~/components/ChallengeRender.vue';
import MdViewer from '~/components/MdViewer';

export default {
  components: {
    StatBonus,
    ChallengeRender,
    MdViewer,
  },
  data() {
    return {
      posts: [],
      errors: [],
      monster: [],
      loading: true,
    };
  },
  computed: {
    getSaves() {
      let saves = [];
      let savesArray = [
        { name: 'strength', display: 'Str' },
        { name: 'dexterity', display: 'Dex' },
        { name: 'constitution', display: 'Con' },
        { name: 'intelligence', display: 'Int' },
        { name: 'wisdom', display: 'Wis' },
        { name: 'charisma', display: 'Cha' },
      ];
      // build an object of save bonuses if they exist
      for (let i = 0; i < savesArray.length; i++) {
        const saveValue = this.monster[savesArray[i].name + '_save'];
        const statValue = this.monster[savesArray[i].name];
        if (saveValue !== null) {
          saves.push({
            name: savesArray[i].display,
            val: saveValue,
            type: 'bonus',
          });
        } else {
          saves.push({
            name: savesArray[i].display,
            val: statValue,
            type: 'score',
          });
        }
      }

      return saves;
    },
  },
  created() {
    return axios
      .get(
        `${useRuntimeConfig().public.apiUrl}/monsters/${this.$route.params.id}`
      )
      .then((response) => {
        this.monster = response.data;
        this.loading = false;
      });
  },
  methods: {
    fixedWidth(stat) {
      if (stat < 10) {
        return ` ${stat}`;
      }
      return stat;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/main.scss';

.compact {
  line-height: 1rem;
}
</style>
