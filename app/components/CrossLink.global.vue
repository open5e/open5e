<template>
  <nuxt-link
    v-if="isValidLink"
    class="group relative inline"
    :to="`${topLevelPage}/${key}`"
    @mouseenter="onHover"
    @focus="onHover"
    @mouseleave="clearLinkPreviewState"
    @blur="clearLinkPreviewState"
  >
    <span class="z-50"><slot /></span>
  </nuxt-link>
  <span v-else><slot /></span>
</template>

<script setup lang="ts">
import type { Class, MagicItem, Open5eData } from '@/types';
const { linkPreviewState, clearLinkPreviewState } = useLinkPreview();

const props = defineProps<{ to?: string }>();

const parsedTo = computed(() => (props.to ?? '').split('/').filter(Boolean).slice(-3));
const version = computed(() => parsedTo.value[0]);
const endpoint = computed(() => parsedTo.value[1]);
const key = computed(() => parsedTo.value[2]);

const isValidLink = computed(() => Boolean(version.value && endpoint.value && key.value));

type CrossLinkEndpoint = 'v2/items/' | 'v2/creatures/' | 'v2/classes/' | 'v2/species/' | 'v2/feats/' | 'v2/spells/';

const versionWithEndpoint = `${version.value}/${endpoint.value}/` as CrossLinkEndpoint;

// generate query parameters for each endpoint to get correct data for preview
const queryParameters = generateQueryParameter(versionWithEndpoint);

const onHover = async () => {
  if (!readyToFetch.value) readyToFetch.value = true;
  else linkPreviewState.value = {
    data: previewData.value as Open5eData,
    category: topLevelPage.value
  };
};

const readyToFetch = ref(false);

const previewQueryParameter = { ...queryParameters, enabled: readyToFetch };

const { data } = isValidLink.value
  ? useFindOne(versionWithEndpoint, key, previewQueryParameter)
  : { data: ref(null) };

watch(data, () => {
  linkPreviewState.value = {
    data: previewData.value as Open5eData,
    category: topLevelPage.value
  };
});

const previewData = computed(() => {
  if (!data || !data?.value) return;
  return data.value;
});

// format top-level page part of URL where it differs from API structure
const topLevelPage = computed(() => {
  if (versionWithEndpoint === 'v2/items/') {
    return (data.value as MagicItem)?.rarity 
      ? '/magic-items'
      : '/equipment';
  }
  if (versionWithEndpoint === 'v2/classes/') {
    if (!data.value) return '/classes'; // default if data is loading
    const subclassOf = (data.value as Class).subclass_of;
    return subclassOf ? '/classes/' + subclassOf.key : '/classes';
  }
    
  if (versionWithEndpoint === 'v2/creatures/') return '/monsters';
  
  return '/' + endpoint.value; // Base case
});

function generateQueryParameter(endpoint: CrossLinkEndpoint) {
  const baseFields = ['name', 'key', 'document'];
  const fieldsPerEndpoint = {
    'v2/items/': [...baseFields, 'rarity', 'category'],
    'v2/creatures/': [...baseFields, 'type', 'size', 'challenge_rating'],
    'v2/spells/': [...baseFields, 'level', 'school'],
    'v2/classes/': [...baseFields, 'subclass_of'],
  } as Record<CrossLinkEndpoint, string[]>;

  // create query params structure here to keep useFindOne call readable
  return {
    params: {
      fields: (fieldsPerEndpoint[endpoint] ?? baseFields).join(',')
    }
  };
}
</script>
