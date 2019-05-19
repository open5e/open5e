import axios from 'axios';

export const strict = false;

export const state = () => ({
  spellsList: [],
  monstersList: [],
  magicItemsList: [],
  classes: [],
  races: [],
  sections: [],
})

export const getters = {
  allMonsters: state => {
    return state.monstersList;
  },
  allSpells: state => {
    return state.spellsList
  },
  allMagicItems: state => {
    return state.magicItemsList
  },
  allClasses: state => {
    return state.classes
  },
  allRaces: state => {
    return state.races
  },
  allSections: state => {
    return state.sections
  },
}

export const actions = {
  LOAD_MONSTERS_LIST (context) {
    axios.get(`${process.env.apiUrl}/monsters/?fields=slug,name,challenge_rating,type,size,hit_points&limit=1000`)
    .then(
      (response) => { context.commit('setMonstersList', response.data.results)}
    )
  },
  LOAD_SPELLS( context ) {},
  LOAD_MAGICITEMS( context ) {},
  LOAD_CLASSES( context ) {
    axios.get(`${process.env.apiUrl}/classes/`) //you will need to enable CORS to make this work
    .then(
      response => { context.commit( 'setClasses', response.data.results )
    })
  },
  LOAD_RACES( context ) {
    axios.get(`${process.env.apiUrl}/races/`) //you will need to enable CORS to make this work
    .then(
      response => { context.commit( 'setRaces', response.data.results )
    })
  },
  LOAD_SECTIONS( context ) {
    axios.get(`${process.env.apiUrl}/sections/`) //you will need to enable CORS to make this work
    .then(
      response => { context.commit( 'setSections', response.data.results )
    })
  },
}


export const mutations = {
  setSpellsList (state, spells) {
      state.spellsList = spells
  },
  setMonstersList (state, monsters) {
      state.monstersList = monsters;
  },
  setMagicItemsList (state, magicItems) {
    state.magicItemsList = magicItems;
  },
  setClasses (state, classes ) {
    state.classes = classes
  },
  setRaces (state, races ) {
    state.races = races
  },
  setSections (state, sections ) {
    state.sections = sections
  },
}