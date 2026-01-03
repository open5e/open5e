<template>
  <section v-if="license" class="container">
    <h1>{{ license.name }}</h1>
    <MdViewer :text="license.desc"/>
  </section>
</template>

<script setup lang="ts">
const licenseId = useQueryParameter('id');
const { data: license } = useFindOne(API_ENDPOINTS.licenses, licenseId);
usePageMetadata({ title: computed(() => license.value?.name) });
</script>