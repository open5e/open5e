<template>
  <modal-dialog>
    <slot>
      <!-- Modal menu title bar -->
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

      <fieldset class="mt-1">
        <legend class="sr-only">Source Selection</legend>
        <!-- Organisation -->
        <div
          v-for="(publications, organization, index) in groupedDocuments"
          :key="index"
          class="space-y-0"
        >
          <!-- Organisation Title -->
          <div class="my-1 flex items-center gap-2">
            <h3 class="mt-0 inline-block items-center gap-2">
              {{ organization }}
            </h3>
            <button
              :class="
                selectedSourcesByPublisher(organization)
                  ? 'border-none bg-blood'
                  : 'border-2 bg-white'
              "
              class="size-5 rounded-sm border-gray-500 text-sm font-bold text-white"
              @click="togglePublisher(organization)"
            >
              <span
                v-if="selectedSourcesByPublisher(organization)"
                class="not-sr-only"
              >
                &#10003;
              </span>
              <span class="sr-only">
                {{
                  selectedSourcesByPublisher(organization)
                    ? `include sources from ${organization}`
                    : `exclude sources from ${organization}`
                }}
              </span>
            </button>
          </div>

          <!-- Sources by Organisation -->
          <ul
            v-for="document in publications"
            :key="document.slug"
            class="relative flex items-start"
          >
            <li>
              <input
                v-model="selectedSources"
                :name="document.slug"
                type="checkbox"
                class="mr-2 mt-1 h-4 w-4 rounded text-blue-600 accent-blood focus:ring-blue-600"
                :value="document.slug"
              />
              <label
                :for="document.slug"
                class="font-medium text-gray-900 dark:text-white"
              >
                {{ document.title }}
              </label>
              <source-tag :title="document.title" :text="document.slug" />
            </li>
          </ul>
        </div>
      </fieldset>
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
  emit('close'); // emits a 'close' event to the parent component
}
function saveSelection() {
  setSources(selectedSources.value);
  closeModal();
}

function togglePublisher(publisher) {
  const sourcesByPublisher = groupedDocuments.value[publisher].map(
    (source) => source.slug // get slugs for sources by publisher
  );

  if (selectedSourcesByPublisher(publisher)) {
    selectedSources.value = selectedSources.value.filter(
      (source) => !sourcesByPublisher.includes(source)
    );
  } else {
    const sourcesToAdd = sourcesByPublisher.filter(
      (source) => !selectedSources.value.includes(source)
    );
    selectedSources.value = [...selectedSources.value, ...sourcesToAdd]; // combine checked & unchecked sources
  }
}

function selectedSourcesByPublisher(publisher) {
  // find all sources for this publisher
  const allSources = groupedDocuments.value[publisher].map(
    (source) => source.slug
  );
  // find which of these are part of the current selected sources
  const currentSources = selectedSources.value.filter((source) =>
    allSources.includes(source)
  );
  return currentSources.length;
}

function selectAll() {
  selectedSources.value = documents.value.map((doc) => doc.slug);
}

function deselectAll() {
  selectedSources.value = [];
}
</script>
