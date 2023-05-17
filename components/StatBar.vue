<template>
  <div class="stat-group">
    <div class='stat-unit' v-for="(stat, key) in stats" v-bind:key="key">
      <span class="title-case">{{key}}</span><span>{{stat}} (<statBonus :stat="parseInt(stat)"></statBonus>)</span>
    </div>
  </div>
</template>


<script>
import statBonus from '~/components/StatBonus';

export default {
  components: {
    statBonus
  },
  props: {
    stats: {
      type: Object,
      default: function() {return {str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0}}
    },
  },
}
</script>

<style lang="scss" scoped>
.stat-group{
  display: inline-flex;
  flex-direction: row;

  .stat-unit {
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
    align-items: center;

    .title-case {
      font-weight: bold;
    }
  }
}
</style> 