<template>
  <modal-dialog>
    <slot>
      <div class="flex w-full justify-between border-b-4 border-red-400">
        <h2 class="mt-0 pb-2">Select Sources</h2>
        <div class="serif font-bold">
          <button
            class="px-2 py-1 text-blood hover:text-red-800 dark:hover:text-red-400"
            @click="selectAll()"
          >
            All
          </button>
          <button
            class="px-2 py-1 text-granite hover:text-basalt dark:hover:text-smoke"
            @click="deselectAll()"
          >
            None
          </button>
        </div>
      </div>
      <div class="mt-2">
        <fieldset>
          <legend class="sr-only">Source Selection</legend>
          <div
            v-for="(publications, organization, index) in groupedDocuments"
            :key="index"
            class="space-y-1"
          >
            <h3 class="mt-2">{{ organization }}</h3>
            <div
              v-for="document in publications"
              :key="document.slug"
              class="relative flex items-start"
            >
              <div class="flex h-6 items-center">
                <input
                  :id="document.slug"
                  v-model="selectedSources"
                  :name="document.slug"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-blue-600 accent-blood focus:ring-blue-600"
                  :value="document.slug"
                />
              </div>
              <div class="ml-3 text-sm leading-6">
                <label
                  :for="document.slug"
                  class="font-medium text-gray-900 dark:text-white"
                >
                  {{ document.title }}
                </label>
                <source-tag :title="document.title" :text="document.slug" />
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </slot>
    <template #actions>
      <button
        ref="cancelButtonRef"
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
        @click="closeModal()"
      >
        Cancel
      </button>
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md bg-blood px-3 py-2 text-sm font-semibold text-white shadow-sm ring-offset-2 hover:ring-2 hover:ring-blood focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2"
        @click="saveSelection()"
      >
        Update
      </button>
    </template>
  </modal-dialog>
</template>

<script setup>
import SourceTag from '~/components/SourceTag.vue';
const { sources, setSources } = useSourcesList();
const emit = defineEmits(['close']);

const selectedSources = ref(sources.value);
const { data: documents } = useDocuments();

const groupedDocuments = computed(() => {
  const docs = documents.value ?? [];
  return docs.reduce((grouped, document) => {
    (grouped[document.organization] =
      grouped[document.organization] || []).push(document);
    return grouped;
  }, {});
});

function closeModal() {
  console.log(groupedDocuments);
  emit('close'); // emits a 'close' event to the parent component
}
function saveSelection() {
  setSources(selectedSources.value);
  closeModal();
}

function selectAll() {
  selectedSources.value = documents.value.map((doc) => doc.slug);
}

function deselectAll() {
  selectedSources.value = [];
}
</script>
