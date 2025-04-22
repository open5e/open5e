<template>
  <section
    v-if="race"
    class="docs-container container"
  >
    <div class="flex items-center">
      <h1 class="inline">
        {{ race.name }}
      </h1>
      <SourceTag
        class="inline"
        :title="race.document.name"
        :text="race.document.key"
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

    <ul v-if="Object.keys(subraces).length > 0">
      <h2>Subraces</h2>
      <li
        v-for="subrace in subraces"
        :key="subrace.key"
      >
        <div class="mt-4 flex items-center">
          <h3 class="mt-0 inline">
            {{ subrace.name }}
          </h3>
          <SourceTag
            class="inline"
            :title="subrace.document.name"
            :text="subrace.document.key"
          />
        </div>
        <MdViewer
          :inline="true"
          :text="subrace.desc"
        />
        <dl>
          <div
            v-for="trait in subrace.traits"
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
const { data: race } = useFindOne(API_ENDPOINTS.races, useRoute().params.id, {
  params: { subrace_of__isnull: true },
});

const { data: subraces } = useFindMany(API_ENDPOINTS.races, {
  subrace_of__key__in: useRoute().params.id,
});

// traits can be ordered here, but the order the API rtns them is already good
const traits = computed(() => unref(race).traits);
</script>
