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
      if (this.type === 'score') {
        return Math.floor((this.stat -10)/2);
      }
      else return this.stat;
    }
  },
  props: {
    stat: Number,
    type: {
      type: String,
      default: "score"
    }
  },
}
</script>

<style>
</style>