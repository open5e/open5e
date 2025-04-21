<script>
/**
 * ClassTable.vue - Displays a table of class progression data - for each level
 * features, proficiencies, and spell slots are rendered.
 *
 * -= PROPS / INPUTS =-
 * @prop {Object} classFeatures -  Maps class level (key) to abilities gained
 * at that level (value).
 *  @property {Object} classFeatures[level] - Array of features per class level
 *     @property {String} feature.key - The unique key for the feature
 *     @property {String} feature.name - Display name for the feature
 *     @property {String} [feature.detail] - Additional contextual information
 * @prop {Object} proficiencyBonus - Maps char. level (key) to prof. bonus (value)
 * @prop {Array} spellSlots - Spell slot information per spell level
 * @prop {Array} classResourceTableColumns - Extra columns for class-specific resources
 *
 *  -= DEPENDENCIES =-
 *  @function titleCaseToKebabCase – "Title Case" -> "kebab-case". Used to generate hash-links
 */
</script>

<template>
  <table>
    <thead>
      <tr>
        <th rowspan="2">
          Level
        </th>
        <th
          v-if="proficiencies"
          rowspan="2"
        >
          Proficiency Bonus
        </th>
        <th rowspan="2">
          Features
        </th>
        <th
          v-for="title in additionalColumnHeaders"
          :key="title"
          rowspan="2"
        >
          {{ title }}
        </th>
        <th
          v-if="spellslotColumnHeaders"
          :colspan="spellslotColumnHeaders.length"
        >
          Spell Slots by Level
        </th>
      </tr>
      <tr>
        <th
          v-for="level in spellslotColumnHeaders"
          :key="level"
        >
          {{ level }}
        </th>
      </tr>
    </thead>
    <tr
      v-for="level in levels"
      :key="level"
    >
      <!-- 1st column: level -->
      <td>{{ level }}</td>

      <!-- 2nd column: proficiency bonus -->
      <td v-if="proficiencies">
        {{ proficiencies[level] ?? '-' }}
      </td>

      <!-- 3rd column: class features -->
      <td v-if="classFeatures && !classFeatures[level]">
        –
      </td>
      <td v-else>
        <span
          v-for="(feature, index) in classFeatures?.[level]"
          :key="feature.name"
        >
          <NuxtLink
            :key="feature.key"
            :to="'#' + titleCaseToKebabCase(feature.name)"
          >
            {{ feature.name + (feature.detail ? ` (${feature.detail})` : '') }}
          </NuxtLink>
          <!-- insert commas between features -->
          <span v-if="index !== classFeatures[level].length - 1">
            {{ ', ' }}
          </span>
        </span>
      </td>

      <!-- Bonus columns for class specific resources -->
      <td
        v-for="column in additionalColumnHeaders"
        :key="column"
      >
        {{ classResourceTableData[column][level] ?? '-' }}
      </td>

      <td
        v-for="spellLevel in spellslotColumnHeaders"
        :key="spellLevel"
      >
        {{ getSpellSlots(level, spellLevel) }}
      </td>
    </tr>
  </table>
</template>

<script setup>
import { titleCaseToKebabCase } from '~/functions/titleCaseToKebabCase';

const props = defineProps({
  classFeatures: { type: Object, default: () => {} },
  proficiencyBonus: { type: Object, default: () => {} },
  spellSlots: { type: Array, default: () => [] },
  classResourceTableColumns: { type: Array, default: () => [] },
});

// Parse proficiency bonuses
const proficiencies = computed(() => {
  if (!props?.proficiencyBonus?.table_data.length > 0) return;
  const { table_data: data } = props.proficiencyBonus;
  return data.reduce((output, tableRow) => {
    output[tableRow.level] = tableRow.column_value;
    return output;
  }, Array(20));
});

// returns an array of additional columns used in this class's
const additionalColumnHeaders = computed(() => {
  if (props.classResourceTableColumns.length === 0) return;
  return props.classResourceTableColumns.map(column => column.name);
});

// parse additional class table data into a nested dict:
// columnTitle -> level -> value
const classResourceTableData = computed(() => {
  return props.classResourceTableColumns.reduce((acc, column) => {
    const { name: colName, table_data: valuePerLevel } = column;
    if (!acc[colName]) acc[colName] = {};
    valuePerLevel.forEach(({ level, column_value: value }) => {
      acc[colName][level] = value;
    });
    return acc;
  }, {});
});

// returns an array of table column headers for spell slots per level
const spellslotColumnHeaders = computed(() => {
  if (!props?.spellSlots || props.spellSlots.length === 0) return;
  return props.spellSlots.map(feature => feature.name);
});

// parses spell slot data passed via props in nested dict
// Class Level -> Spell Level -> Number of spell slots
const spellSlotTableData = computed(() => {
  const data = props.spellSlots;
  return data.reduce((acc, feature) => {
    const { name: spellLevel, table_data: slotsPerCharLevel } = feature;
    slotsPerCharLevel.forEach((item) => {
      const { level: classLevel, column_value: spellSlots } = item;
      if (!acc[classLevel]) acc[classLevel] = {};
      const spellLevelNoOrdinal = spellLevel.charAt(0);
      acc[classLevel][spellLevelNoOrdinal] = spellSlots;
    });
    return acc;
  }, {});
});

// Gets number of spell slots per class/spell level. Handles null-exceptions
const getSpellSlots = (classLevel, spellLevel) => {
  const data = spellSlotTableData.value;
  const slotsPerClassLevel = data[classLevel];
  if (!slotsPerClassLevel) return '-';
  const spellLevelNoOrdinal = spellLevel.charAt(0);
  if (!slotsPerClassLevel[spellLevelNoOrdinal]) return '–';
  return slotsPerClassLevel[spellLevelNoOrdinal];
};

// Generate an array of levels 1-20
const levels = [...Array(20).keys()].map(i => i + 1);
</script>
