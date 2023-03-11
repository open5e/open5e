<template>
  <section class="container docs-container">
    <h1>Combat</h1>
    <div class="docs-toc">
      <ul>
        <li><nuxt-link tag="a" to="/combat/actions">Actions in Combat</nuxt-link></li>
        <li><nuxt-link tag="a" to="/combat/attacking">Attacking</nuxt-link></li>
        <li><nuxt-link tag="a" to="/combat/combat-sequence">Combat Sequence</nuxt-link></li>
        <li><nuxt-link tag="a" to="/combat/cover">Cover</nuxt-link></li>
        <li><nuxt-link tag="a" to="/combat/damage-and-healing">Damage &amp; Healing</nuxt-link></li>
        <li><nuxt-link tag="a" to="/combat/mounted-combat">Mounted combat</nuxt-link></li>
        <li><nuxt-link tag="a" to="/combat/movement-in-combat">Movement in Combat</nuxt-link></li>
        <li><nuxt-link tag="a" to="/combat/underwater-combat">Underwater Combat</nuxt-link></li>
      </ul>
    </div>
  </section>
</template>

<script>
import MdViewer from '~/components/MdViewer'

export default {
  components: {
    MdViewer
  },
}
</script>

<style>
</style>

