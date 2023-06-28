import { defineStore } from 'pinia';
import axios from 'axios';

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
    };
  },
  actions: {
    loadMonsterList() {
      axios
        .get(
          `${
            useRuntimeConfig().public.apiUrl
          }/monsters/?fields=slug,name,challenge_rating,type,size,hit_points,document__slug, document__title&limit=5000&ordering=slug`
        )
        .then((response) => {
          this.monstersList = response.data.results;
        });
    },
    loadSpells() {
      axios
        .get(
          `${
            useRuntimeConfig().public.apiUrl
          }/spells/?fields=slug,name,school,dnd_class,level,components,level_int,document__slug,document__title&limit=1000`
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
        });
    },
    loadMagicItems() {
      axios
        .get(
          `${
            useRuntimeConfig().public.apiUrl
          }/magicitems/?fields=slug,name,type,rarity,document__slug,document__title&limit=1000`
        )
        .then((response) => {
          this.magicItemsList = response.data.results;
        });
    },
    loadBackgrounds() {
      axios
        .get(`${useRuntimeConfig().public.apiUrl}/backgrounds/?limit=1000`)
        .then((response) => {
          this.backgrounds = response.data.results;
        });
    },
    loadClasses() {
      axios
        .get(`${useRuntimeConfig().public.apiUrl}/classes/`) //you will need to enable CORS to make this work
        .then((response) => {
          this.classes = response.data.results;
        });
    },
    loadRaces() {
      axios
        .get(`${useRuntimeConfig().public.apiUrl}/races/`) //you will need to enable CORS to make this work
        .then((response) => {
          this.races = response.data.results;
        });
    },
    loadSections() {
      axios
        .get(`${useRuntimeConfig().public.apiUrl}/sections/`) //you will need to enable CORS to make this work
        .then((response) => {
          this.sections = response.data.results;
        });
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
    allBackgrounds: (state) => {
      return state.backgrounds;
    },
  },
});
