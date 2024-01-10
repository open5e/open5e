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
    <p>
      <span class="font-bold">Armor Class </span>
      <span>{{ `${monster.armor_class}, ${monster.armor_desc}` }}</span>
    </p>
    <p>
      <span class="font-bold">Hit Points </span>
      <span>{{ `${monster.hit_points} (${monster.hit_dice})` }}</span>
    </p>
    <p>
      <span class="pr-1 font-bold">Speed</span>
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

    <!-- ABILITY SCORES -->
    <div class="space-between max-w-96 flex items-center gap-4">
      <div
        v-for="ability in attributes"
        :key="ability.name"
        class="text-center"
      >
        <div class="font-bold uppercase">{{ ability.shortName }}</div>
        <div>{{ `${ability.score} (${formatMod(ability.modifier)})` }}</div>
      </div>
    </div>

    <hr />

    <!-- SAVING THROWS -->
    <p>
      <span class="font-bold">Saving Throws</span>
      <span v-for="ability in attributes" :key="ability.name">
        <span class="capitalize before:content-['_']">
          {{ ability.shortName }}
        </span>
        <span class="before:content-['_']"> {{ formatMod(ability.save) }} </span
        >.
      </span>
    </p>

    <p v-if="monster.skills">
      <span class="after:content-[': '] pr-1 font-bold">Skills</span>
      <span
        v-for="(skill, key, index) in monster.skills"
        v-show="key !== 'hover'"
        :key="index"
      >
        {{ key.charAt(0).toUpperCase() + key.slice(1) }}
        <span v-if="skill >= 0">+</span>{{ skill }}.
        <span v-if="index < monster.skills.length - 1">, </span>
      </span>
    </p>
    <p v-if="monster.damage_vulnerabilities">
      <span class="after:content-[': '] pr-1 font-bold"
        >Damage Vulnerabilities</span
      >
      {{ monster.damage_vulnerabilities }}
    </p>
    <p v-if="monster.damage_resistances">
      <span class="after:content-[': '] pr-1 font-bold"
        >Damage Resistances</span
      >
      {{ monster.damage_resistances }}
    </p>
    <p v-if="monster.damage_immunities">
      <span class="after:content-[': '] pr-1 font-bold">Damage Immunities</span>
      {{ monster.damage_immunities }}
    </p>
    <p v-if="monster.senses">
      <span class="after:content-[': '] pr-1 font-bold">Senses</span>
      {{ monster.senses }}
    </p>
    <p v-if="monster.languages">
      <span class="after:content-[': '] pr-1 font-bold">Languages</span>
      {{ monster.languages }}
    </p>
    <p v-if="monster.challenge_rating">
      <span class="after:content-[': '] pr-1 font-bold">Challenge</span>
      <challenge-render :challenge="monster.challenge_rating" />
    </p>
    <hr />
    <p
      v-for="ability in monster.special_abilities"
      :key="ability.name"
      class="action-block"
    >
      <span class="font-bold">{{ ability.name }}. </span>
      <md-viewer class="inline" :text="ability.desc" />
    </p>
    <h2 v-if="monster.actions">Actions</h2>
    <p
      v-for="action in monster.actions"
      :key="action.name"
      class="action-block"
    >
      <span class="action-name after:content-[': '] font-bold"
        >{{ action.name }}.</span
      >
      <md-viewer class="inline" :text="action.desc" />
    </p>
    <h2 v-if="monster.bonus_actions">Bonus Actions</h2>
    <p
      v-for="bonus_action in monster.bonus_actions"
      :key="bonus_action.name"
      class="action-block"
    >
      <span class="action-name after:content-[': '] font-bold"
        >{{ bonus_action.name }}.</span
      >
      <md-viewer class="inline" :text="bonus_action.desc" />
    </p>
    <h2 v-if="monster.reactions">Reactions</h2>
    <p
      v-for="action in monster.reactions"
      :key="action.name"
      class="action-block"
    >
      <span class="action-name after:content-[': '] font-bold"
        >{{ action.name }}.</span
      >
      <md-viewer class="inline" :text="action.desc" />
    </p>
    <h2 v-if="monster.legendary_actions">Legendary Actions</h2>
    <p v-if="monster.legendary_desc" class="text">
      {{ monster.legendary_desc }}
    </p>
    <p
      v-for="action in monster.legendary_actions"
      :key="action.name"
      class="action-block"
    >
      <span class="action-name after:content-[': '] font-bold"
        >{{ action.name }}.</span
      >
      <md-viewer class="inline" :text="action.desc" />
    </p>

    <!-- Monster Description -->
    <h2 v-if="monster.desc">Description</h2>
    <p v-if="monster.desc" class="text"><md-viewer :text="monster.desc" /></p>

    <!-- Monster Environments -->
    <p class="text-sm after:content-['.']">
      <span class="after:content-[': '] font-bold">Environment: </span>
      <span
        v-bind:key="item.id"
        v-for="item in monster.environments"
        class="text-sm [&:not(:last-child)]:after:content-[',_']"
      >
        {{ item }}
      </span>
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
