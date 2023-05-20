<template>
  <span>
    {{ fraction(challenge) }}
  </span>
</template>


<script>
export default {
  props: {
    challenge: [Number, String],
  },
  methods: {
    fraction: function (chal) {
      const chalValue = {
        0.125 : '1/8',
        0.25 : '1/4',
        0.5 : '1/2'
      }
      if (chalValue.hasOwnProperty(chal)) {
        return chalValue[chal];
      }
      else {
        return chal;
      }
    }
  },
}
</script>

<style>
</style>