<template>
  <section class="docs-container container">
    <p v-if="loading">Loading...</p>
    <div v-else>
      <h1>{{ monster.name }}</h1>
      <img v-if="monster.img_main" :src="monster.img_main" class="img-main" />
      <p>
        <em
          >{{ monster.size }} {{ monster.type }}, {{ monster.alignment }}
          <source-tag
            v-show="monster.document__slug"
            :title="monster.document__title"
            :text="monster.document__slug"
        /></em>
      </p>
      <hr />
      <p><b>Armor Class</b> {{ monster.armor_class }}</p>
      <p><b>Hit Points</b> {{ monster.hit_points }} ({{ monster.hit_dice }})</p>
      <p>
        <b class="pr-1">Speed</b>
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
      </p>
      <hr />
      <div class="ability-array">
        <div class="ability-block">
          <span class="ability-name">STR</span>
          <span class="ability-score"
            >{{ monster.strength }} (<stat-bonus
              :stat="monster.strength"
            />)</span
          >
        </div>
        <div class="ability-block">
          <span class="ability-name">DEX</span>
          <span class="ability-score"
            >{{ monster.dexterity }} (<stat-bonus
              :stat="monster.dexterity"
            />)</span
          >
        </div>
        <div class="ability-block">
          <span class="ability-name">CON</span>
          <span class="ability-score"
            >{{ monster.constitution }} (<stat-bonus
              :stat="monster.constitution"
            />)</span
          >
        </div>
        <div class="ability-block">
          <span class="ability-name">INT</span>
          <span class="ability-score"
            >{{ monster.intelligence }} (<stat-bonus
              :stat="monster.intelligence"
            />)</span
          >
        </div>
        <div class="ability-block">
          <span class="ability-name">WIS</span>
          <span class="ability-score">
            {{ monster.wisdom }} (<stat-bonus :stat="monster.wisdom" />)
          </span>
        </div>
        <div class="ability-block">
          <span class="ability-name">CHA</span>
          <span class="ability-score">
            {{ monster.charisma }} (<stat-bonus :stat="monster.charisma" />)
          </span>
        </div>
      </div>
      <hr />
      <p v-if="getSaves">
        <b class="pr-1">Saving Throws</b>
        <span v-for="(save, index) in getSaves" :key="save.name">
          {{ save.name }}
          <stat-bonus :stat="save.val" :type="save.type" />
          <span v-show="index < getSaves.length - 1"> , </span>
        </span>
      </p>
      <p v-if="monster.skills">
        <b class="pr-1">Skills</b>
        <span
          v-for="(skill, key, index) in monster.skills"
          v-show="key !== 'hover'"
          :key="index"
        >
          {{ key.charAt(0).toUpperCase() + key.slice(1) }}
          <span v-if="skill >= 0">+</span>{{ skill
          }}<span v-if="index < getSaves.length - 1">, </span>
        </span>
      </p>
      <p v-if="monster.damage_vulnerabilities">
        <b class="pr-1">Damage Vulnerabilities</b>
        {{ monster.damage_vulnerabilities }}
      </p>
      <p v-if="monster.damage_resistances">
        <b>Damage Resistances</b> {{ monster.damage_resistances }}
      </p>
      <p v-if="monster.damage_immunities">
        <b>Damage Immunities</b> {{ monster.damage_immunities }}
      </p>
      <p v-if="monster.senses"><b>Senses</b> {{ monster.senses }}</p>
      <p v-if="monster.languages"><b>Languages</b> {{ monster.languages }}</p>
      <p v-if="monster.challenge_rating">
        <b class="pr-1">Challenge</b>
        <challenge-render :challenge="monster.challenge_rating" />
      </p>
      <hr />
      <p
        v-for="ability in monster.special_abilities"
        :key="ability.name"
        class="action-block"
      >
        <b class="action-name">{{ ability.name }}. </b>
        <md-viewer class="inline" :text="ability.desc" />
      </p>
      <h2 v-if="monster.actions">Actions</h2>
      <p
        v-for="action in monster.actions"
        :key="action.name"
        class="action-block"
      >
        <b class="action-name">{{ action.name }}. </b>
        <md-viewer class="inline" :text="action.desc" />
      </p>
      <h2 v-if="monster.reactions">Reactions</h2>
      <p
        v-for="action in monster.reactions"
        :key="action.name"
        class="action-block"
      >
        <b class="action-name">{{ action.name }}. </b>
        <md-viewer class="inline" :text="action.desc" />
      </p>
      <h2 v-if="monster.legendary_actions">Legendary Actions</h2>
      <p
        v-for="action in monster.legendary_actions"
        :key="action.name"
        class="action-block"
      >
        <b class="action-name">{{ action.name }}. </b>
        <md-viewer class="inline" :text="action.desc" />
      </p>
      <p class="text-sm italic">
        Source:
        <a target="NONE" :href="monster.document__url">
          {{ monster.document__title }}
          <Icon name="heroicons:arrow-top-right-on-square-20-solid" />
        </a>
      </p>
      <p class="text-sm italic">
        Compact Statblock:
        <nuxt-link
          tag="a"
          :params="{ id: monster.slug }"
          :to="`/monsters/compact/${monster.slug}`"
          :prefetch="false"
        >
          {{ monster.name }}
        </nuxt-link>
      </p>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
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
    const { id } = useRoute().params;
    const url = `${useRuntimeConfig().public.apiUrl}/monsters/${id}/`;
    return axios
      .get(url)
      .then((response) => {
        this.monster = response.data;
        this.loading = false;
      })
      .catch(() => {
        throw showError({
          statusCode: 404,
          message: 'This monster does not exist',
        });
      });
  },
};
</script>

<style scoped lang="scss">
.img-main {
  float: right;
  width: 30%;
  min-width: 300px;
}

@media screen and (max-width: 600px) {
  .img-main {
    float: none;
    width: 100%;
  }
}

.action-block {
  .inline {
    display: inline;

    :deep(p:first-child) {
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
