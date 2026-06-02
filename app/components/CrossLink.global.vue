<template>

  <!-- If preview data has fetched correctly then url is valid, render as link -->
  <nuxt-link
    class="group relative"
    :to="`${topLevelPage}/${key}`"
    @mouseenter="onHover"
  >
    <slot />
    <LinkPreview :data="previewData" :category="topLevelPage" />
  </nuxt-link>
</template>

<script setup lang="ts">
import type { Class, Item } from '@/types';

const { to = '' } = defineProps<{ to?: string }>();

const [version, endpoint, key] = to.split('/');

type CrossLinkEndpoint = 'v2/items/' | 'v2/creatures/' | 'v2/classes/' | 'v2/species/' | 'v2/feats/' | 'v2/spells/';

const versionWithEndpoint = `${version}/${endpoint}/` as CrossLinkEndpoint;

// generate query parameters for each endpoint to get correct data for preview

const baseFields = ['name', 'key', 'document'];
const queryParametersPerEndpoint = {
  'v2/items/': [...baseFields, 'rarity', 'category'],
  'v2/creatures/': [...baseFields, 'type', 'size', 'challenge_rating_text'],
  'v2/spells/': [...baseFields, 'level', 'school'],
  'v2/classes/': [...baseFields, 'subclass_of'],
} as Record<CrossLinkEndpoint, string[]>;

// create query params structure here to keep useFindOne call readable
const queryParameters = {
  params: {
    fields: (
      queryParametersPerEndpoint[versionWithEndpoint] ?? baseFields
    ).join(',')
  }
};

const onHover = async () => readyToFetch.value = true;

const readyToFetch = ref(false);

const { data } = version && endpoint && key 
  ? useFindOne(versionWithEndpoint, key, {
    ...queryParameters,
    enabled: readyToFetch,
  })
  : { data: ref(null) };

const previewData = computed(() => {
  if (!data || !data?.value) return;
  return data.value;
});

// format top-level page part of URL where it differs from API structure
const topLevelPage = computed(() => {
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
