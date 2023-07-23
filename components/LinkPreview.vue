<template>
  <article
    class="absolute top--1 z-10 hidden h-max bg-slate-100 px-4 py-3 text-black shadow-md dark:bg-basalt dark:text-white md:group-hover:block"
  >
    <p class="m-0 whitespace-nowrap border-b-2 border-blood pb-1 align-middle">
      <span class="font-serif text-lg font-bold text-blood dark:text-white">
        {{ title }}
      </span>
      <span class="before:mx-2 before:font-bold before:content-['|']">
        {{ subtitle }}
      </span>
    </p>

    <p v-for="item in body" :key="item.title" class="m-0 p-0">
      <span class="font-bold after:mr-1 after:content-[':']">
        {{ item.title }}
      </span>
      <span>{{ item.data }} </span>
    </p>

    <p v-if="content.document__title" class="whitespace-nowrap text-sm italic">
      Source: {{ content.document__title }}
    </p>
  </article>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    type: { type: String, default: '' },
    // eslint-disable-next-line vue/require-prop-types
    content: { default: [] },
  },
  computed: {
    // generate an appropriate subtitle for the resource type
    subtitle() {
      const data = this.content;
      switch (this.type) {
        case 'spell':
          return `${data.level} ${data.school} Spell`;
        case 'monster':
          return `${data.size} ${data.type} CR ${data.challenge_rating}`;
        default:
          return this.type.charAt(0).toUpperCase() + this.type.slice(1);
      }
    },
    body() {
      const data = this.content;
      switch (this.type) {
        case 'spell':
          return [
            { title: 'Casting Time', data: data.casting_time },
            { title: 'Duration', data: data.duration },
            { title: 'Range', data: data.range },
            { title: 'Components', data: data.components },
          ];
        case 'magicitem':
          return [
            `${data.type}, ${data.rarity} ${
              data.requires_attunement ?? '{requires attunement}'
            }`,
          ];
        default:
          return [];
      }
    },
  },
};
</script>

<style></style>
