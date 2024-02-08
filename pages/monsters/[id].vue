<template>
  <main v-if="monster" class="docs-container container">
    <!-- TITLE -->
    <h1>{{ monster.name }}</h1>
    <img v-if="monster.img_main" :src="monster.img_main" class="img-main" />
    <p class="italic">
      <span>
        {{
          `${monster.size} ${monster.type} ${monster.subtype}, ${monster.alignment}`
        }}
      </span>
      <source-tag
        v-show="monster.document__slug"
        :title="monster.document__title"
        :text="monster.document__slug"
      />
    </p>
    <hr />
    <section>
      <ul>
        <li>
          <span class="font-bold">Armor Class </span>
          <span>{{ `${monster.armor_class} (${monster.armor_desc})` }}</span>
        </li>
        <li>
          <span class="font-bold">Hit Points </span>
          <span>{{ `${monster.hit_points} (${monster.hit_dice})` }}</span>
        </li>
        <li>
          <span class="font-bold">Speed </span>
          <span
            v-for="(speed, key, index) in monster.speed"
            v-show="key !== 'hover'"
            :key="index"
          >
            {{ key.charAt(0).toUpperCase() + key.slice(1) }} {{ speed }}ft.
            <span v-if="monster.speed.hasOwnProperty('hover') && key === 'fly'">
              (hover)
            </span>
          </span>
        </li>
      </ul>
    </section>

    <hr />

    <!-- ABILITY SCORES -->
    <section class="max-w-96">
      <ul class="flex items-center gap-4 text-center">
        <li v-for="ability in abilites" :key="ability.name">
          <span class="block font-bold uppercase">{{ ability.shortName }}</span>
          <span>{{ `${ability.score} (${ability.modifier})` }} </span>
        </li>
      </ul>
    </section>

    <hr />

    <!-- SAVING THROWS AND ATTRIBUTES-->
    <section>
      <ul>
        <li>
          <span class="font-bold">Saving Throws </span>
          <span v-for="ability in abilites" :key="ability.name">
            <span class="capitalize before:content-['_']">
              {{ ability.shortName }}
            </span>
            <span class="before:content-['_']">
              {{ formatMod(ability.save) }} </span
            >.
          </span>
        </li>

        <li v-if="monster.skills">
          <span class="after:content-[': '] font-bold">Skills </span>
          <span
            v-for="(skill, key, index) in monster.skills"
            v-show="key !== 'hover'"
            :key="index"
          >
            {{ key.charAt(0).toUpperCase() + key.slice(1) }}
            <span v-if="skill >= 0">+</span>{{ skill }}.
            <span v-if="index < monster.skills.length - 1">, </span>
          </span>
        </li>

        <li v-if="monster.damage_vulnerabilities">
          <span class="font-bold">Damage Vulnerabilities </span>
          <span>{{ monster.damage_vulnerabilities }}</span>
        </li>

        <li v-if="monster.damage_resistances">
          <span class="font-bold">Damage Resistances </span>
          <span>{{ monster.damage_resistances }}</span>
        </li>

        <li v-if="monster.damage_immunities">
          <span class="font-bold">Damage Immunities </span>
          <span>{{ monster.damage_immunities }}</span>
        </li>

        <li v-if="monster.senses">
          <span class="font-bold">Senses </span>
          <span>{{ monster.senses }}</span>
        </li>
        <li v-if="monster.languages">
          <span class="font-bold">Languages </span>
          <span>{{ monster.languages }}</span>
        </li>
        <li v-if="monster.challenge_rating">
          <span class="font-bold">Challenge </span>
          <challenge-render :challenge="monster.challenge_rating" />
        </li>
      </ul>
    </section>
    <hr />

    <!-- Monster Special Abilities -->
    <section v-if="monster.special_abilities">
      <p
        v-for="ability in monster.special_abilities"
        :key="ability.name"
        class="action-block"
      >
        <span class="font-bold after:content-['.']">{{ ability.name }}</span>
        <md-viewer inline="true" :text="ability.desc" />
      </p>
    </section>

    <!-- Monster Actions -->
    <section v-if="monster.actions">
      <h2>Actions</h2>
      <ul>
        <li
          v-for="action in monster.actions"
          :key="action.name"
          class="after:content-[': '] my-1"
        >
          <span class="font-bold">{{ action.name }}. </span>
          <md-viewer inline="true" :text="action.desc" />
        </li>
      </ul>
    </section>

    <!-- Monster Bonus Actions -->
    <section v-if="monster.bonus_actions">
      <h2>Actions</h2>
      <ul>
        <li
          v-for="action in monster.bonus_actions"
          :key="action.name"
          class="after:content-[': '] my-1"
        >
          <span class="font-bold">{{ action.name }}. </span>
          <md-viewer inline="true" :text="action.desc" />
        </li>
      </ul>
    </section>

    <!-- Monster Reactions -->
    <section v-if="monster.reactions">
      <h2>Reactions</h2>
      <ul>
        <li
          v-for="action in monster.reactions"
          :key="action.name"
          class="after:content-[': '] my-1"
        >
          <span class="font-bold">{{ action.name }}. </span>
          <md-viewer inline="true" :text="action.desc" />
        </li>
      </ul>
    </section>

    <!-- Monster Legendary Actions -->
    <section v-if="monster.legendary_actions">
      <h2>Legendary Actions</h2>
      <p v-if="monster.legendary_desc" class="text">
        {{ monster.legendary_desc }}
      </p>

      <ul>
        <li
          v-for="action in monster.legendary_actions"
          :key="action.name"
          class="after:content-[': '] my-1"
        >
          <span class="font-bold">{{ action.name }}. </span>
          <md-viewer inline="true" :text="action.desc" />
        </li>
      </ul>
    </section>

    <!-- Monster Mythic Actions -->
    <section v-if="monster.mythic_actions">
      <h2>Mythic Actions</h2>
      <ul>
        <li
          v-for="action in monster.mythic_actions"
          :key="action.name"
          class="after:content-[': '] my-1"
        >
          <span class="font-bold">{{ action.name }}. </span>
          <md-viewer inline="true" :text="action.desc" />
        </li>
      </ul>
    </section>

    <!-- Monster Lair and Lair Actions -->
    <section v-if="monster.lair_actions">
      <h2>Lair Actions</h2>
      <p v-if="monster.lair_desc" class="text">
        {{ monster.lair_desc }}
      </p>
      <ul>
        <li
          v-for="action in monster.lair_actions"
          :key="action.name"
          class="after:content-[': '] my-1"
        >
          <span class="font-bold">{{ action.name }}. </span>
          <md-viewer inline="true" :text="action.desc" />
        </li>
      </ul>
    </section>

    <!-- Monster Description -->
    <section v-if="monster.desc">
      <h2>Description</h2>
      <md-viewer :text="monster.desc" />
    </section>

    <hr />

    <!-- Monster Environments -->
    <section v-if="monster.environments?.length > 0">
      <span class="font-bold">Environments: </span>
      <span
        v-for="environemnt in monster.environments"
        :key="environemnt.id"
        class="text-sm after:content-['.'] [&:not(:last-child)]:after:content-[',_']"
      >
        {{ environemnt }}
      </span>
    </section>

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
  </main>
</template>

<script setup>
const monster = await useFetchArticle({
  slug: useRoute().params.id,
  category: 'monsters',
});

// Helper functions
const calcMod = (score) => Math.floor((score - 10) / 2);
const formatMod = (mod) => (mod >= 0 ? '+' + mod.toString() : mod.toString());

// Collect ability scores, saving throws, &c in one array
const abilites = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
].map((ability) => ({
  name: ability,
  shortName: ability.slice(0, 3),
  score: monster[ability],
  modifier: formatMod(calcMod(monster[ability])),
  save: monster[`${ability}_save`] ?? calcMod(monster[ability]),
}));
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
</style>
