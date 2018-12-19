<template>
<span>
  <span v-if="statBonus >= 0 ">+</span>
  <span>{{statBonus}}</span>
</span>
</template>


<script>
export default {
  computed: {
    statBonus: function () {
      return (Math.floor((this.stat - 10)/2));
    }
  },
  props: {
    stat: Number,
  },
}
</script>

<style>
</style>