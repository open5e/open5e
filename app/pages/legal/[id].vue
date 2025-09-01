<template>
  <section v-if="license" class="container">
    <h1>{{ license.name }}</h1>
    <MdViewer :text="license.desc"/>
  </section>
</template>

<script setup>

const { data: license } = useFindOne(API_ENDPOINTS.licenses, useRoute().params.id);
</script>