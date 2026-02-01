<template>
  <main v-if="spell">
    <h1>{{ spell.name }}</h1>
    <p  class="italic">
      <span v-if="spell.level == 0">
        {{ `${spell.school.name} Cantrip` }}
      </span>
      <span v-else>
        {{ `Level ${spell.level} ${spell.school.name} Spell` }}
      </span>
      <span v-if="spell.ritual"> (ritual)</span>
      <span v-if="spell.classes.length > 0">
        {{ " (" + spell.classes.map((c) => c.name).join(', ') + ")" }}
      </span>

      <SourceTag
        v-show="spell.document.key"
        :title="spell.document.name"
        :text="spell.document.key"
      />
    </p>

    <section class="my-4">
      <p class="my-0 grid grid-cols-[10rem,_1fr]">
        <span class="font-bold">Casting Time: </span>
        <span class="capitalize">{{ spell.casting_time }}</span>
      </p>
      <p class="my-0 grid grid-cols-[10rem,_1fr]">
        <span class="font-bold">Range: </span>
        <span class="capitalize">{{ spell.range_text }}</span>
      </p>
      <p class="my-0 grid grid-cols-[10rem,_1fr]">
        <span class="font-bold">Duration: </span>
        <span class="capitalize">{{
          spell.concentration 
            ? `Concentration, up to ${spell.duration}`
            : spell.duration
          }}
        </span>
      </p>
      <p class="my-0 grid grid-cols-[10rem,_1fr]">
        <span class="font-bold">Components: </span>
        <span>
          <span>
            {{ formatComponents(spell.verbal, spell.somatic, spell.material) }}
          </span>
          <b v-if="spell.material_consumed">*</b>
          <span v-if="spell.material_specified" class="text-slate-600 dark:text-slate-300"
          >
            ({{ spell.material_specified }})
          </span>
        </span>
      </p>
    </section>

    <section>
      <MdViewer
        :text="spell.desc"
        :use-roller="true"
      />
    </section>

    <section v-if="spell.higher_level" class="mt-4 ">
      <h2 class="inline border-b-0 text-base font-bold no-underline">
        {{ spell.level > 0 ? "Using a High-Level Spell Slot: " : "Cantrip Upgrade: " }}
      </h2>
      <MdViewer :text="spell.higher_level" :inline="true" />
    </section>

    <p class="text-sm italic">
      <span>Source: </span>
      <NuxtLink :to="`/sources/${spell.document.key}`">
        {{ spell.document.name }} by
        {{ spell.document.publisher.name || 'unknown publisher' }}
        <Icon name="heroicons:arrow-top-right-on-square-20-solid" />
      </NuxtLink>
    </p>
  </main>
</template>

<script setup lang="ts">
const spellId = useQueryParameter('id'); 
const { data: spell } = useFindOne(API_ENDPOINTS.spells, spellId);

usePageMetadata({ title: computed(() => spell.value?.name) });

function formatComponents(verbal?: boolean, somatic?: boolean, material?: boolean) {
  return [
    verbal && 'V',
    somatic && 'S',
    material && 'M'
  ].filter(Boolean).join(', ');
}
</script>
