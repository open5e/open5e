<template>
  <span>
    <span v-if="statBonus >= 0">+</span>
    <span>{{ statBonus }}</span>
  </span>
</template>

<script>
export default {
  props: {
    stat: { type: Number, default: 0 },
    type: { type: String, default: 'score' },
  },
  computed: {
    statBonus: function () {
      if (this.type === 'score') {
        return Math.floor((this.stat - 10) / 2);
      } else {
        return this.stat;
      }
    },
  },
};
</script>
