<!--
  This component is global so that the markdown parser can see it and parse the
  cross-link tags as components. There might be a better way to handle this
-->
<template>
  <nuxt-link
    v-if="acceptibleTypes.includes(category)"
    :to="url"
    class="group relative"
    @mouseover="loadData"
  >
    <slot />
    <link-preview v-if="content" :content="content" :category="category" />
  </nuxt-link>

  <!-- If link markdown is invalid, render a span instead -->
  <span v-else class="italic"><slot /></span>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    src: { type: String, default: '' },
  },

  data() {
    return {
      loading: false,
      content: undefined,
      acceptibleTypes: Object.keys(paramsByType),
      category: this.src
        .split('/')
        .filter((crumb) => !['v1', 'v2'].includes(crumb))[0],
      slug: this.src
        .split('/')
        .filter((crumb) => !['v1', 'v2'].includes(crumb))[1],
    };
  },
  computed: {
    url() {
      const { subroute, endpoint } = paramsByType[this.category];
      if (!endpoint) {
        return '/';
      }
      // the url on the front end site might be different to its API endpoint
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
      const { queryParams } = paramsByType[this.category];
      const apiURL = this.$nuxt.$config.public.apiUrl;
      const res = await axios.get(`${apiURL}${this.src}/${queryParams}`);
      this.content = res.data;
    },
  },
};

// Maps tag names from markdown to data required to show links/previews
const paramsByType = {
  armor: {
    endpoint: 'armor',
    queryParams: '?fields=name,category',
  },
  background: {
    endpoint: 'backgrounds',
    queryParams: '?fields=name,document__title',
  },
  characters: {
    subroute: 'characters',
    endpoint: 'sections',
    queryParams: '?fields=name,parent,document__title',
  },
  class: {
    endpoint: 'classes',
    queryParams: '?fields=name,document__title',
  },
  combat: {
    subroute: 'combat',
    endpoint: 'sections',
    queryParams: '?fields=name,parent,document__title',
  },
  condition: {
    endpoint: 'conditions',
    queryParams: '?fields=name,desc',
  },
  equipment: {
    subroute: 'equipment',
    endpoint: 'sections',
    queryParams: '?fields=name,parent,document__title',
  },
  feat: {
    endpoint: 'feats',
    queryParams: '?fields=name,document__title',
  },
  gameplaymechanic: {
    subroute: 'gameplay-mechanics',
    endpoint: 'sections',
    queryParams: '?fields=name,parent,document__title',
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
  running: {
    subroute: 'running',
    endpoint: 'sections',
    queryParams: '?fields=name,parent,document__title',
  },
  spells: {
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
