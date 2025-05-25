<template>
  <main
    v-if="background"
    class="docs-container container"
  >
    <section>
      <div>
        <h1 class="inline">
          {{ background.name }}
        </h1>
        <source-tag
          class="inline"
          :title="background.document.name"
          :text="background.document.key"
        />
      </div>
      <md-viewer :text="background.desc" />
    </section>

    <!-- List of proficiencies & other short, mechanical benefits -->
    <dl class="mt-2">
      <div
        v-for="benefit in benefits.proficiencies"
        :key="benefit.name"
      >
        <dt class="inline font-bold">
          {{ benefit.name }}
        </dt>
        <dd class="inline before:content-['._']">
          {{ benefit.desc }}
        </dd>
      </div>
    </dl>

    <!-- List of background features -->
    <ul>
      <li
        v-for="benefit in benefits.features"
        :key="benefit.name"
      >
        <h2>{{ `Feature: ${benefit.name}` }}</h2>
        <md-viewer :text="benefit.desc" />
      </li>
    </ul>
    <hr />

    <!-- List of background flavour, rollable tables, etc. -->
    <ul>
      <li
        v-for="benefit in benefits.flavour"
        :key="benefit.name"
      >
        <h3>
          <span
            v-if="benefit.type === 'feature'"
            class="mr-2 capitalize after:content-[':_']"
          >
            {{ benefit.type }}
          </span>
          <span>{{ benefit.name }}</span>
        </h3>
        <md-viewer :text="benefit.desc" />
      </li>
    </ul>
  </main>
  <p v-else>
    Loading...
  </p>
</template>

<script setup>
const { data: background } = useFindOne(
  API_ENDPOINTS.backgrounds,
  useRoute().params.id,
);

// sort benefits into different sections
// different sections will be rendered to different parts of the page
const benefits = computed(() => {
  if (!background?.value) return {};
  const [proficiencies, features, flavour] = background.value.benefits.reduce(
    (acc, benefit) => {
      // sort profs, langs, equipment, &c into 'proficiencies'
      if (
        [
          'equipment',
          'language',
          'skill_proficiency',
          'tool_proficiency',
          'ability_score',
        ].includes(benefit.type)
      ) {
        return [[...acc[0], benefit], acc[1], acc[2]];
      }

      // sort features into 'features'
      if (benefit.type === 'feature') {
        return [acc[0], [...acc[1], benefit], acc[2]];
      }

      // base-case: sort remaining benefits into 'flavour'
      return [acc[0], acc[1], [...acc[2], benefit]];
    },
    [[], [], []],
  );
  return { proficiencies, features, flavour };
});
</script>
