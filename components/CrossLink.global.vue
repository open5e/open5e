<template>
  <nuxt-link
    v-if="acceptibleTypes.includes(type)"
    :to="url"
    class="group relative"
    @mouseover="loadData"
  >
    {{ title }}
    <link-preview v-if="content" :content="content" :category="type" />
  </nuxt-link>

  <!-- If link markdown is invalid, render a span instead -->
  <span v-else class="italic">{{ title }}</span>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    title: { type: String, default: '' },
    slug: { type: String, default: '' },
    resourceType: { type: String, default: '' },
    version: { type: String, default: '' },
  },

  data() {
    return {
      loading: false,
      content: undefined,
      acceptibleTypes: Object.keys(paramsByType),
      type: this.resourceType.split('-').join(''), // rmv dashes from prop
    };
  },
  computed: {
    url() {
      const { subroute, endpoint } = paramsByType[this.type];
      if (!endpoint) {
        return '/';
      }
      // link subroute might be different to its API endpoint
      return `/${subroute ?? endpoint}/${this.slug}`;
    },
  },
  methods: {
    loadData: async function () {
      // guard clause so that data is only fetched on initial hover
      if (this.loading || this.content) {
        return;
      }
      this.loading = true;
      const { endpoint, queryParams } = paramsByType[this.type];
      const apiURL = this.$nuxt.$config.public.apiUrl;
      const res = await axios.get(
        `${apiURL}/${endpoint}/${this.slug}/${queryParams}`
      );
      this.content = res.data;
    },
  },
};

// used to map the type of resource passed to the component to details about each api route
const paramsByType = {
  armor: {
    endpoint: 'armor',
    queryParams: '?fields=name,category',
  },
  background: {
    endpoint: 'backgrounds',
    queryParams: '?fields=name,document__title',
  },
  class: {
    endpoint: 'classes',
    queryParams: '',
  },
  condition: {
    endpoint: 'conditions',
    queryParams: '?fields=name,desc',
  },
  feat: {
    endpoint: 'feats',
    queryParams: '?fields=name,document__title',
  },
  magicitem: {
    subroute: 'magic-items',
    endpoint: 'magicitems',
    queryParams: '?fields=name,type,rarity,requires_attunement,document__title',
  },
  monster: {
    endpoint: 'monsters',
    queryParams: '?fields=name,size,type,challenge_rating,document__title',
  },
  plane: {
    endpoint: 'planes',
    queryParams: '?fields=name',
  },
  race: {
    endpoint: 'races',
    queryParams: '?fields=name,document__title',
  },
  rule: {
    endpoint: 'sections',
    queryParams: '?fields=name,document__title',
  },
  spell: {
    endpoint: 'spells',
    queryParams:
      '?fields=name,level,school,casting_time,duration,range,components,document__title',
  },
  weapon: {
    endpoint: 'weapons',
    queryParams: '?field=name,category',
  },
};
</script>
