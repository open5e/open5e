<template>
  <section class="docs-container container">
    <div v-if="item">
      <h1 class="inline">
        {{ item.name }}
      </h1>
      <p>
        <em>
          {{ item.type }}, {{ item.rarity }}
          <span v-show="item.requires_attunement">
            ({{ item.requires_attunement }})
          </span>
        </em>
        <source-tag
          v-show="item.document__slug"
          :title="item.document__title"
          :text="item.document__slug"
        />
      </p>
      <md-viewer :text="item.desc" />
      <p class="text-sm italic">
        Source:
        <a target="NONE" :href="item.document__url">
          {{ item.document__title }}
          <Icon name="heroicons:arrow-top-right-on-square-20-solid" />
        </a>
      </p>
    </div>
    <p v-else>Loading...</p>
  </section>
</template>

<script setup>
const { data: item } = useFindOne(
  API_ENDPOINTS.magicitems,
  useRoute().params.id
);
</script>
