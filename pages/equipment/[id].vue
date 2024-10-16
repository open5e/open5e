<template>
  <section class="docs-container container">
    <div v-if="item">
      <h1 class="inline">{{ item.name }}</h1>

      <p class="flex gap-2">
        <span>{{ item.category.name }}</span>
        <span v-if="parseFloat(item.weight) > 0" class="before:content-['_|_']">
          {{ formatWeight(item.weight) }}
        </span>
        <span v-if="parseFloat(item.cost) > 0" class="before:content-['_|_']">
          {{ formatCost(item.cost) }}
        </span>
      </p>

      <p class="text-sm italic">
        Source:
        <a target="NONE" :href="item.document.permalink">
          {{ item.document.name }}
          <Icon name="heroicons:arrow-top-right-on-square-20-solid" />
        </a>
      </p>
    </div>
    <p v-else>Loading...</p>
  </section>
</template>

<script setup>
const { data: item } = useFindOne(
  API_ENDPOINTS.equipment,
  useRoute().params.id,
  { is_magic_item: false, depth: 1 }
);

const formatCost = (input) => {
  const [gold, rest] = input.split('.');
  const [silver, copper] = rest.split('');
  console.log(gold, silver, copper);
  return (
    (parseInt(gold) > 0 ? `${gold} gp` : '') +
    (parseInt(silver) > 0 ? `${silver} sp` : '') +
    (parseInt(copper) > 0 ? `${copper} cp` : '')
  );
};

const formatWeight = (input) => {
  const weight = parseFloat(input);
  if (weight >= 1) return `${weight} lb`;
  return `1 lb for ${1 / weight}`;
};
</script>
