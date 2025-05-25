<template>
  <main
    v-if="subclassData"
    class="docs-container container"
  >
    <h1>{{ subclassData.name }}</h1>
    <!-- CLASS ABILITIES -->
    <section>
      <ul v-if="features.length > 0">
        <li
          v-for="feature in features"
          :key="feature.key"
        >
          <h3>{{ feature.name }}</h3>
          <md-viewer
            :text="feature.desc"
            :header-level="3"
          />
        </li>
      </ul>
    </section>
  </main>

  <p v-else>
    Loading...
  </p>
</template>

<script setup>
const { data: subclassData } = useFindOne(
  API_ENDPOINTS.classes,
  useRoute().params.subclass,
  {
    params: {
      is_subclass: true,
      subclass_of: useRoute().params.className,
      fields: ['name', 'key', 'features'].join(','),
    },
  },
);

const features = computed(() => {
  const features = subclassData.value.features;
  if (!features) return [];
  return [...features].sort(
    (a, b) => a.gained_at[0].level - b.gained_at[0].level,
  );
});
</script>
