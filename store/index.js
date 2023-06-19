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
      processData = (data) => data
    ) {
      if (this.freshVals.has(listName)) {
        // The list is fresh, no need to make the API call
        return;
      }
      if (!this.isInitialized) {
        await this.initializeSources();
      }
      const url = `${
        useRuntimeConfig().public.apiUrl
      }/${resource}/?fields=${fields}&limit=${limit}&ordering=${order}${
        this.sourceString
      }`;

      axios.get(url).then((response) => {
        this[listName] = processData(response.data.results);
        this.markFresh(listName); // mark the list as fresh
      });
    },

    loadMonsters() {
      this.loadFromApi(
        'monsters',
        monsterFields,
        5000,
        monsterOrder,
        'monstersList'
      );
    },

    loadSpells() {
      this.loadFromApi('spells', spellFields, 5000, spellOrder, 'spellsList');
    },

    loadMagicItems() {
      this.loadFromApi(
        'magicitems',
        magicItemFields,
        5000,
        magicItemOrder,
        'magicItemsList'
      );
    },

    loadBackgrounds() {
      this.loadFromApi('backgrounds', '', 1000, '', 'backgrounds');
    },

    loadClasses() {
      this.loadFromApi('classes', '', 1000, '', 'classes');
    },

    loadRaces() {
      this.loadFromApi('races', '', 1000, '', 'races');
    },

    loadSections() {
      this.loadFromApi('sections', '', 1000, '', 'sections');
    },

    loadDocuments() {
      this.loadFromApi('documents', '', 1000, '', 'documents');
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
      console.log(sources);
      console.log(this.sourceSelection);
      if (this.sourceSelection === sources) {
        return; // if the sources are the same, don't do anything
      }
      this.sourceSelection = sources;
      this.saveSourcesToLocal(sources); // save to localStorage
      console.log('saving' + sources);
      this.sourceString = sources
        ? `&document__slug__in=${this.sourceSelection.join(',')}` // if sources are selected, construct a query string segment for them
        : '';
      this.clearFresh(); // clear the list of fresh sources, since they are now stale
    },
    // load sources from the
    async initializeSources() {
      const savedSources = this.loadSourcesFromLocal();
      if (savedSources.length > 0) {
        this.setSources(savedSources);
      } else {
        await this.loadDocuments();
        if (this.documents && this.documents.length > 0) {
          this.setSources(this.documents.map((doc) => doc.slug));
        }
      }
      this.isInitialized = true;
    },
    markFresh(val) {
      this.freshVals.add(val); // mark the list as fresh when it is fetched
    },
    clearFresh() {
      console.log('clearing fresh');
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
          console.log('reloading ' + listName);
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
