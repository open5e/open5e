<template>
  <article class="group absolute top--1 z-10 hidden border border-red bg-fog p-2 text-charcoal group-hover:block dark:bg-charcoal dark:text-fog">
    <p class="mt-0 text-nowrap">
      <span class=" font-serif text-lg text-black dark:text-white">{{ data.name }}</span>
      <span v-if="categoryDisplayName" class="mx-1 font-bold text-red">{{ " | " }}</span>
      <span v-if="categoryDisplayName" class="text-lg">{{ categoryDisplayName }}</span>
    </p>
    <p v-if="subtitle" class="mt-0 text-nowrap text-base">
      {{ subtitle }}
    </p>
    <p class="mt-0 text-nowrap text-sm italic text-granite dark:text-smoke">
      {{ `${category}/${data.key}`.slice(1) }}
    </p>
  </article>
</template>

<script setup lang="ts">
import type { Creature, Class, Item, Open5eData, Spell } from '@/types';

const props = defineProps<{
  data: Open5eData;
  category?: ComputedRef<string> | string;
}>();

const endpointToCategoryDisplayNameMap = {
  '/monsters': 'Monster',
  '/species': 'Species',
  '/classes': 'Class',
  '/spells': 'Spell',
  '/magic-items': 'Magic Item',
  '/equipment': 'Equipment',
  '/': '',
};

const dataType = unref(props?.category ?? '/') as keyof typeof endpointToCategoryDisplayNameMap;

const categoryDisplayName = computed(() => {
  const category = endpointToCategoryDisplayNameMap[dataType];
  if (category) return category;
  if (dataType.includes('classes')) {
    return `${(props.data as Class).subclass_of.name} Subclass`;
  }
  return '';
});

const subtitle = computed<string>(() => {
  if (dataType === '/monsters') {
    const monster = props.data as Creature;
    return `${monster.size.name} ${monster.type.name} (CR ${monster.challenge_rating_text})`;
  }
  if (dataType === '/spells') {
    const spell = props.data as Spell;
    if (spell.level === 0) return `${spell.school.name} Cantrip`;
    return `Level ${spell.level} ${spell.school.name} Spell`;
  }
  if (dataType === '/magic-items') {
    const item = props.data as Item;
    return `${item.category.name}, ${item.rarity.name}`;
  }
  
  return '';
});

</script>

