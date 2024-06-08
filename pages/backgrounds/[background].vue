<template>
  <main v-if="background" class="docs-container container">
    <section>
      <h1>
        <span>{{ background.name }}</span>
        <source-tag
          :title="background.document__slug"
          :text="background.document__slug"
        />
      </h1>
      <md-viewer :text="background.desc" />
    </section>
    <section>
      <p>
        <b>Skill Proficiencies: </b>
        <span> {{ background.skill_proficiencies }}</span>
      </p>
      <p v-if="background.tool_proficiencies">
        <b>Tool Proficiencies: </b>
        <span> {{ background.tool_proficiencies }}</span>
      </p>
      <p v-if="background.languages">
        <b>Languages: </b>
        <span> {{ background.languages }}</span>
      </p>
      <p>
        <b>Equipment: </b>
        <span> {{ background.equipment }}</span>
      </p>
    </section>
    <section>
      <h2>Feature: {{ background.feature }}</h2>
      <md-viewer :text="background.feature_desc" />
    </section>

    <section>
      <h2>Suggested Characteristics</h2>
      <md-viewer :text="background.suggested_characteristics" />
    </section>
  </main>
  <p v-else>Loading...</p>
</template>

<script setup>
const { data: background } = useFindOne(
  API_ENDPOINTS.backgrounds,
  useRoute().params.background
);
</script>
