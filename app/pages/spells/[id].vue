<template>
  <section
    v-if="spell"
    class="docs-container container"
  >
    <h1>{{ spell.name }}</h1>
    <p>
      <span
        v-if="spell.level == 0"
        class="italic"
      >
        {{ `${spell.school.name} cantrip` }}
      </span>
      <span
        v-else
        class="italic"
      >
        {{ `Level ${spell.level} ${spell.school.name} spell` }}
      </span>
      <span v-if="spell.ritual"> (ritual)</span>
      <span
        v-if="spell.classes.length > 0"
        class="before:content-['_|_']"
      >
        {{ spell.classes.map((c) => c.name).join(', ') }}
      </span>
      <SourceTag
        v-show="spell.document.key"
        :title="spell.document.name"
        :text="spell.document.key"
      />
    </p>
    <p><label class="font-bold">Range:</label> {{ spell.range_text }}</p>
    <p>
      <label class="font-bold">Casting Time:</label> {{ spell.casting_time }}
    </p>
    <p>
      <label class="font-bold">Duration: </label>
      <span v-if="spell.concentration">
        Concentration, up to {{ spell.duration }}
      </span>
      <span v-else>{{ spell.duration }}</span>
    </p>
    <p>
      <label class="font-bold">Components: </label>
      <span>
        {{ formatComponents(spell.verbal, spell.somatic, spell.material) }}
        <b v-if="spell.material_consumed">*</b>
      </span>
      <span
        v-if="spell.material_specified"
        class="font-medium text-slate-600 dark:text-slate-300"
      >
        ({{ spell.material_specified }})
        <!-- Removes trailing preiod -->
      </span>
    </p>
    <MdViewer
      :text="spell.desc"
      :use-roller="true"
    />
    <p v-if="spell.higher_level">
      <label class="font-bold">At higher levels:</label>
      <MdViewer :text="spell.higher_level" />
    </p>
    <p class="text-sm italic">
      Source:
      <a
        target="NONE"
        :href="spell.document.url"
      >
        {{ spell.document.name }} by
        {{ spell.document.publisher.name || 'unknown publisher' }}
        <Icon name="heroicons:arrow-top-right-on-square-20-solid" />
      </a>
    </p>
  </section>
  <section
    v-else
    class="docs-container container"
  >
    Loading...
  </section>
</template>

<script setup>
const { data: spell } = useFindOne(API_ENDPOINTS.spells, useRoute().params.id, {
  relatedFields: ['document', 'document.publisher'],
});

function formatComponents(verbal, somatic, material) {
  const components = [];
  if (verbal) components.push('V');
  if (somatic) components.push('S');
  if (material) components.push('M');
  return `${components.join(', ')}`;
}
</script>
