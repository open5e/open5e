<!--
  This component is global so that the markdown parser can see it and parse the
  cross-link tags as components. There might be a better way to handle this
-->
<template>
  <nuxt-link
    v-if="acceptibleTypes.includes(category)"
    :to="url.linkTarget"
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
  props: { src: { type: String, default: '' } },

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
      const apiURL = this.$nuxt.$config.public.apiUrl;
      const { altFrontEndSubroute, apiEndpoint } = paramsByType[this.category];

      // make sure that category has a recognised endpoint
      if (!apiEndpoint) {
        return { linkTarget: '/' };
      }

      // FE uses section's parent for routing. Update url once data is fetched
      if (this.content && this.category === 'sections') {
        const subroute = this.content.parent.split(' ').join('-').toLowerCase();
        return {
          linkTarget: `/${subroute}/${this.slug}`,
          apiEndpoint: `${apiURL}/sections/${this.slug}`,
        };
      }
      // the url on the front end site might be different to its API endpoint
      return {
        linkTarget: `/${altFrontEndSubroute ?? apiEndpoint}/${this.slug}`,
        apiEndpoint: `${apiURL}${apiEndpoint}/${this.slug}`,
      };
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
      const res = await axios.get(`${this.url.apiEndpoint}/${queryParams}`);
      this.content = res.data;
    },
  },
};

// Maps tag names from markdown to data required to show links/previews
const defaultQueryParams = '?fields=name,document__title,';
const paramsByType = {
  armor: {
    apiEndpoint: 'armor',
    queryParams: defaultQueryParams + 'category',
  },
  backgrounds: {
    apiEndpoint: 'backgrounds',
    queryParams: defaultQueryParams,
  },
  classes: {
    apiEndpoint: 'classes',
    queryParams: defaultQueryParams,
  },
  combat: {
    altFrontEndSubroute: 'combat',
    apiEndpoint: 'sections',
    queryParams: defaultQueryParams + 'title',
  },
  conditions: {
    apiEndpoint: 'conditions',
    queryParams: defaultQueryParams + 'desc',
  },
  equipment: {
    altFrontEndSubroute: 'equipment',
    apiEndpoint: 'sections',
    queryParams: defaultQueryParams + 'parent',
  },
  feats: {
    apiEndpoint: 'feats',
    queryParams: defaultQueryParams,
  },
  'gameplay-mechanics': {
    altFrontEndSubroute: 'gameplay-mechanics',
    apiEndpoint: 'sections',
    queryParams: defaultQueryParams + 'parent',
  },
  magicitems: {
    altFrontEndSubroute: 'magic-items',
    apiEndpoint: 'magicitems',
    queryParams: defaultQueryParams + 'type,rarity,requires_attunement',
  },
  monsters: {
    apiEndpoint: 'monsters',
    queryParams: defaultQueryParams + 'size,type,challenge_rating',
  },
  plane: {
    apiEndpoint: 'planes',
    queryParams: defaultQueryParams,
  },
  races: {
    apiEndpoint: 'races',
    queryParams: defaultQueryParams,
  },
  running: {
    altFrontEndSubroute: 'running',
    apiEndpoint: 'sections',
    queryParams: defaultQueryParams + 'parent',
  },
  sections: {
    apiEndpoint: 'sections',
    queryParams: defaultQueryParams + 'parent',
  },
  spells: {
    apiEndpoint: 'spells',
    queryParams:
      defaultQueryParams +
      'level,school,casting_time,duration,range,components',
  },
  spelllist: {
    altFrontEndSubroute: 'spells/by-class',
    apiEndpoint: 'spelllist',
    queryParams: defaultQueryParams,
  },
  weapons: {
    apiEndpoint: 'weapons',
    queryParams: defaultQueryParams + 'category',
  },
};
</script>
