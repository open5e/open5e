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
        <div class="w-min grow-0">
          <input
            id="select-deselect-all-checkbox"
            ref="selectAllCheckbox"
            type="checkbox"
            class="peer mr-2 mt-1 size-4 cursor-pointer rounded text-blue-600 accent-red focus:ring-blue-600"
            @click="toggleAllSources"
          />
          <label for="select-deselect-all-checkbox" class="sr-only">
            Toggle All
          </label>
        </div>

        <h2 class="my-2 grow text-3xl">Open5e Sources</h2>

        <!--  GAME SYSTEM SELECTOR -->
        <div class="mb-2 grid">
          <label class="text-right font-serif text-sm">System</label>
          <select
            id="system"
            class="appearance-none border-b-2 border-smoke bg-transparent text-right text-sm"
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
      </div>
      <p class="mt-0 text-sm italic">Open5e pulls its content from various freely-licensed sources. Use this menu to select which sources you would like to appear when browsing Open5e.</p>
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

          <!-- Sources per Publisher -->
          <div
            v-if="allPublisherSourcesInactive(publisher)"
            class="inline cursor-pointer text-granite" @click="togglePublisher(publisher)"
          >
            {{ ` (${countSourcesByPublisher(publisher)})`}}
          </div>
          
          <ul
            v-for="document in documentsPerPublisher"
            v-else
            :key="document.key"
            class="relative flex items-start"
          >
            <li class="group flex w-full items-center">
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
        ref="cancelButtonRef"
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
        @click="closeModal()"
      >
        Cancel
      </button>
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md bg-blood px-3 py-2  text-sm font-semibold text-white shadow-sm ring-offset-2 hover:ring-2 hover:ring-blood focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2"
        @click="saveSourceSelection()"
      >
        Update
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { sortDocumentsByPublisher } from '@/helpers';
import type { Document } from '@/types';

// fetch full list of document sources
const { data: documents } = useDocuments({
  fields: ['key', 'name', 'publisher', 'gamesystem'].join(','),
  publisher__fields: ['name', 'key'].join(','),
  gamesystem__fields: ['name', 'key'].join(','),
});

const { sources, setSources, gameSystem, setGameSystem } = useSourcesList();
const selectedSources: Ref<string[]> = ref([]);
const emit = defineEmits(['close']);
const closeModal = () => emit('close');

const selectAllCheckbox = ref<HTMLInputElement | null>();

const allSelected = computed(() => selectedSources.value.length === documentsInSystem.value?.length && documentsInSystem.value?.length > 0);
const noneSelected = computed(() => selectedSources.value.length === 0);

// Keep selectedSources in sync with global sources state
watchEffect(() => selectedSources.value = [...sources.value]);

watchEffect(() => {
  if (selectAllCheckbox.value) {
    selectAllCheckbox.value.checked = allSelected.value;
    selectAllCheckbox.value.indeterminate = !allSelected.value && !noneSelected.value;
  }
});

// filter documents by the current game system
const documentsInSystem = computed<Document[]>(() => {
  if (!documents.value) return [];
  if (!currentSystem.value) return documents.value;
  return documents.value.filter((document) => {
    return document.gamesystem.name === currentSystem.value;
  });
});

// group filtered documents by publisher
const groupedDocuments = computed<Record<string, Document[]>>(() => {
  const sortedDocuments = sortDocumentsByPublisher(documentsInSystem);

  // Bring WotC sources to top of list if present
  if (!sortedDocuments['Wizards of the Coast']) return sortedDocuments;
  const { ['Wizards of the Coast']: value, ...rest } = sortedDocuments;
  return { ['Wizards of the Coast']: value, ...rest};
});

// state for current game system
const currentSystem = ref('');
watchEffect(() => currentSystem.value = gameSystem.value ?? '');

// returns the names of all game systems present in API data
const allGameSystems = computed(() => {
  if (!documents.value) return[];

  return documents?.value?.reduce((systems, document) => {
    if (!document.gamesystem?.name) return systems;
    if (!systems.includes(document.gamesystem.name))
      return [...systems, document.gamesystem.name];
    return systems;
  }, [] as string[]);
});

// handler for changing game systems selecter, updates systems/sources cmpnt state
const onGameSystemChanged = (event: Event) => {
  const newSystem = (event.target as HTMLSelectElement).value;
  currentSystem.value = newSystem;
  selectedSources.value = (documents.value ?? [])
    .filter(doc => !newSystem || doc.gamesystem?.name === newSystem)
    .map(doc => doc.key);
};

function saveSourceSelection() {
  setSources(selectedSources.value);
  setGameSystem(currentSystem.value);
  closeModal();
}

function toggleAllSources(event: Event) {
  console.log((event.target as HTMLInputElement).checked);
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
  allPublisherSourcesActive(publisher) ? removePublisher(publisher) : addPublisher(publisher);
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
  const sourcesByPublisher = groupedDocuments.value[publisher].map(
    source => source.key,
  );
  selectedSources.value = selectedSources.value.filter(
    source => !sourcesByPublisher.includes(source),
  );
}

// returns number of sources by a given publisher
const countSourcesByPublisher = (publisher: string) =>
  groupedDocuments.value[publisher]?.length || 0;

// returns how many sources are selected from a given publisher
function selectedSourcesByPublisher(publisher: string) {
  const allSources = (groupedDocuments.value[publisher] ?? []).map(src => src.key);
  const currentSources = selectedSources.value.filter(src =>
    allSources.includes(src),
  );
  return currentSources.length;
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
