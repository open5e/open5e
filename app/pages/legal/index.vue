<template>
  <section>
    <h1>Legal Information</h1>
    <p class="my-2">
      Open5e is a library of material for 5e RPGs published under open licenses.
      Below is a list of all the licenses currently in use in our data-set.
    </p>
    <dl class="mt-2 grid gap-2">
      <div v-for="license in licenses" :key="license.key" class="flex gap-2 border bg-fog px-4 py-2 dark:bg-basalt">
        <dt class="font-bold">
          <NuxtLink :to="`/legal/${license.key}`">
            {{ license.name }}
          </NuxtLink>
        </dt>
        <dd>{{ `(${license.key.toUpperCase()})` }}</dd>
      </div>
    </dl>
  </section>
</template>

<script setup>
const { data: licenses } = useFindMany(API_ENDPOINTS.licenses, {
  fields: ['name', 'key'].join(',')
});
</script>
