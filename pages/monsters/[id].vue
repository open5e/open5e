<template>
  <section v-if="monster" class="docs-container container">
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

    <h4>Armor Class</h4>
    <span>{{ `${monster.armor_class}, ${monster.armor_desc}` }}</span>
    <p></p>
    <h4>Hit Points</h4>
    <span>{{ `${monster.hit_points} (${monster.hit_dice})` }}</span>
    <p></p>
    <h4>Speed</h4>
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

    <!-- ABILITY SCORES -->
    <div class="space-between max-w-96 flex items-center gap-4">
      <div
        v-for="ability in attributes"
        :key="ability.name"
        class="text-center"
      >
        <h4 class="uppercase">{{ ability.shortName }}</h4>
        <div>{{ `${ability.score} (${formatMod(ability.modifier)})` }}</div>
      </div>
    </div>

    <hr />

    <!-- SAVING THROWS AND ATTRIBUTES-->

    <h4>Saving Throws</h4>
    <span v-for="ability in attributes" :key="ability.name">
      <span class="capitalize before:content-['_']">
        {{ ability.shortName }}
      </span>
      <span class="before:content-['_']"> {{ formatMod(ability.save) }} </span>.
    </span>
    <p></p>
    <h4 v-if="monster.skills" class="after:content-[': '] pr-1">Skills</h4>
    <span
      v-for="(skill, key, index) in monster.skills"
      v-show="key !== 'hover'"
      :key="index"
    >
      {{ key.charAt(0).toUpperCase() + key.slice(1) }}
      <span v-if="skill >= 0">+</span>{{ skill }}.
      <span v-if="index < monster.skills.length - 1">, </span>
    </span>
    <p></p>

    <h4 v-if="monster.damage_vulnerabilities" class="after:content-[': '] pr-1">
      Damage Vulnerabilities
    </h4>
    <span>{{ monster.damage_vulnerabilities }}</span>

    <p></p>
    <h4 v-if="monster.damage_resistances" class="after:content-[': '] pr-1">
      Damage Resistances
    </h4>
    <span>{{ monster.damage_resistances }}</span>

    <p></p>
    <h4 v-if="monster.damage_immunities" class="after:content-[': '] pr-1">
      Damage Immunities
    </h4>
    <span>{{ monster.damage_immunities }}</span>

    <p></p>
    <h4 v-if="monster.senses" class="after:content-[': '] pr-1">Senses</h4>
    <span>{{ monster.senses }}</span>

    <p></p>
    <h4 v-if="monster.languages" class="after:content-[': '] pr-1">
      Languages
    </h4>
    <span>{{ monster.languages }}</span>

    <p></p>
    <h4 v-if="monster.challenge_rating" class="after:content-[': '] pr-1">
      Challenge
    </h4>
    <span><challenge-render :challenge="monster.challenge_rating" /></span>

    <hr />

    <!-- Monster Special Abilities -->

    <h4
      v-for="ability in monster.special_abilities"
      :key="ability.name"
      class="action-block"
    >
      {{ ability.name }}.
    </h4>
    <md-viewer class="inline" :text="ability.desc" />

    <!-- Monster Actions -->
    <h2 v-if="monster.actions">Actions</h2>
    <h4
      v-for="action in monster.actions"
      :key="action.name"
      class="action-block,action-name after:content-[': ']"
    >
      {{ action.name }}.
    </h4>
    <md-viewer class="inline" :text="action.desc" />

    <!-- Monster Bonus Actions -->
    <h2 v-if="monster.bonus_actions">Bonus Actions</h2>
    <h4
      v-for="bonus_action in monster.bonus_actions"
      :key="bonus_action.name"
      class="action-block, action-name after:content-[': ']"
    >
      {{ bonus_action.name }}.
    </h4>
    <md-viewer class="inline" :text="bonus_action.desc" />

    <!-- Monster Reactions -->
    <h2 v-if="monster.reactions">Reactions</h2>
    <h4
      v-for="action in monster.reactions"
      :key="action.name"
      class="action-block, action-name after:content-[': ']"
    >
      {{ action.name }}.
    </h4>
    <md-viewer class="inline" :text="action.desc" />

    <!-- Monster Legendary Actions -->
    <h2 v-if="monster.legendary_actions">Legendary Actions</h2>
    <p v-if="monster.legendary_desc" class="text">
      {{ monster.legendary_desc }}
    </p>

    <h4
      v-for="action in monster.legendary_actions"
      :key="action.name"
      class="action-block, action-name after:content-[': ']"
    >
      {{ action.name }}.
    </h4>
    <md-viewer class="inline" :text="action.desc" />

    <!-- Monster Mythic Actions -->
    <h2 v-if="monster.mythic_actions">Mythic Actions</h2>
    <h4
      v-for="actions in monster.mythic_actions"
      :key="actions.name"
      class="action-block, action-name after:content-[': ']"
    >
      {{ mythic_actions.name }}.
    </h4>
    <md-viewer class="inline" :text="mythic_actions.desc" />

    <!-- Monster Lair and Lair Actions -->
    <h2 v-if="monster.lair_actions">Lair Actions</h2>
    <p v-if="monster.lair_desc" class="text">
      {{ monster.lair_desc }}
    </p>

    <h4
      v-for="action in monster.lair_actions"
      :key="action.name"
      class="action-block, action-name after:content-[': ']"
    >
      {{ action.name }}.
    </h4>
    <md-viewer class="inline" :text="action.desc" />

    <!-- Monster Description -->
    <h2 v-if="monster.desc">Description</h2>
    <p v-if="monster.desc" class="text"><md-viewer :text="monster.desc" /></p>

    <!-- Monster Environments -->
    <hr />

    <h4>Environments:</h4>
    <span
      v-bind:key="item.id"
      v-for="item in monster.environments"
      class="text-sm after:content-['.'] [&:not(:last-child)]:after:content-[',_']"
    >
      {{ item }}
    </span>
    <p></p>

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
  </section>
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
const attributes = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
].map((attribute) => ({
  name: attribute,
  shortName: attribute.slice(0, 3),
  score: monster[attribute],
  modifier: calcMod(monster[attribute]),
  save: monster[`${attribute}_save`] ?? calcMod(monster[attribute]),
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
</style>
