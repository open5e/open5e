<script>
/**
 * CrossLink - An inline link to an Open5e resource. Fetches & displays a
 *   preview of the linked resource when hovered
 *
 * -= PROPS (INPUTS) =-
 * @prop {String} src - The source of the Open5e resource being linked to. The
 *   resources endpoint and key can be extracted from it.
 *
 *
 * -= DEPENDENCIES =-
 * @component LinkPreview – Displays a preview of the linked content.
 * @axios - Fetches API data (TODO: replace /w Vue Query)
 *
 */
</script>

<template>
  <nuxt-link
    v-if="acceptibleTypes.includes(category)"
    :to="url.linkTarget"
    class="group relative"
    @mouseover="loadData"
  >
    <slot />
    <link-preview
      v-if="content"
      :content="content"
      :category="category"
    />
  </nuxt-link>

  <!-- If link markdown is invalid, render a span instead -->
  <span
    v-else
    class="italic"
  ><slot /></span>
</template>

<script setup>
import axios from 'axios';

defineProps({ src: { type: String, default: '' } });

const loading = ref(false);
const content = ref(undefined);
const acceptibleTypes = ref(Object.keys(paramsByType));
const category = ref(
  props.src.split('/').filter(crumb => !['v1', 'v2'].includes(crumb))[0],
);
const slug = ref(
  props.src.split('/').filter(crumb => !['v1', 'v2'].includes(crumb))[1],
);

const url = computed(() => {
  const apiURL = useRuntimeConfig().public.apiUrl;
  const { altFrontEndSubroute, apiEndpoint } = paramsByType[category.value];

  // make sure that category has a recognised endpoint
  if (!apiEndpoint) return { linkTarget: '/' };

  // FE uses section's parent for routing. Update url once data is fetched
  if (content.value && category.value === 'sections') {
    const subroute = content.value.parent.split(' ').join('-').toLowerCase();
    return {
      linkTarget: `/${subroute}/${slug.value}`,
      apiEndpoint: `${apiURL}/sections/${slug.value}`,
    };
  }
  // the url on the front end site might be different to its API endpoint
  return {
    linkTarget: `/${altFrontEndSubroute ?? apiEndpoint}/${slug.value}`,
    apiEndpoint: `${apiURL}/${apiEndpoint}/${slug.value}`,
  };
});

async function loadData() {
  // guard clause so that data is only fetched on initial hover
  if (loading.value || content.value) {
    return;
  }
  loading.value = true;
  const { queryParams } = paramsByType[category.value];
  const res = await axios.get(`${url.value.apiEndpoint}/${queryParams}`);
  content.value = res.data;
}

// Maps tag names from markdown to data required to show links/previews
const defaultQueryParams = '?fields=name,document__title,';
const paramsByType = {
  'armor': {
    apiEndpoint: 'armor',
    queryParams: defaultQueryParams + 'category',
  },
  'backgrounds': {
    apiEndpoint: 'backgrounds',
    queryParams: defaultQueryParams,
  },
  'classes': {
    apiEndpoint: 'classes',
    queryParams: defaultQueryParams,
  },
  'combat': {
    altFrontEndSubroute: 'combat',
    apiEndpoint: 'sections',
    queryParams: defaultQueryParams + 'title',
  },
  'conditions': {
    apiEndpoint: 'conditions',
    queryParams: defaultQueryParams + 'desc',
  },
  'equipment': {
    altFrontEndSubroute: 'equipment',
    apiEndpoint: 'sections',
    queryParams: defaultQueryParams + 'parent',
  },
  'feats': {
    apiEndpoint: 'feats',
    queryParams: defaultQueryParams,
  },
  'gameplay-mechanics': {
    altFrontEndSubroute: 'gameplay-mechanics',
    apiEndpoint: 'sections',
    queryParams: defaultQueryParams + 'parent',
  },
  'magicitems': {
    altFrontEndSubroute: 'magic-items',
    apiEndpoint: 'magicitems',
    queryParams: defaultQueryParams + 'type,rarity,requires_attunement',
  },
  'monsters': {
    apiEndpoint: 'monsters',
    queryParams: defaultQueryParams + 'size,type,challenge_rating',
  },
  'plane': {
    apiEndpoint: 'planes',
    queryParams: defaultQueryParams,
  },
  'races': {
    apiEndpoint: 'races',
    queryParams: defaultQueryParams,
  },
  'running': {
    altFrontEndSubroute: 'running',
    apiEndpoint: 'sections',
    queryParams: defaultQueryParams + 'parent',
  },
  'sections': {
    apiEndpoint: 'sections',
    queryParams: defaultQueryParams + 'parent',
  },
  'spells': {
    apiEndpoint: 'spells',
    queryParams:
      defaultQueryParams
      + 'level,school,casting_time,duration,range,components',
  },
  'spelllist': {
    altFrontEndSubroute: 'spells/by-class',
    apiEndpoint: 'spelllist',
    queryParams: defaultQueryParams,
  },
  'weapons': {
    apiEndpoint: 'weapons',
    queryParams: defaultQueryParams + 'category',
  },
};
</script>
