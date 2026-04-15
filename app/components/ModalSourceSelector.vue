<script lang="ts">
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
 *
 * -= DEPENDENCIES =-
 * @component Modal – Used for rendering the modal dialog UI.
 * @component SourceTag – Displays a tag for each source showing relevant information.
 *
 */
</script>

<template>
  <Modal @close="closeModal()">
    <slot>
      <!-- MODAL MENU TITLE BAR -->
      <div class="flex w-full items-center justify-between">

        <input 
          id="select-deselect-all-checkbox"
          type="checkbox"
          :checked="allSelected"
          :indeterminate.prop="!allSelected && !noneSelected"
          :aria-label="`Toggle all sources ${!allSelected ? 'on' : 'off'}`"
          class="peer mr-4 mt-1 size-4 grow-0 cursor-pointer rounded text-blue-600 accent-red focus:ring-blue-600"
          @click="toggleAllSources"
        />

        <h2 class="my-0 grow text-3xl">Sources Selector</h2>

        <!--  GAME SYSTEM SELECTOR -->
        <div class="mb-2 grid">
          <label class="text-right font-serif text-sm" for="system">
            System
          </label>
          <select
            id="system"
            v-model="currentSystem"
            class="cursor-pointer appearance-none border-b-2 border-red bg-transparent text-right text-sm"
            @change="selectAllInSystem"
          >
            <option value="">–</option>
            <option
              v-for="systemOption in allGameSystems"
              :key="systemOption"
              :value="systemOption"
            >
              {{ systemOption }}
            </option>
          </select>
        </div>
      </div>

      <p class="mt-0 text-sm italic">Open5e hosts content from many freely-licensed sources. Use this menu to select which sources you would like to appear when browsing Open5e.</p>

      <!-- MODAL MENU BODY -->
      <fieldset class="mt-1">
        <legend class="sr-only">Source Selection</legend>
        <div
          v-for="(documentsPerPublisher, publisher) in groupedDocuments"
          :key="publisher"
          class="space-y-0"
        >
          <!-- PUBLISHER HEADERS -->
          <button
            class="my-1 font-bold "
            :class="allPublisherSourcesInactive(publisher) ? 'text-granite hover:text-smoke' : 'hover:text-blood'"
            :aria-label="`Toggle ${allPublisherSourcesActive(publisher) ? 'off' : 'on'} all sources from ${publisher}`"
            @click="togglePublisher(publisher)"
          >
            <h3 class="mt-0">{{ publisher }}</h3>
          </button>

          <!-- SOURCES PER PUBLISHER -->
          <span
            class="ml-2 cursor-pointer text-granite"
            @click="togglePublisher(publisher)"
          >
            {{ ` (${selectedSourcesByPublisher(publisher)}/${countSourcesByPublisher(publisher)})`}}
          </span>

          <ul v-if="!allPublisherSourcesInactive(publisher)">
            <li 
              v-for="document in documentsPerPublisher"
              :key="document.key"
              class="group flex w-full items-center"
            >
              <input
                :id="document.key"
                v-model="selectedSources"
                :name="document.key"
                type="checkbox"
                class="peer mr-2 mt-1 size-4 cursor-pointer rounded text-blue-600 accent-red focus:ring-blue-600"
                :value="document.key"
              />
              <label
                :for="document.key"
                class="cursor-pointer text-granite peer-checked:text-black peer-hover:text-blood dark:peer-checked:text-white dark:hover:peer-checked:text-red"
              >
                {{ document.name }}
              </label>

              <SourceTag :title="document.name" :text="document.key" />
              
              <span
                v-if="document.gamesystem"
                class="ml-auto h-min rounded-xl bg-fog px-2 text-xs dark:bg-slate-800"
              >
                {{ formatGameSystemTitle(document.gamesystem.name) }}
              </span>
            </li>
          </ul>
        </div>
      </fieldset>
    </slot>
    <template #actions>
      <button
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
        @click="closeModal()"
      >
        Cancel
      </button>
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md bg-red px-3 py-2 text-sm  font-semibold text-white shadow-sm ring-offset-2 hover:bg-blood hover:ring-2 hover:ring-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2"
        @click="saveSelection()"
      >
        Update
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { sortDocumentsByPublisher } from '@/helpers';
import type { Document } from '@/types';

const emit = defineEmits(['close']);
const closeModal = () => {
  // reset menu state to current active sources after closing animation finishes
  setTimeout(() => selectedSources.value = [...sources.value], 500);
  emit('close');
};

const { data: documents } = useDocuments({
  fields: ['key', 'name', 'publisher', 'gamesystem', 'type'].join(','),
  publisher__fields: ['name', 'key'].join(','),
  gamesystem__fields: ['name', 'key'].join(','),
});

const { sources, setSources, gameSystem, setGameSystem } = useSourcesList();

// Seperate SOURCE and MISC documents, only use the former in the modal menu
// and add the later back in when updating selected sources in local memory

const sourceDocuments = computed(() => (
  documents?.value?.filter(document => document.type === 'SOURCE') ?? []
));

const miscDocuments = computed(() => (
  documents?.value?.filter(document => document.type !== 'SOURCE') ?? []
));

// Keep selectedSources in sync with global sources state
const selectedSources: Ref<string[]> = ref([]);
watchEffect(() => selectedSources.value = [...sources.value]);

const allSelected = computed(() => {
  const total = sourceDocuments.value?.length ?? 0;
  return total > 0 && selectedSources.value.length === total;
});

const noneSelected = computed(() => selectedSources.value.length === 0);

// filter documents by the current game system
const documentsInSystem = computed<Document[]>(() => {
  if (!sourceDocuments?.value || sourceDocuments.value.length === 0) return [];
  if (!currentSystem.value) return sourceDocuments.value;
  return sourceDocuments.value.filter((document) => {
    return document.gamesystem.name === currentSystem.value;
  });

});

// group filtered documents by publisher
const groupedDocuments = computed<Record<string, Document[]>>(() => {
  const sortedDocuments = sortDocumentsByPublisher(documentsInSystem.value);
  // Bring WotC sources to top of list if present
  if (!sortedDocuments['Wizards of the Coast']) return sortedDocuments;
  const { ['Wizards of the Coast']: value, ...rest } = sortedDocuments;
  return { ['Wizards of the Coast']: value, ...rest};
});

const currentSystem = ref(gameSystem.value ?? '');

// returns the names of all game systems present in API data
const allGameSystems = computed(() => {
  if (!documents.value) return [];
  return [...new Set(documents.value
      .map(doc => doc.gamesystem?.name)
      .filter(Boolean)
  )];
});

// save current form selection to local memory
function saveSelection() {
  setSources([
    ...selectedSources.value,
    ...miscDocuments.value.map(document => document.key)
  ]);
  setGameSystem(currentSystem.value);
  closeModal();
}

function toggleAllSources() {
  if (!allSelected.value) selectAllInSystem();
  else deselectAll();
}

function allPublisherSourcesActive(publisher: string) {
  return selectedSourcesByPublisher(publisher) === countSourcesByPublisher(publisher);
}

function allPublisherSourcesInactive(publisher: string) {
  return selectedSourcesByPublisher(publisher) === 0;
}

function togglePublisher(publisher: string) {
  if (allPublisherSourcesActive(publisher)) removePublisher(publisher);
  else addPublisher(publisher);
}

// add all sources from a given publisher to allowed sources
function addPublisher(publisher: string) {
  const sourcesToAdd = groupedDocuments.value[publisher]
    .map(source => source.key)
    .filter(source => !selectedSources.value.includes(source));
  selectedSources.value = [...selectedSources.value, ...sourcesToAdd];
}

// remove all sources from a given publisher from allowed sources
function removePublisher(publisher: string) {
  const sourcesByPublisher = groupedDocuments.value[publisher].map(source => source.key);
  selectedSources.value = selectedSources.value
    .filter(source => !sourcesByPublisher.includes(source));
}

// returns number of sources by a given publisher
const countSourcesByPublisher = (publisher: string) => groupedDocuments.value[publisher]?.length ?? 0;

// returns how many sources are selected from a given publisher
function selectedSourcesByPublisher(publisher: string) {
  const publisherKeys = (groupedDocuments.value[publisher] ?? []).map(src => src.key);
  return selectedSources.value
    .filter(src => publisherKeys.includes(src))
    .length;
}

function selectAllInSystem() {
  selectedSources.value = documentsInSystem.value?.map(doc => doc.key) ?? [];
}

const deselectAll = () => (selectedSources.value = []);

function formatGameSystemTitle(input: string) {
  const systemNameMap: Record<string, string> = {
    '5th Edition 2014': '5e 2014',
    '5th Edition 2024': '5e 2024',
    'Advanced 5th Edition': 'Level Up A5e',
  };
  return systemNameMap[input] ?? input;
}
</script>
