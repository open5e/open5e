import { defineStore } from 'pinia';
import axios from 'axios';

const monsterFields = [
  'slug',
  'name',
  'challenge_rating',
  'type',
  'size',
  'hit_points',
  'document__slug',
  'document__title',
];

const monsterOrder = 'slug';

const spellFields = [
  'slug',
  'name',
  'school',
  'dnd_class',
  'spell_lists',
  'level',
  'components',
  'level_int',
  'document__slug',
  'document__title',
];

const spellOrder = 'slug';

const magicItemFields = [
  'slug',
  'name',
  'type',
  'rarity',
  'document__slug',
  'document__title',
];

const magicItemOrder = 'slug';

export const useMainStore = defineStore({
  id: 'main',
  state: () => {
    return {
      spellsList: [],
      monstersList: [],
      magicItemsList: [],
      classes: [],
      races: [],
      sections: [],
      backgrounds: [],
      savedSources: [],
      sourceSelection: [],
      sourceString: '',
      documents: [],
      freshVals: new Set(), // this tracks lists that have been loaded since the last set of global filters were changed
      isInitialized: false,
    };
  },
  actions: {
    async loadFromApi(
      resource,
      fields,
      limit,
      order,
      listName,
      processData = (data) => data,
      shouldEnsureInitialization = true
    ) {
      if (this.freshVals.has(listName)) {
        // The list is fresh, no need to make the API call
        return;
      }

      if (shouldEnsureInitialization && !this.isInitialized) {
        await this.initializeSources();
      }

      this.markFresh(listName); // pre-emptively mark the list as fresh so no additional calls are made for it

      const url = `${
        useRuntimeConfig().public.apiUrl
      }/${resource}/?fields=${fields}&limit=${limit}&ordering=${order}${
        this.sourceString
      }`;

      axios
        .get(url)
        .then((response) => {
          this[listName] = processData(response.data.results);
        })
        .catch((error) => {
          console.log(error);
          this.freshVals.delete(listName); // if the API call fails, mark the list as stale so it can be reloaded
        });
    },

    async loadMonsters() {
      await this.loadFromApi(
        'monsters',
        monsterFields,
        5000,
        monsterOrder,
        'monstersList'
      );
    },

    async loadSpells() {
      await this.loadFromApi(
        'spells',
        spellFields,
        5000,
        spellOrder,
        'spellsList'
      );
    },

    async loadMagicItems() {
      await this.loadFromApi(
        'magicitems',
        magicItemFields,
        5000,
        magicItemOrder,
        'magicItemsList'
      );
    },

    async loadBackgrounds() {
      await this.loadFromApi('backgrounds', '', 1000, '', 'backgrounds');
    },

    async loadClasses() {
      await this.loadFromApi('classes', '', 1000, '', 'classes');
    },

    async loadRaces() {
      await this.loadFromApi('races', '', 1000, '', 'races');
    },

    async loadSections() {
      await this.loadFromApi('sections', '', 1000, '', 'sections');
    },

    // documents is an exception, and should not respect source filters, so it has its own function
    async loadDocuments() {
      if (this.freshVals.has('documents')) {
        // The list is fresh, no need to make the API call
        return;
      }
      this.markFresh('documents'); // pre-emptively mark the list as fresh so no additional calls are made for it
      const url = `${useRuntimeConfig().public.apiUrl}/documents/`;

      axios.get(url).then((response) => {
        this.documents = response.data.results;
      });
    },

    loadSourcesFromLocal() {
      if (process.client) {
        const savedSources = localStorage.getItem('sources');
        return savedSources ? JSON.parse(savedSources) : [];
      }
    },
    saveSourcesToLocal(sources) {
      localStorage.setItem('sources', JSON.stringify(sources));
    },
    setSources(sources) {
      if (this.sourceSelection === sources) {
        return; // if the sources are the same, don't do anything
      }
      this.sourceSelection = sources;
      this.saveSourcesToLocal(sources); // save to localStorage
      this.sourceString = sources
        ? `&document__slug__in=${this.sourceSelection.join(',')}` // if sources are selected, construct a query string segment for them
        : '';
      this.clearFresh(); // clear the list of fresh sources, since they are now stale
    },
    // load sources from the
    async initializeSources() {
      this.savedSources = this.loadSourcesFromLocal();
      await this.loadDocuments();
      if (this.savedSources.length < 1) {
        this.savedSources = this.documents.map((doc) => doc.slug);
      }
      this.setSources(this.savedSources);
      this.isInitialized = true;
    },
    markFresh(val) {
      this.freshVals.add(val); // mark the list as fresh when it is fetched
    },
    clearFresh() {
      const staleVals = [...this.freshVals]; // convert the set to an array
      const loadFunctions = {
        spellsList: this.loadSpells,
        monstersList: this.loadMonsters,
        magicItemsList: this.loadMagicItems,
        classes: this.loadClasses,
        races: this.loadRaces,
        sections: this.loadSections,
        backgrounds: this.loadBackgrounds,
        documents: this.loadDocuments,
      };

      this.freshVals.clear(); // clear the list of fresh sources. this should be done whenever a global fitler changes

      for (const listName of staleVals) {
        if (listName in loadFunctions) {
          loadFunctions[listName](); // reload any stale lists
        }
      }
    },
  },
  getters: {
    allMonsters: (state) => {
      return state.monstersList;
    },
    allSpells: (state) => {
      return state.spellsList;
    },
    allMagicItems: (state) => {
      return state.magicItemsList;
    },
    allClasses: (state) => {
      return state.classes;
    },
    allRaces: (state) => {
      return state.races;
    },
    allSections: (state) => {
      return state.sections;
    },
    allBackgrounds: (state) => {
      return state.backgrounds;
    },
    allDocuments: (state) => {
      return state.documents;
    },
    allSourceSelections: (state) => {
      return state.sourceSelection;
    },
  },
});
