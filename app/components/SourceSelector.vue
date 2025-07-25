<template>
  <div>
    <button
      class="group flex w-full cursor-pointer justify-between bg-red-600 p-4 py-2 pr-2 text-left align-middle transition-colors hover:bg-red-400 dark:bg-red-700 dark:hover:bg-red-600"
      @click="showModal = true"
    >
      <div class="mt-0.5">
        <span class="font-semibold">Filter Sources</span>
        <span v-if="documents" class="ml-1 text-sm text-smoke">
          {{ ` [${selectedSourceCount} / ${totalSourceCount}]`}}
        </span>
      </div>
      <Icon
        name="heroicons:pencil-square"
        class="group size-8 rounded-full bg-red-900/25 p-1 text-white"
        aria-hidden="true"
      />
    </button>

    <SourceSelectorModal 
      :show="showModal"
      :documents="documents"
      @close="showModal = false"
    />
  </div>
</template>

<script lang="ts" setup>
const showModal = ref(false);

const { sources } = useSourcesList();

const { data: documents } = useDocuments({
  fields: ['key', 'name', 'publisher', 'gamesystem'].join(','),
  publisher__fields: ['name', 'key'].join(','),
  gamesystem__fields: ['name', 'key'].join(','),
});

const selectedSourceCount = computed(() => sources.value.length);
const totalSourceCount = computed(() => documents.value?.length ?? 0);

</script>
