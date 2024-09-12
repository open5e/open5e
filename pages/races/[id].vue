<template>
  <section v-if="race" class="docs-container container">
    <h1>{{ race.name }}</h1>
    <dt>
      <h2>Traits</h2>
      <div v-for="trait in traits" :key="trait.name" class="my-2">
        <dh class="font-bold after:content-['._']">{{ trait.name }}</dh>
        <dd class="inline">
          <md-viewer :inline="true" :text="trait.desc" />
        </dd>
      </div>
    </dt>

    <ul v-if="Object.keys(subraces).length > 0">
      <h2>Subraces</h2>
      <li v-for="subrace in subraces" :key="subrace.key">
        <h3>{{ subrace.name }}</h3>
        <md-viewer :inline="true" :text="subrace.desc" />
        <dt>
          <div v-for="trait in subrace.traits" :key="trait.name" class="my-2">
            <dh class="font-bold after:content-['._']">{{ trait.name }}</dh>
            <dd class="inline">{{ trait.desc }}</dd>
          </div>
        </dt>
      </li>
    </ul>
  </section>
</template>

<script setup>
const { data: race } = useFindOne(API_ENDPOINTS.races, useRoute().params.id, {
  params: { subrace_of__isnull: true },
});

const { data: subraces } = useFindMany(API_ENDPOINTS.races, {
  subrace_of__key__in: useRoute().params.id,
});

// traits can be ordered here, but the order the API rtns them is already good
const traits = computed(() => unref(race).traits);
</script>
