<script>
/**
 * LinkPreview - A card that displays detailed information about a specific category of content.
 *
 *
 * -= PROPS (INPUTS) =-
 * @prop {String} category - What type of content the preview is linking to.
 *   Different types of Open5e resources need different data in the preview
 * @prop {Object} content - content to render on the card. varies with category
 *
 */
</script>

<template>
  <article
    class="absolute top--1 z-10 hidden h-max bg-slate-100 px-4 py-3 text-black shadow-md dark:bg-basalt dark:text-white md:group-hover:block"
  >
    <!-- Generate card title from data -->
    <p class="m-0 whitespace-nowrap border-b-2 border-blood pb-1 align-middle">
      <span class="font-serif text-lg font-bold text-blood dark:text-white">
        {{ content.name }}
      </span>
      <span class="before:mx-2 before:font-bold before:content-['|']">
        {{ subtitle }}
      </span>
    </p>

    <!-- Generate card body from data -->
    <p
      v-for="item in body"
      :key="item.title"
      class="m-0 p-0 text-sm"
    >
      <span
        v-if="item.title"
        class="font-bold after:mr-1 after:content-[':']"
      >
        {{ item.title }}
      </span>
      <span>{{ item.data }} </span>
    </p>

    <!-- Card footer -->
    <p
      v-if="content.document__title"
      class="whitespace-nowrap text-sm italic"
    >
      Source: {{ content.document__title }}
    </p>
  </article>
</template>

<script setup>
const props = defineProps({
  category: { type: String, default: '' },
  // eslint-disable-next-line vue/require-prop-types
  content: { default: [] },
});

const subtitle = computed(() => {
  const data = props.content;
  switch (props.category) {
    case 'spells':
      return `${data.level} ${data.school} Spell`;
    case 'monsters':
      return 'Monster';
    case 'magicitems':
      return 'Magic Item';
    case 'conditions':
      return 'Condition';
    case 'feats':
      return 'Feat';
    case 'sections':
    case 'characters':
    case 'combat':
    case 'equipment':
    case 'gameplay-mechanics':
    case 'running':
      return data.parent;
    default:
      return props.category.charAt(0).toUpperCase() + props.category.slice(1);
  }
});

const body = computed(() => {
  const data = props.content;
  switch (props.category) {
    case 'conditions':
      return [{ data: data.desc }];
    case 'spells':
      return [
        { title: 'Casting Time', data: data.casting_time },
        { title: 'Duration', data: data.duration },
        { title: 'Range', data: data.range },
        { title: 'Components', data: data.components },
      ];
    case 'magicitems':
      return [
        {
          data: `${data.type}, ${data.rarity} ${
            data.requires_attunement && '(requires attunement)'
          }`,
        },
      ];
    case 'monsters':
      return [
        { data: `CR ${data.challenge_rating} ${data.type} (${data.size})` },
      ];
    default:
      return [];
  }
});
</script>

<style></style>
