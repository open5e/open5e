<template>
  <nuxt-link :to="url" class="group relative" @mouseover="fetchOnMouseOver">
    {{ title }}
    <article
      v-if="content"
      class="absolute top--1 hidden h-max bg-slate-100 px-4 py-3 text-black shadow-md dark:bg-basalt dark:text-white md:group-hover:block"
    >
      <div v-if="resourceType === 'spell'">
        <p
          class="group m-0 mb-1 flex justify-between gap-2 border-b-2 border-blood pb-1 align-middle"
        >
          <span
            class="font-serif text-lg font-bold tracking-wide text-blood dark:text-white"
          >
            {{ title }}
          </span>

          <span
            class="block whitespace-nowrap before:mr-2 before:font-bold before:content-['|']"
          >
            {{ content.level }} {{ content.school }} Spell
          </span>
        </p>

        <div>
          <p
            v-for="item in [
              { title: 'Casting Time', body: content.casting_time },
              { title: 'Duration', body: content.duration },
              { title: 'Range', body: content.range },
              { title: 'Components', body: content.components },
            ]"
            :key="item.title"
            class="my-0 py-0"
          >
            <span class="font-bold after:mr-1 after:content-[':']">
              {{ item.title }}
            </span>
            <span>{{ item.body }}</span>
          </p>
        </div>
      </div>
    </article>
  </nuxt-link>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    title: { type: String, default: '' },
    slug: { type: String, default: '' },
    resourceType: { type: String, default: undefined },
  },
  data() {
    return {
      url: `/${paramsByType[this.resourceType].endpoint}/${this.slug}`,
      loading: false,
      content: undefined,
    };
  },
  methods: {
    fetchOnMouseOver: async function () {
      // only fetch on initial hover
      if (this.loading || this.content) {
        return;
      }
      this.loading = true;
      const { endpoint, params } = paramsByType[this.resourceType];
      const apiURL = this.$nuxt.$config.public.apiUrl;
      const res = await axios.get(
        `${apiURL}/${endpoint}/${this.slug}/${params}`
      );
      this.content = res.data;
    },
  },
};

// used to map the type of resource passed to the component to details about each api route
const paramsByType = {
  armor: {
    endpoint: 'armor',
    params: '?fields=name,category',
  },
  background: {
    endpoint: 'backgrounds',
    params: '?fields=name,document__title',
  },
  class: {
    endpoint: 'classes',
    params: '?fields=name',
  },
  condition: {
    endpoint: 'conditions',
    params: '?fields=name,desc',
  },
  feat: {
    endpoint: 'feats',
    params: '?fields=name,document__title',
  },
  magicitem: {
    endpoint: 'magicitem',
    params: '?fields=name,type,rarity,requires_attunement',
  },
  monster: {
    endpoint: 'monsters',
    params: '?fields=name,size,type,challenge_rating,document__title',
  },
  planes: {
    endpoint: 'planes',
    params: '?fields=name',
  },
  section: {
    endpoint: 'sections',
    params: '?fields=name,parent,document__title',
  },
  spell: {
    endpoint: 'spells',
    params: '?fields=name,level,school,casting_time,duration,range,components',
  },
  weapon: {
    endpoint: 'weapons',
    params: '?field=name,category',
  },
};
</script>
