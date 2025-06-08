<template>
  <section
    v-if="species"
    class="docs-container container"
  >
    <div class="flex items-center">
      <h1 class="inline">
        {{ species.name }}
      </h1>
      <SourceTag
        class="inline"
        :title="species.document.name"
        :text="species.document.key"
      />
    </div>
    <dl>
      <h2>Traits</h2>
      <div
        v-for="trait in traits"
        :key="trait.name"
        class="my-2"
      >
        <dt class="inline font-bold after:content-['._']">
          {{ trait.name }}
        </dt>
        <dd class="inline">
          <MdViewer
            :inline="true"
            :text="trait.desc"
          />
        </dd>
      </div>
    </dl>
    <ul v-if="subspecies.length > 0">
      <h2>Sub-species</h2>
      <li
        v-for="item in subspecies"
        :key="item.key"
      >
        <div class="mt-4 flex items-center">
          <h3 class="mt-0 inline">
            {{ item.name }}
          </h3>
          <SourceTag
            class="inline"
            :title="item.document.name"
            :text="item.document.key"
          />
        </div>
        <MdViewer
          :inline="true"
          :text="item.desc"
        />
        <dl>
          <div
            v-for="trait in species.traits"
            :key="trait.name"
            class="my-2"
          >
            <dt class="inline font-bold after:content-['._']">
              {{ trait.name }}
            </dt>
            <dd class="inline">
              {{ trait.desc }}
            </dd>
          </div>
        </dl>
      </li>
    </ul>
  </section>
</template>

<script setup>
const { data: species } = useFindOne(API_ENDPOINTS.species, useRoute().params.id, {
  params: { subspecies_of__isnull: true },
});

const { data: subspecies } = useFindMany(API_ENDPOINTS.species, {
  subspecies_of__key__in: useRoute().params.id,
});

// traits can be ordered here, but the order the API rtns them is already good
const traits = computed(() => unref(species).traits);
</script>
