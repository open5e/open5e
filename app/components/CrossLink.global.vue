<template>

  <!-- If preview data has fetched correctly then url is valid, render as link -->
  <nuxt-link
    v-if="previewData"
    :to="`${topLevelPage}/${key}`"
  >
    <slot />
  </nuxt-link>

  <span v-else class="italic">
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { Item } from '@/types';

const props = defineProps({ src: { type: String, default: '' } });

const [version, endpoint, key] = props.src.split('/');

type CrossLinkEndpoint = 'v2/items/' | 'v2/creatures/' | 'v2/classes/' | 'v2/species/' | 'v2/feats/' | 'v2/spells/';

const versionWithEndpoint = `${version}/${endpoint}/` as CrossLinkEndpoint;

const baseFields = ['name', 'key'];
const queryParametersPerEndpoint = {
  'v2/items/': [...baseFields, 'rarity', 'type'],
  'v2/creatures/': [...baseFields, 'type', 'size'],
  'v2/spells/': [...baseFields, 'level', 'school']
} as Record<CrossLinkEndpoint, string[]>;

// fetch data to use in mouse-over preview
const previewData = computed(() => {
  if (!version || !endpoint || !key) return;
  const { data } = useFindOne(versionWithEndpoint, key, {
    params: {
      fields: (
        queryParametersPerEndpoint[versionWithEndpoint] ?? baseFields
      ).join(',')
    }
  });
  return data.value;
});

const topLevelPage = computed(() => {
  // format top-level page part of URL where it differs from API structure
  if (!previewData.value) return;
  if (versionWithEndpoint === 'v2/items/') {
    return (previewData.value as Item).rarity 
      ? '/magic-items'
      : '/equipment';
  }
  if (versionWithEndpoint === 'v2/creatures/') {
    return '/monsters';
  }

  return '/' + endpoint; // Base case
});
</script>
