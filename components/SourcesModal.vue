<script>
/**
 * SourceSelectionModal.vue - Displays a modal for selecting sources, grouped by publisher, with options
 *   to select/deselect all sources and filter by game system.
 *
 * -= PROPS (INPUTS) =-
 * @prop {Object} sources - List of currently selected sources pulled
 * @prop {Function} setSources - Function to update the selected sources in the parent component.
 * @prop {String} gameSystem - The currently selected game system.
 * @prop {Function} setGameSystem - Function to update the selected game system in the parent component.
 *
 * -= EMITS (OUTPUTS) =-
 * @emits {Function} close – Emit when the modal should be closed.
 * @emits {Function} saveSelection – Emit when the user confirms the selection and the modal should close.
 *
 * -= DEPENDENCIES =-
 * @component ModalDialogue – Used for rendering the modal dialog UI.
 * @component SourceTag – Displays a tag for each source showing relevant information.
 *
 */
</script>

<template>
  <modal-dialog @close="closeModal()">
    <slot>
      <!-- MODAL MENU TITLE BAR -->
      <div class="flex w-full justify-between border-b-4 border-blood">
        <h2 class="my-2">Sources</h2>

        <!--  GAME SYSTEM SELECTOR -->
        <div class="my-1 grid">
          <label class="font-serif text-sm">System</label>
          <select
            id="system"
            class="border-b-2 border-smoke bg-transparent text-sm"
            name="system"
            @change="onGameSystemChanged"
          >
            <option :value="''">–</option>
            <option
              v-for="systemOption in allGameSystems"
              :key="systemOption"
              :value="systemOption"
              :selected="systemOption === currentSystem"
            >
              {{ systemOption }}
            </option>
          </select>
        </div>

        <div class="serif font-bold">
          <!-- SELECT ALL SOURCES -->
          <button
            class="px-2 py-1"
            :class="
              allSourcesSelected()
                ? ` text-black before:mr-1 before:content-['✓'] dark:text-white`
                : ` text-blood hover:text-red-800 dark:hover:text-red-400`
            "
            @click="selectAllInSystem()"
          >
            All
          </button>

          <!-- DESELECT ALL SOURCES -->
          <button
            class="px-2 py-1"
            :class="
              selectedSources.length === 0
                ? ` text-black before:mr-1 before:content-['✓'] dark:text-white`
                : ` text-blood hover:text-red-800 dark:hover:text-red-400 `
            "
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
              class="px-2 py-1 font-bold"
              :class="
                selectedSourcesByPublisher(organization) ===
                countSourcesByPublisher(organization)
                  ? `before:mr-1 before:content-['✓']`
                  : `text-blood hover:text-red-800 dark:hover:text-red-400`
              "
              @click="addPublisher(organization)"
            >
              All
            </button>
            <!-- Button for removing all srcs by publisher to selected srcs -->
            <button
              class="px-2 py-1 font-bold"
              :class="
                !selectedSourcesByPublisher(organization)
                  ? `before:mr-1 before:content-['✓']`
                  : `dark:hover:text-red-40 text-blood hover:text-red-800`
              "
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
                v-if="document.gamesystem"
                class="h-min rounded-xl bg-fog px-2 text-xs dark:bg-slate-800"
              >
                {{ document.gamesystem.name }}
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
const { sources, setSources, gameSystem, setGameSystem } = useSourcesList();
const selectedSources = ref(sources.value);

const emit = defineEmits(['close']);
const closeModal = () => emit('close');

const { data: documents } = useDocuments({
  fields: ['key', 'name', 'publisher', 'gamesystem'].join(','),
  publisher__fields: ['name', 'key'].join(','),
  gamesystem__fields: ['name', 'key'].join(','),
});

// filter documents by the current game system
const documentsInSystem = computed(() => {
  if (!currentSystem.value) return documents.value;
  return documents?.value.filter((document) => {
    return document.gamesystem.name === currentSystem.value;
  });
});

// group filtered documents by publisher
const groupedDocuments = computed(() => {
  const docs = documentsInSystem.value ?? [];
  return docs.reduce((grouped, document) => {
    const publisher = document.publisher.name;
    if (grouped[publisher]) grouped[publisher].push(document);
    else grouped[publisher] = [document];
    return grouped;
  }, {});
});

// state for current game system
const currentSystem = ref(gameSystem.value);

// returns the names of all game systems present in API data
const allGameSystems = computed(() => {
  return documents?.value?.reduce((systems, document) => {
    if (!systems.includes(document.gamesystem.name))
      return [...systems, document.gamesystem.name];
    else return systems;
  }, []);
});

// handler for changing game systems selecter, updates systems/sources cmpnt state
const onGameSystemChanged = (event) => {
  const newSystem = event.target.value;
  currentSystem.value = newSystem;
  if (newSystem)
    selectedSources.value = documents.value
      .filter((source) => source.gamesystem.name === newSystem)
      .map((source) => source.key);
  else selectedSources.value = documents.value.map((doc) => doc.key);
};

// save current form selection to local memory
function saveSelection() {
  setSources(selectedSources.value);
  setGameSystem(currentSystem.value);
  closeModal();
}

// add all sources from a given publisher to allowed sources
function addPublisher(publisher) {
  const sourcesToAdd = groupedDocuments.value[publisher]
    .map((source) => source.key)
    .filter((source) => !selectedSources.value.includes(source));
  selectedSources.value = [...selectedSources.value, ...sourcesToAdd];
}

// remove all sources from a given publisher from allowed sources
function removePublisher(publisher) {
  const sourcesByPublisher = groupedDocuments.value[publisher].map(
    (source) => source.key
  );
  selectedSources.value = selectedSources.value.filter(
    (source) => !sourcesByPublisher.includes(source)
  );
}

// returns number of sources by a given publisher
const countSourcesByPublisher = (publisher) =>
  groupedDocuments.value[publisher]?.length || 0;

// returns how many sources are selected from a given publisher
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

// returns true if all sources in current game system are selected
const allSourcesSelected = () => {
  const selected = selectedSources.value.length;
  const total = documentsInSystem.value.length;
  return selected === total;
};

function selectAllInSystem() {
  selectedSources.value = documentsInSystem.value.map((doc) => doc.key);
}

const deselectAll = () => (selectedSources.value = []);
</script>
