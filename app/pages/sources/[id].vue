<template>
  <article v-if="document" class="docs-container container">
    <div class="flex align-middle">
      <h1>
        <span>{{ document.display_name }}</span>
        <SourceTag :text="document.key" />
      </h1>
      <p class="ml-2">
        <span> from </span>
        <span class="font-bold">{{ document.publisher.name }}</span>
      </p>
      
    </div>

    <MdViewer :text="document.desc"/>

    <!-- Licensing information -->
    <p>
      <span>Published under the </span>
      <span 
        v-for="(license, index) in document.licenses"
        :key="license.name"
      >
        <template v-if="index > 0"> / </template>
        {{ `${license.name} (${license.key.toUpperCase()})` }}
      </span>
      <span>
        {{ ` ${document.licenses.length > 1 ? 'licenses' : 'license'}.` }}
      </span>
    </p>

    <a
      :href="document.permalink"
      class="text-lg font-bold"
    >
      Learn more
    </a>
  </article>
</template>

<script setup>
const { data: document } = useFindOne(API_ENDPOINTS.documents, useRoute().params.id);

</script>
