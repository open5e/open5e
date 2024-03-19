<template>
  <!-- Monster summary includes mini statblock -->
  <div v-if="result.route == 'monsters/'">
    <p>
      <nuxt-link
        tag="a"
        :params="{ id: result.slug }"
        :to="`/${result.route}${result.slug}`"
        class="font-bold"
      >
        {{ result.name }}
      </nuxt-link>
      <span>{{ ` CR ${result.challenge_rating} | ` }} </span>
      <em>{{ `${result.hit_points}hp, AC ${result.armor_class}` }}</em>
      <source-tag
        v-if="result.document_slug !== 'wotc-srd'"
        :title="result.document_title"
        :text="result.document_slug"
      />
    </p>
    <stat-bar
      class="mt-1 block border-t pt-1"
      :stats="{
        str: result.strength,
        dex: result.dexterity,
        con: result.constitution,
        int: result.intelligence,
        wis: result.wisdom,
        cha: result.charisma,
      }"
    />
  </div>

  <!-- Spells including basic spell info -->
  <div v-else-if="result.route == 'spells/'">
    <nuxt-link
      tag="a"
      :params="{ id: result.slug }"
      :to="`/${result.route}${result.slug}`"
      class="font-bold"
    >
      {{ result.name }}
    </nuxt-link>
    {{ `${result.school} spell | ${result.dnd_class}` }}
    <source-tag
      v-if="result.document_slug !== 'wotc-srd'"
      :title="result.document_title"
      :text="result.document_slug"
    />
    <p v-html="result.highlighted" />
  </div>

  <!-- Result summary for magic items -->
  <div v-else-if="result.route == 'magicitems/'">
    <nuxt-link
      tag="a"
      :params="{ id: result.slug }"
      :to="`/magic-items/${result.slug}`"
      class="font-bold"
    >
      {{ result.name }}
    </nuxt-link>
    {{ `${result.type}, ${result.rarity}` }}
    <source-tag
      v-if="result.document_slug !== 'wotc-srd'"
      :title="result.document_title"
      :text="result.document_slug"
    />
    <p v-html="result.highlighted" />
  </div>

  <!-- Result summary for everything else -->
  <div v-else>
    <nuxt-link
      tag="a"
      :params="{ id: result.slug }"
      :to="`/${result.route}${result.slug}`"
      class="font-bold"
    >
      {{ result.name }}
    </nuxt-link>
    <source-tag
      v-if="result.document_slug !== 'wotc-srd'"
      :title="result.document_title"
      :text="result.document_slug"
    />
    <p v-html="result.highlighted" />
  </div>
</template>

<script setup>
defineProps({
  result: {
    type: Object,
    default: () => {},
  },
});
</script>
