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
  LOAD_SPELLS( context ) {
    axios.get(`${process.env.apiUrl}/spells/?fields=slug,name,school,dnd_class,level,components,level_int&limit=1000`) //you will need to enable CORS to make this work
    .then(
      (response => {
        let spells = response.data.results
        // Until api sends arrays this will work to sort spells by class.
        spells.map((item)=>{
            item.dnd_class = item.dnd_class.split(',');
            for(var i = 0; i < item.dnd_class.length; i++){
                item.dnd_class[i].trim();
            }
        })
        context.commit('setSpellsList', spells)
      })
    )
  },
  LOAD_MAGICITEMS( context ) {
    axios.get(`${process.env.apiUrl}/magicitems/?fields=slug,name,type,rarity&limit=1000`)
    .then(
      response => { context.commit( 'setMagicItemsList', response.data.results )
    })
  },
  LOAD_CLASSES( context ) {
    axios.get(`${process.env.apiUrl}/classes/`) //you will need to enable CORS to make this work
    .then(
      response => { context.commit( 'setClasses', response.data.results )
    })
  },
  LOAD_RACES( context ) {
    if (!context.races) {
      axios.get(`${process.env.apiUrl}/races/`) //you will need to enable CORS to make this work
      .then(
        response => { context.commit( 'setRaces', response.data.results )
      })
    }
  },
  LOAD_SECTIONS( context ) {
    if (!context.sections){
      axios.get(`${process.env.apiUrl}/sections/`) //you will need to enable CORS to make this work
      .then(
        response => { context.commit( 'setSections', response.data.results )
      })
    }
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