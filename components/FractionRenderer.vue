<template>
  <span>
    {{ fraction(challenge) }}
  </span>
</template>

<script setup>
defineProps({
  challenge: {
    type: [Number, String],
    default: 0,
  },
});
function fraction(chal) {
  const chalValue = {
    0.125: '1/8',
    0.25: '1/4',
    0.5: '1/2',
  };
  if (chalValue.hasOwnProperty(chal)) {
    return chalValue[chal];
  } else {
    return chal;
  }
}
</script>

<style></style>
