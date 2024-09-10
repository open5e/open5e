<template>
  <table>
    <tr>
      <th>Level</th>
      <th>Proficiency Bonus</th>
      <th>Features</th>
    </tr>
    <tr v-for="(value, key, index) in classFeatures" :key="index">
      <td>{{ key }}</td>
      <td class="before:content-['+']">
        {{ value['proficiency-bonus'] }}
      </td>
      <td>
        <span
          v-for="feature in value.features"
          :key="feature"
          class="capitalize after:content-[',_'] last:after:content-['']"
        >
          {{ parseFeatures(feature) }}
        </span>
      </td>
    </tr>
  </table>
  <!-- TODO: Spell Slots - These are not currently returned by the API  -->
  <!-- Below is an exaple table column layout -->
  <!-- <table>
    <tr>
      <th rowspan="2">Level</th>
      <th rowspan="2">Proficiency Bonus</th>
      <th rowspan="2">Features</th>
      <th rowspan="2">Cantrips Known</th>
      <th rowspan="2">Spells Known</th>
      <th colspan="9">Spell Slots per Spell Level</th>
    </tr>
    <tr>
      <th>1st</th>
      <th>2nd</th>
      <th>3rd</th>
      <th>4th</th>
      <th>5th</th>
      <th>6th</th>
      <th>7th</th>
      <th>8th</th>
      <th>9th</th>
    </tr>
  </table> -->
</template>

<script setup>
defineProps({
  classFeatures: { type: Object, default: () => {} },
});

// helper function for rendering reade-friendlt titles from feature keys
const parseFeatures = (input) =>
  input.split('_').slice(-1).pop().split('-').join(' ');
</script>
