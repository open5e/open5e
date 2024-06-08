<template>
  <ModalDialog>
    <slot>
      <h2 class="mt-0 border-b-4 border-red-400 pb-2">Select Sources</h2>
      <div class="mt-2">
        <fieldset>
          <legend class="sr-only">Source Selection</legend>

          <div class="space-y-3">
            <div
              v-for="(group, organization) in groupedDocuments"
              :key="organization"
            >
              <h3 class="mt-2">{{ organization }}</h3>
              <div
                v-for="document in group"
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
                    >{{ document.title }}</label
                  >
                  <SourceTag
                    :title="document.title"
                    :text="document.slug"
                  ></SourceTag>
                </div>
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
  </ModalDialog>
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
  emit('close'); // emits a 'close' event to the parent component
}
function saveSelection() {
  setSources(selectedSources.value);
  closeModal();
}
</script>
