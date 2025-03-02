<template>
  <table>
    <thead>
      <tr>
        <th>Level</th>
        <th>Proficiency Bonus</th>
        <th>Features</th>
      </tr>
    </thead>
    <tr v-for="level in levels" :key="level">
      <!-- 1st column: level -->
      <td>{{ level }}</td>

      <!-- 2nd column: proficiency bonus -->
      <td>{{ proficiencies[level] ?? '-' }}</td>

      <!-- 3rd column: class features -->
      <td v-if="!classFeatures[level]">–</td>
      <td v-else>
        <span
          v-for="feature in classFeatures[level]"
          :key="feature.key"
          class="after:content-[',_'] last:after:content-['']"
        >
          {{ feature.name + (feature.detail ? ` (${feature.detail})` : '') }}
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
const props = defineProps({
  classFeatures: { type: Object, default: () => {} },
  proficiencyBonus: { type: Object, default: () => {} },
});

const proficiencies = computed(() => {
  const { table_data: data } = props.proficiencyBonus[0];
  return data.reduce((output, tableRow) => {
    output[tableRow.level] = tableRow.column_value;
    return output;
  }, Array(20));
});

// helper function for rendering reade-friendlt titles from feature keys
const parseFeatures = (input) =>
  input.split('_').slice(-1).pop().split('-').join(' ');

const levels = [...Array(20).keys()].map((i) => i + 1);
</script>
