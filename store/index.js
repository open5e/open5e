import { defineStore } from 'pinia';
import axios from 'axios';

const monsterChallengeRatings = [
  0,
  '1/8',
  '1/4',
  '1/2',
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
];

const monsterFields = [
  'slug',
  'name',
  'challenge_rating',
  'cr',
  'type',
  'size',
  'hit_points',
  'document__slug',
  'document__title',
];

const monsterOrder = 'slug';

const monsterSizes = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];

const monsterTypes = [
  'Aberration',
  'Beast',
  'Celestial',
  'Construct',
  'Dragon',
  'Elemental',
  'Fey',
  'Fiend',
  'Giant',
  'Humanoid',
  'Monstrosity',
  'Ooze',
  'Plant',
  'Undead',
];

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
  'requires_attunement',
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
      conditions: [],
      races: [],
      sections: [],
      backgrounds: [],
      savedSources: [],
      sourceSelection: [],
      sourceString: '',
      documents: [],
      freshVals: new Set(), // this tracks lists that have been loaded since the last set of global filters were changed
      loadingCount: 0,
      isInitialized: false,
      queuedActions: [],
    };
  },
  actions: {
    async loadFromApi(params) {
      let {
        resource,
        fields = null,
        limit = null,
        order = null,
        listName,
        filters = {},
        processData = (data) => data,
      } = params;

      if (this.freshVals.has(listName)) {
        // The list is fresh, no need to make the API call
        return;
      }

      if (!this.isInitialized) {
        this.queuedActions.push(params);
        return false; // if the store is not initialized, queue the API call for later fetching and return
      }

      this.loadingCount++;

      this.markFresh(listName); // pre-emptively mark the list as fresh so no additional calls are made for it

      const url = `${useRuntimeConfig().public.apiUrl}/${resource}/?${
        fields ? `fields=${fields}&` : '&'
      }limit=${limit}&ordering=${order}&filter=${filters}${this.sourceString}`;

      axios
        .get(url)
        .then((response) => {
          this[listName] = processData(response.data.results);
          this.loadingCount--;
        })
        .catch((error) => {
          console.log(error);
          this.freshVals.delete(listName); // if the API call fails, mark the list as stale so it can be reloaded
          this.loadingCount--;
        });
    },

    async loadMonsters() {
      await this.loadFromApi({
        resource: 'monsters',
        fields: monsterFields,
        limit: 5000,
        order: monsterOrder,
        listName: 'monstersList',
      });
    },

    async loadSpells() {
      await this.loadFromApi({
        resource: 'spells',
        fields: spellFields,
        limit: 5000,
        order: spellOrder,
        listName: 'spellsList',
      });
    },

    async loadMagicItems() {
      await this.loadFromApi({
        resource: 'magicitems',
        fields: magicItemFields,
        limit: 5000,
        order: magicItemOrder,
        listName: 'magicItemsList',
      });
    },

    async loadBackgrounds() {
      await this.loadFromApi({
        resource: 'backgrounds',
        limit: 1000,
        listName: 'backgrounds',
      });
    },

    async loadClasses() {
      await this.loadFromApi({
        resource: 'classes',
        limit: 1000,
        listName: 'classes',
      });
    },

    async loadConditions() {
      await this.loadFromApi({
        resource: 'conditions',
        limit: 1000,
        listName: 'conditions',
      });
    },

    async loadRaces() {
      await this.loadFromApi({
        resource: 'races',
        limit: 1000,
        listName: 'races',
      });
    },

    async loadSections() {
      await this.loadFromApi({
        resource: 'sections',
        limit: 1000,
        listName: 'sections',
      });
    },

    // documents is an exception, and should not respect source filters, so it has its own function
    async loadDocuments() {
      if (this.freshVals.has('documents')) {
        // The list is fresh, no need to make the API call
        return;
      }
      this.markFresh('documents'); // pre-emptively mark the list as fresh so no additional calls are made for it
      const url = `${useRuntimeConfig().public.apiUrl}/documents/`;

      return axios.get(url).then((response) => {
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
      this.sourceString = !!sources
        ? `&document__slug__in=${this.sourceSelection.join(',')}` // if sources are selected, construct a query string segment for them
        : '';
      this.clearFresh(); // clear the list of fresh sources, since they are now stale
    },

    // load sources from the
    async initializeSources() {
      this.savedSources = this.loadSourcesFromLocal();
      await this.loadDocuments().then(() => {
        console.log(
          `saved sources: ${this.savedSources.length}, documents: ${this.documents.length}`
        );
        if (!this.savedSources.length) {
          this.savedSources = this.documents.map((doc) => doc.slug);
        }
      });
      this.setSources(this.savedSources);
      this.isInitialized = true;
      console.log(`running queued actions: ${this.queuedActions}`);
      await this.processQueue();
    },

    async processQueue() {
      for (const action of this.queuedActions) {
        await this.loadFromApi(action);
      }
      this.queuedActions = [];
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
        conditions: this.loadConditions,
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
    allConditions: (state) => {
      return state.conditions;
    },
    allRaces: (state) => {
      return state.races;
    },
    allSections: (state) => {
      return state.sections;
    },
    allCharacterSections: (state) => {
      return state.sections.filter(
        (section) =>
          section.parent === 'Characters' ||
          section.parent === 'Character Advancement'
      );
    },
    allMechanicsSections: (state) => {
      return state.sections.filter(
        (section) => section.parent === 'Gameplay Mechanics'
      );
    },
    allCombatSections: (state) => {
      return state.sections.filter((section) => section.parent === 'Combat');
    },
    allEquipmentSections: (state) => {
      return state.sections.filter((section) => section.parent === 'Equipment');
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
    getSourceString: (state) => {
      return state.sourceString;
    },
    getMonsterFields: () => {
      return {
        challengeRatings: monsterChallengeRatings,
        monsterSizes: monsterSizes,
        monsterTypes: monsterTypes,
      };
    },
    isLoadingData: (state) => {
      return state.loadingCount > 0;
    },
  },
});
