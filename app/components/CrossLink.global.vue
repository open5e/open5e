<template>

  <!-- If preview data has fetched correctly then url is valid, render as link -->
  <nuxt-link
    v-if="previewData"
    class="group relative"
    :to="`${topLevelPage}/${key}`"
  >
    <slot />
    <LinkPreview :data="previewData" :category="topLevelPage" />
  </nuxt-link>

  <span v-else class="italic">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { Class, Item } from '@/types';

const props = defineProps({ src: { type: String, default: '' } });

const [version, endpoint, key] = props.src.split('/');

type CrossLinkEndpoint = 'v2/items/' | 'v2/creatures/' | 'v2/classes/' | 'v2/species/' | 'v2/feats/' | 'v2/spells/';

const versionWithEndpoint = `${version}/${endpoint}/` as CrossLinkEndpoint;

const baseFields = ['name', 'key', 'document'];
const queryParametersPerEndpoint = {
  'v2/items/': [...baseFields, 'rarity', 'category'],
  'v2/creatures/': [...baseFields, 'type', 'size', 'challenge_rating_text'],
  'v2/spells/': [...baseFields, 'level', 'school'],
  'v2/classes/': [...baseFields, 'subclass_of'],
} as Record<CrossLinkEndpoint, string[]>;

const { data } = version && endpoint && key 
  ? useFindOne(versionWithEndpoint, key, {
    params: {
      fields: (
        queryParametersPerEndpoint[versionWithEndpoint] ?? baseFields
      ).join(',')
    }
  })
  : { data: ref(null) };

const previewData = computed(() => data.value);

const topLevelPage = computed(() => {
  // format top-level page part of URL where it differs from API structure
  if (!previewData.value) return;
  if (versionWithEndpoint === 'v2/items/') {
    return (previewData.value as Item).rarity 
      ? '/magic-items'
      : '/equipment';
  }
  if (versionWithEndpoint === 'v2/classes/') {
    const subclassOf = (previewData.value as Class).subclass_of;
    if (!subclassOf) return '/classes';
    return '/classes/' + subclassOf.key;
  }
    
  if (versionWithEndpoint === 'v2/creatures/') {
    return '/monsters';
  }
  return '/' + endpoint; // Base case
});
</script>
