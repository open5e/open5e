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
    };
  },
  actions: {
    loadMonsters() {
      if (this.freshVals.has('monstersList')) {
        // The list is fresh, no need to make the API call
        return;
      }
      axios
        .get(
          `${
            useRuntimeConfig().public.apiUrl
          }/monsters/?fields=${monsterFields}&limit=5000&ordering=${monsterOrder}${
            this.sourceString
          }
          `
        )
        .then((response) => {
          this.monstersList = response.data.results;
          this.markFresh('monstersList'); // mark the list as fresh
        });
    },
    loadSpells() {
      if (this.freshVals.has('spellsList')) {
        // The list is fresh, no need to make the API call
        return;
      }
      axios
        .get(
          `${
            useRuntimeConfig().public.apiUrl
          }/spells/?fields=${spellFields}&limit=5000&ordering=${spellOrder}${
            this.sourceString
          }`
        ) //you will need to enable CORS to make this work
        .then((response) => {
          let spells = response.data.results;
          // Until api sends arrays this will work to sort spells by class.
          spells.map((item) => {
            item.dnd_class = item.dnd_class.split(',');
            for (var i = 0; i < item.dnd_class.length; i++) {
              item.dnd_class[i].trim();
            }
          });
          this.spellsList = spells;
          this.markFresh('spellsList'); // mark the list as fresh
        });
    },
    loadMagicItems() {
      if (this.freshVals.has('magicItemsList')) {
        // The list is fresh, no need to make the API call
        return;
      }
      axios
        .get(
          `${
            useRuntimeConfig().public.apiUrl
          }/magicitems/?fields=${magicItemFields}&limit=5000&ordering=${magicItemOrder}${
            this.sourceString
          }`
        )
        .then((response) => {
          this.magicItemsList = response.data.results;
          this.markFresh('magicItemsList'); // mark the list as fresh
        });
    },
    loadBackgrounds() {
      axios
        .get(
          `${useRuntimeConfig().public.apiUrl}/backgrounds/?limit=1000${
            this.sourceString
          }`
        )
        .then((response) => {
          this.backgrounds = response.data.results;
        });
    },
    loadClasses() {
      axios
        .get(
          `${useRuntimeConfig().public.apiUrl}/classes/?limit=1000${
            this.sourceString
          }`
        )
        .then((response) => {
          this.classes = response.data.results;
        });
    },
    loadRaces() {
      axios
        .get(
          `${useRuntimeConfig().public.apiUrl}/races/?limit=1000${
            this.sourceString
          }`
        )
        .then((response) => {
          this.races = response.data.results;
        });
    },
    loadSections() {
      axios
        .get(
          `${useRuntimeConfig().public.apiUrl}/sections/?limit=1000${
            this.sourceString
          }`
        )
        .then((response) => {
          this.sections = response.data.results;
        });
    },
    loadDocuments() {
      axios
        .get(`${useRuntimeConfig().public.apiUrl}/documents/?limit=1000`) // intentionally not scoped to selected sources, this populates the source selection list
        .then((response) => {
          this.documents = response.data.results;
        });
    },
    setSources(sources) {
      console.log(sources);
      console.log(this.sourceSelection);
      if (this.sourceSelection === sources) {
        return; // if the sources are the same, don't do anything
      }
      this.sourceSelection = sources;
      this.sourceString = sources
        ? `&document__slug__in=${this.sourceSelection.join(',')}` // if sources are selected, construct a query string segment for them
        : '';
      this.clearFresh(); // clear the list of fresh sources, since they are now stale
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
