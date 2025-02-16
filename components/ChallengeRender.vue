<template>
  <span> {{ challenge }} ({{ experience }} XP) </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ challenge: string | number }>(), { challenge: '0' });

const experience = computed(() => {
  const xpValues = {
    '0': 10,
    '1/8': 25,
    '1/4': 50,
    '1/2': 100,
    '1': 200,
    '2': 450,
    '3': 700,
    '4': 1100,
    '5': 1800,
    '6': 2300,
    '7': 2900,
    '8': 3900,
    '9': 5000,
    '10': 5900,
    '11': 7200,
    '12': 8400,
    '13': 10000,
    '14': 11500,
    '15': 13000,
    '16': 15000,
    '17': 18000,
    '18': 20000,
    '19': 22000,
    '20': 25000,
    '21': 33000,
    '22': 41000,
    '23': 50000,
    '24': 62000,
    '30': 155000,
  };
  if (
    Object.keys(xpValues)
      .map(k => k.toString())
      .includes(props.challenge.toString())
  ) {
    return xpValues[props.challenge].toLocaleString('en');
  } else {
    return '???';
  }
});
</script>

<style></style>
