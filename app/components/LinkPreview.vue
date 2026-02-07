<template>
  <article
    v-if="data"
    class="group absolute top--1 z-10 hidden border border-red bg-fog px-3 py-2 text-charcoal group-hover:block dark:bg-charcoal dark:text-fog"
  >
    <p class="my-0 text-nowrap">
      <span class=" font-serif text-lg text-black dark:text-white">{{ data?.name }}</span>
      <span v-if="categoryDisplayName" class="mx-1 font-bold text-red">{{ " | " }}</span>
      <span v-if="categoryDisplayName" class="text-lg">{{ categoryDisplayName }}</span>
    </p>
    <p v-if="subtitle" class="m-0 text-nowrap text-base">
      {{ subtitle }}
    </p>
    <p class="mt-0 text-nowrap text-xs text-smoke dark:text-granite">
      {{ `${(API_URL ?? '') + category}/${data.key}` }}
    </p>
  </article>
  <article v-else />
</template>

<script setup lang="ts">
import type { Creature, Item, Open5eData, Spell } from '@/types';

const API_URL = useRuntimeConfig().public.apiUrl;

const props = defineProps<{
  data?: Open5eData;
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
} as const;

type Endpoint = keyof typeof endpointToCategoryDisplayNameMap;

const getCategoryFromPath = (path: string): Endpoint | null => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized in endpointToCategoryDisplayNameMap 
    ? normalized as Endpoint 
    : null;
};

const formatSubclassName = (classPath: string): string => {
  const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1);
  const subclassName = classPath.split('_').map(capitalize)[1];
  return `${subclassName} Subclass`;
};

const categoryDisplayName = computed(() => {
  const category = unref(props.category ?? '');

  const directMatch = getCategoryFromPath(category);
  if (directMatch) return endpointToCategoryDisplayNameMap[directMatch];

  const segments = category.split('/').filter(Boolean);
  if (segments[0] === 'classes' && segments[1]) {
    return formatSubclassName(segments[1]);
  }
  return '';
});


const formatMonsterSubtitle = (monster: Creature) => {
  return `${monster.size.name} ${monster.type.name}, CR ${monster.challenge_rating_text}`;
};

const formatSpellSubtitle = (spell: Spell) => {
  if (spell.level === 0) return `${spell.school.name} Cantrip`;
  return `Level ${spell.level} ${spell.school.name} Spell`;
};

const formatMagicItemSubtitle = (item: Item) => {
  return `${item.category.name}, ${item.rarity.name}`;
};

const subtitle = computed<string>(() => {
  const category = unref(props?.category ?? '/') as Endpoint;
  
  if (category === '/monsters') return formatMonsterSubtitle(props.data as Creature);
  if (category === '/spells') return formatSpellSubtitle(props.data as Spell);
  if (category === '/magic-items') return formatMagicItemSubtitle(props.data as Item);
  
  return '';
});

</script>

