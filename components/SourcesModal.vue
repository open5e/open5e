<template>
  <modal-dialog @close="closeModal()">
    <slot>
      <!-- MODAL MENU TITLE BAR -->
      <div class="flex w-full justify-between border-b-4 border-blood">
        <h2 class="my-2">Sources</h2>

        <!--  RULESET SELECTOR -->
        <div class="my-1 grid">
          <label class="font-serif text-sm">Ruleset</label>
          <select
            id="ruleset"
            class="border-b-2 border-smoke bg-transparent text-sm"
            name="ruleset"
          >
            <option>–</option>
            <option v-for="ruleset in rulesets" :key="ruleset" :value="ruleset">
              {{ ruleset }}
            </option>
          </select>
        </div>

        <!-- CONTROL FOR SELECTING ALL / NO SOURCES -->
        <div class="serif font-bold">
          <button
            :class="`px-2 py-1 ${
              // toggle styles based on selected sources
              allSourcesSelected()
                ? ` text-black before:mr-1 before:content-['✓'] dark:text-white`
                : ` text-blood hover:text-red-800 dark:hover:text-red-400`
            }`"
            @click="selectAll()"
          >
            All
          </button>

          <button
            :class="`px-2 py-1 ${
              // toggle styles based on selected sources
              selectedSources.length === 0
                ? ` text-black before:mr-1 before:content-['✓'] dark:text-white`
                : ` text-blood hover:text-red-800 dark:hover:text-red-400 `
            }`"
            @click="deselectAll()"
          >
            None
          </button>
        </div>
      </div>
      <!-- MODAL MENU BODY -->
      <fieldset class="mt-1">
        <legend class="sr-only">Source Selection</legend>
        <!-- Organisation -->
        <div
          v-for="(publications, organization, index) in groupedDocuments"
          :key="index"
          class="space-y-0"
        >
          <div class="my-1 flex items-center gap-2">
            <h3 class="mt-0 inline-block items-center gap-2">
              {{ organization }}
            </h3>
            <!-- Button for adding all src by publisher to selected srcs -->
            <button
              :class="`px-2 py-1 font-bold  ${
                selectedSourcesByPublisher(organization) ===
                countSourcesByPublisher(organization)
                  ? `before:mr-1 before:content-['✓']`
                  : `text-blood hover:text-red-800 dark:hover:text-red-400`
              }`"
              @click="addPublisher(organization)"
            >
              All
            </button>
            <!-- Button for removing all srcs by publisher to selected srcs -->
            <button
              :class="`0 px-2 py-1 font-bold ${
                !selectedSourcesByPublisher(organization)
                  ? `before:mr-1 before:content-['✓']`
                  : `dark:hover:text-red-40 text-blood hover:text-red-800`
              }`"
              @click="removePublisher(organization)"
            >
              None
            </button>
          </div>

          <!-- Sources by Organisation -->
          <ul
            v-for="document in publications"
            :key="document.key"
            class="relative flex items-start"
          >
            <li class="flex w-full justify-between">
              <div>
                <input
                  v-model="selectedSources"
                  :name="document.key"
                  type="checkbox"
                  class="mr-2 mt-1 h-4 w-4 rounded text-blue-600 accent-blood focus:ring-blue-600"
                  :value="document.key"
                />
                <label
                  :for="document.key"
                  class="font-medium text-gray-900 dark:text-white"
                >
                  {{ document.name }}
                </label>
                <source-tag :title="document.name" :text="document.key" />
              </div>
              <span
                v-if="document.ruleset"
                class="h-min rounded-xl bg-fog px-2 text-xs dark:bg-slate-800"
              >
                {{ document.ruleset.name }}
              </span>
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
const { data: documents } = useDocuments({
  fields: ['key', 'name', 'publisher', 'ruleset'].join(','),
});

const groupedDocuments = computed(() => {
  const docs = documents.value ?? [];
  return docs.reduce((grouped, document) => {
    (grouped[document.publisher.name] =
      grouped[document.publisher.name] || []).push(document);
    return grouped;
  }, {});
});

// returns the names of all rulesets present in API data
const rulesets = computed(() => {
  return documents?.value?.reduce((rulesets, document) => {
    if (!rulesets.includes(document.ruleset.name)) {
      return [...rulesets, document.ruleset.name];
    } else return rulesets;
  }, []);
});

const closeModal = () => emit('close');

function saveSelection() {
  setSources(selectedSources.value);
  closeModal();
}

function addPublisher(publisher) {
  const sourcesByPublisher = groupedDocuments.value[publisher].map(
    (source) => source.key
  );

  const sourcesToAdd = sourcesByPublisher.filter(
    (source) => !selectedSources.value.includes(source)
  );
  selectedSources.value = [...selectedSources.value, ...sourcesToAdd];
}

function removePublisher(publisher) {
  const sourcesByPublisher = groupedDocuments.value[publisher].map(
    (source) => source.key
  );

  selectedSources.value = selectedSources.value.filter(
    (source) => !sourcesByPublisher.includes(source)
  );
}

function countSourcesByPublisher(publisher) {
  return groupedDocuments.value[publisher]?.length || 0;
}

function selectedSourcesByPublisher(publisher) {
  // find all sources for this publisher
  const allSources = groupedDocuments.value[publisher].map(
    (source) => source.key
  );
  // find which of these are part of the current selected sources
  const currentSources = selectedSources.value.filter((source) =>
    allSources.includes(source)
  );
  return currentSources.length;
}

function allSourcesSelected() {
  return selectedSources.value.length === documents.value.length;
}

function selectAll() {
  selectedSources.value = documents.value.map((doc) => doc.key);
}

const deselectAll = () => (selectedSources.value = []);
</script>
