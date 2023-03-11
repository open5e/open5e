<template>
<span>
  {{fraction(challenge)}}
</span>
</template>


<script>
export default {
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
  props: {
    challenge: [Number, String],
  },
}
</script>

<style>
</style>