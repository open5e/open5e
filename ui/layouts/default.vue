<template>
  <div class="app-wrapper">
    <div class="sidebar">
      <nuxt-link tag="h1" to="/">Open5e</nuxt-link>
      <ul>
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

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.app-wrapper {
  display: flex;
  flex-direction: row;
  align-content: stretch;
  height: 100vh;
  width: 100vw;
}

.content-wrapper {
  padding: 2rem 1rem;
  overflow: auto;
  flex-grow: 1;
}

.sidebar {
  color: white;
  background-color: black;
  margin-right: 2rem;

  
  h1 {
    display: block;
    background-color: #E74C3C; 
    padding: 1rem 3rem 1rem 1rem;
    cursor: pointer;
  }

  ul {
    margin-top: 1rem;
    padding-left: 1rem;
    list-style: none;
    li {
      margin-bottom: 1rem;
    }
  }
}
</style>

