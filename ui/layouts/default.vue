<template>
  <div class="app-wrapper">
    <div class="sidebar">
      <nuxt-link tag="h1" to="/">Open5e</nuxt-link>
      <ul>
        <nuxt-link tag="li" to="/rules/combat">Combat</nuxt-link>
        <ul>
          <nuxt-link tag="li" to="/rules/combat/actions">Actions in Combat</nuxt-link>
          <nuxt-link tag="li" to="/rules/combat/attacking">Attacking</nuxt-link>
          <nuxt-link tag="li" to="/rules/combat/combat-sequence">Combat Sequence</nuxt-link>
          <nuxt-link tag="li" to="/rules/combat/cover">Cover</nuxt-link>
          <nuxt-link tag="li" to="/rules/combat/damage-and-healing">Damage &amp; Healing</nuxt-link>
          <nuxt-link tag="li" to="/rules/combat/mounted-combat">Mounted combat</nuxt-link>
          <nuxt-link tag="li" to="/rules/combat/movement-in-combat">Movement in Combat</nuxt-link>
          <nuxt-link tag="li" to="/rules/combat/underwater-combat">Underwater COmbat</nuxt-link>
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

.content-wrapper {
  padding: 2rem 1rem;
  overflow: auto;
  flex-grow: 1;
  background: white;
  max-width: 60rem;
}

.sidebar {
  color: white;
  background-color: black;
  width: 16rem;

  
  h1 {
    display: block;
    background-color: #E74C3C; 
    padding: 1rem 3rem 1rem 1rem;
    cursor: pointer;
    margin-top: 0;
  }

  ul {
    margin-top: 1rem;
    padding-left: 1rem;
    list-style: none;
    li {
      margin-bottom: 1rem;
    }
    ul {
      opacity: 0.8;
    }
  }
}
</style>

