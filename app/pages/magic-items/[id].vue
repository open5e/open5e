<template>
  <section class="docs-container container">
    <div v-if="item">
      <h1 class="inline">
        {{ item.name }}
      </h1>
      <p>
        <em>
          {{ item.category.name }}, {{ item.rarity?.name ?? 'Rarity unspecified' }}
          <span v-show="item.requires_attunement">
            ({{ 'requires attunement' }})
          </span>
        </em>
        <SourceTag
          v-show="item.document.key"
          :title="item.document.name"
          :text="item.document.key"
        />
      </p>
      <MdViewer :text="item.desc" />
      <p class="text-sm italic">
        Source:
        <a
          target="NONE"
          :href="item.document.permalink"
        >
          {{ item.document.name }}
          <Icon name="heroicons:arrow-top-right-on-square-20-solid" />
        </a>
      </p>
    </div>
    <p v-else>
      Loading...
    </p>
  </section>
</template>

<script setup lang="ts">
const itemId = useQueryParameter('id');
const { data: item } = useFindOne(API_ENDPOINTS.magicitems, itemId);
usePageMetadata({ title: computed(() => item.value?.name) });
</script>
