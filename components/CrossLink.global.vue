<template>
  <nuxt-link :to="url" class="group relative" @mouseover="fetchOnMouseOver">
    {{ title }}
    <article
      v-if="content"
      class="group absolute top--1 hidden h-32 w-64 bg-slate-100 px-3 text-black group-hover:block dark:bg-basalt dark:text-white"
    >
      <p class="group flex justify-center gap-2 uppercase">
        <span class="text-lg font-bold">{{ title }}</span>
      </p>
      <div v-if="resourceType === 'spell'">
        <p class="text-red">{{ content.level }} {{ content.school }} Spell</p>
      </div>
      <p class="justify-self-center pt-0 text-sm text-basalt dark:text-smoke">
        {{ `https://open5e.com${url}` }}
      </p>
    </article>
  </nuxt-link>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    resourceType: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      loading: false,
      content: undefined,
    };
  },
  methods: {
    fetchOnMouseOver: async function () {
      if (this.loading || this.content) {
        return;
      }
      this.loading = true;
      const apiURL = this.$nuxt.$config.public.apiUrl;
      const endpoint = `${this.resourceType}s/${this.title.toLowerCase()}`;
      const params = '?fields=level,school';
      const res = await axios.get(`${apiURL}/${endpoint}/${params}`);
      this.content = res.data;
    },
  },
};
</script>
