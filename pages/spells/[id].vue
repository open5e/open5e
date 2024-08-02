<template>
  <section v-if="spell" class="docs-container container">
    <h1>{{ spell.name }}</h1>
    <p>
      <span class="italic">{{ `${spell.level} ${spell.school}` }}</span>
      <span v-if="spell.ritual === 'yes'"> (ritual)</span>
      <span> | {{ spell.dnd_class }} </span>
      <source-tag
        v-show="spell.document__slug"
        :title="spell.document__title"
        :text="spell.document__slug"
      />
    </p>
    <p><label class="font-bold">Range:</label> {{ spell.range }}</p>
    <p>
      <label class="font-bold">Casting Time:</label> {{ spell.casting_time }}
    </p>
    <p>
      <label class="font-bold">Duration: </label>
      <span v-if="spell.concentration === 'yes'">
        Concentration, up to {{ spell.duration }}
      </span>
      <span v-else>{{ spell.duration }}</span>
    </p>
    <p>
      <label class="font-bold">Components: </label>
      <span>{{ spell.components }}</span>
      <span v-if="spell.material" class="font-medium text-slate-600">
        ({{ spell.material.replace(/\.$/, '') }})
        <!-- Removes trailing preiod -->
      </span>
    </p>
    <md-viewer :text="spell.desc" :use-roller="true" />
    <p v-if="spell.higher_level">
      <label class="font-bold">At higher levels:</label>
      <md-viewer :text="spell.higher_level" />
    </p>
    <p class="text-sm italic">
      Source:
      <a target="NONE" :href="spell.document__url">
        {{ spell.document__title }}
        <Icon name="heroicons:arrow-top-right-on-square-20-solid" />
      </a>
    </p>
  </section>
  <section v-else class="docs-container container">Loading...</section>
</template>

<script setup>
const { data: spell } = useFindOne(API_ENDPOINTS.spells, useRoute().params.id);
</script>
