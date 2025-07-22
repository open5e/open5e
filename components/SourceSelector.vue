<template>
  <div>
    <button
      class="w-full cursor-pointer bg-red-600 px-4 py-2 text-left hover:bg-red-400 dark:bg-red-700 dark:hover:bg-red-600"
      @click="showModal = true"
    >
      <span v-if="documents && no_selected_sources > 0">
        {{ no_selected_sources }} of {{ no_available_sources }} sources
      </span>
      <span
        v-else
        class="after:content-['_']"
      >
        Select Sources
      </span>

      <span v-if="isLoadingData">
        <Icon name="line-md:loading-twotone-loop" />
      </span>
      <span v-else>
        <Icon
          name="heroicons:pencil-square"
          class="size-5 text-white"
          aria-hidden="true"
        />
      </span>
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

const no_selected_sources = computed(() => sources.value.length);

const { data: documents } = useDocuments({
  fields: ['key', 'name', 'publisher', 'gamesystem'].join(','),
  publisher__fields: ['name', 'key'].join(','),
  gamesystem__fields: ['name', 'key'].join(','),
});

const no_available_sources = computed(() => documents.value?.length ?? 0);

const isLoadingData = useIsFetching();
</script>
