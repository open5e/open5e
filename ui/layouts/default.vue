<template>
  <div class="app-wrapper">
    <div class="sidebar">
      <nuxt-link tag="h1" class="sticky-header" to="/">Open5e</nuxt-link>
      <ul>
        <nuxt-link tag="li" to="/classes/">Classes</nuxt-link>
        <ul>
          <nuxt-link tag="li" to="/classes/barbarian">Barbarian</nuxt-link>
          <nuxt-link tag="li" to="/classes/bard">Bard</nuxt-link>
          <nuxt-link tag="li" to="/classes/cleric">Cleric</nuxt-link>
          <nuxt-link tag="li" to="/classes/druid">Druid</nuxt-link>
          <nuxt-link tag="li" to="/classes/fighter">Fighter</nuxt-link>
          <nuxt-link tag="li" to="/classes/monk">Monk</nuxt-link>
          <nuxt-link tag="li" to="/classes/paladin">Paladin</nuxt-link>
          <nuxt-link tag="li" to="/classes/ranger">Ranger</nuxt-link>
          <nuxt-link tag="li" to="/classes/rogue">Rogue</nuxt-link>
          <nuxt-link tag="li" to="/classes/sorcerer">Sorcerer</nuxt-link>
          <nuxt-link tag="li" to="/classes/warlock">Warlock</nuxt-link>
          <nuxt-link tag="li" to="/classes/wizard">Wizard</nuxt-link>
        </ul>
        <nuxt-link tag="li" to="/combat/">Combat</nuxt-link>
        <ul>
          <nuxt-link tag="li" to="/combat/actions">Actions in Combat</nuxt-link>
          <nuxt-link tag="li" to="/combat/attacking">Attacking</nuxt-link>
          <nuxt-link tag="li" to="/combat/combat-sequence">Combat Sequence</nuxt-link>
          <nuxt-link tag="li" to="/combat/cover">Cover</nuxt-link>
          <nuxt-link tag="li" to="/combat/damage-and-healing">Damage &amp; Healing</nuxt-link>
          <nuxt-link tag="li" to="/combat/mounted-combat">Mounted combat</nuxt-link>
          <nuxt-link tag="li" to="/combat/movement-in-combat">Movement in Combat</nuxt-link>
          <nuxt-link tag="li" to="/combat/underwater-combat">Underwater COmbat</nuxt-link>
        </ul>
        <nuxt-link tag="li" to="/spells/spells-list">Spells</nuxt-link>
        <nuxt-link tag="li" to="/monsters/monster-list">Monsters</nuxt-link>
      </ul>
    </div>
    <div class="content-wrapper">
    <nuxt/>
    </div>
  </div>
</template>

<style lang="scss">
@import '../assets/main';

.app-wrapper {
  display: flex;
  flex-direction: row;
  align-content: stretch;
  height: 100vh;
  width: 100vw;
  background: $color-fog;
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 2;
}

.content-wrapper {
  padding: 2rem 1rem;
  overflow: auto;
  flex-grow: 1;
  background: white;
  max-width: 60rem;
}

.sidebar {
  color: white;
  background-color: $color-basalt;
  width: 16rem;
  min-width: 14rem;
  overflow-y: auto;
  font-size: 15px;

  
  h1 {
    display: block;
    background-color: #E74C3C; 
    padding: 1rem 3rem 1rem 1rem;
    cursor: pointer;
    margin-top: 0;
  }

  ul {
    padding: $pad-sm $pad-md $pad-sm $pad-xs;
    list-style: none;
    li {
      padding: $pad-md $pad-md;
      opacity: 0.8;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }
    }
    ul {
      background-color: $color-darkness;
      opacity: 0.8;
      padding: $pad-sm $pad-md $pad-sm $pad-lg;
      margin: 0 -1rem;
      
      li {
        padding: $pad-sm $pad-md;
      }
    }
  }
}
</style>

