<template>
  <section class="container docs-container">
    <h1>Combat</h1>
    <div class="docs-toc">
      <ul>
        <li><nuxt-link tag="a" to="/rules/combat/actions">Actions in Combat</nuxt-link></li>
        <li><nuxt-link tag="a" to="/rules/combat/attacking">Attacking</nuxt-link></li>
        <li><nuxt-link tag="a" to="/rules/combat/combat-sequence">Combat Sequence</nuxt-link></li>
        <li><nuxt-link tag="a" to="/rules/combat/cover">Cover</nuxt-link></li>
        <li><nuxt-link tag="a" to="/rules/combat/damage-and-healing">Damage &amp; Healing</nuxt-link></li>
        <li><nuxt-link tag="a" to="/rules/combat/mounted-combat">Mounted combat</nuxt-link></li>
        <li><nuxt-link tag="a" to="/rules/combat/movement-in-combat">Movement in Combat</nuxt-link></li>
        <li><nuxt-link tag="a" to="/rules/combat/underwater-combat">Underwater COmbat</nuxt-link></li>
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

