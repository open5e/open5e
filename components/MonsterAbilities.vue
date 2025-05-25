<script lang="ts">
/**
 * AbilityTable.vue - Displays ability scores and saving throws for a monster.
 * Renders two side-by-side tables for physical and mental abilities. The mods
 * and saves are clickable, and trigger dice rolls.
 *
 * -= PROPS (INPUTS) =-
 * @prop {Object} monster - Monster data returned by Open5e API. It contains:
 *   @property {Object} monster.ability_scores – Keys are ability names, values
 *     are the raw ability score for that ability
 *   @property {Object} monster.modifiers – Keys are ability names, values are
 *     ability modifiers derived from the scores
 *   @property {Object} monster.saving_throws – keys are ability names, value
 *     are saving throw modifiers. These can be undefined.
 *
 * -= DEPENDENCIES =-
 * @composable useFormatModifier - Formats modifiers into signed strings (e.g., +2, -1)
 * @composable useDiceRoller - Triggers a dice roll when a modifier or save is clicked
 *
 */
</script>

<template>
  <!-- Visually hidden table label, used by screen readers -->
  <label
    id="abilities-table-label"
    class="sr-only"
    role="note"
    aria-live="polite"
  >
    Abilities and Saving Throws
  </label>

  <!-- Flex container for containing left & right tables -->
  <div class="flex items-center justify-center gap-4 sm:justify-normal">
    <!-- Generate a table for each of the two sets of ability data -->
    <table
      v-for="(value, title) in tableData"
      :key="title"
      class="my-0 table-fixed border-0"
      aria-labelledby="abilities-table-label"
    >
      <thead>
        <tr class="border-none">
          <th
            scope="col"
            class="border-none"
          >
            <span class="sr-only">Ability</span>
          </th>
          <th
            scope="col"
            class="border-none"
          >
            <span class="sr-only">Score</span>
          </th>
          <th
            scope="col"
            class="border-none pb-1 uppercase"
          >
            Mod
          </th>
          <th
            scope="col"
            class="border-none pb-1 uppercase"
          >
            Save
          </th>
        </tr>
      </thead>
      <tbody class="w-1/2 table-fixed">
        <tr
          v-for="(data, ability) in value"
          :key="ability"
          class="border-none"
        >
          <th
            scope="row"
            class="border-none bg-fog dark:bg-basalt"
          >
            {{ data.shortName }}
          </th>
          <td class="border-none bg-fog dark:bg-basalt">
            {{ data.score }}
          </td>
          <td
            :class="rollableLinkClasses"
            @click="useDiceRoller(data.mod)"
          >
            {{ useFormatModifier(data.mod) }}
          </td>
          <td
            :class="rollableLinkClasses"
            @click="useDiceRoller(data.save)"
          >
            {{ useFormatModifier(data.save) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { useFormatModifier } from '@/composables/useFormatModifier';
import { useDiceRoller } from '@/composables/useDiceRoller';

const props = defineProps({
  monster: { type: Object, default: () => {} },
});

const rollableLinkClasses
  = 'cursor-pointer bg-smoke text-center font-bold text-blood hover:text-black dark:bg-charcoal dark:hover:text-fog';

const tableData = computed(() => {
  // destructure data from props
  const {
    ability_scores: scores,
    modifiers,
    saving_throws: saves,
  } = props.monster;

  type AbilityScoreData = {
    shortName: string;
    score: number;
    mod: number;
    save: number;
  };

  // iterate over abilities, split abilities into 'physical' and 'mental'
  return Object.keys(scores).reduce(
    (acc, ability) => {
      // format data
      const data = {
        shortName: ability.substring(0, 3).toUpperCase(),
        score: scores[ability],
        mod: modifiers[ability],
        save: saves[ability] ?? modifiers[ability],
      };

      // add data to either 'physical' or 'mental' abilities
      if (['STR', 'DEX', 'CON'].includes(data.shortName)) {
        acc.physicalAbilityScores[ability] = data;
      } else acc.mentalAbilityScores[ability] = data;

      return acc;
    },
    {
      physicalAbilityScores: {} as Record<string, AbilityScoreData>,
      mentalAbilityScores: {} as Record<string, AbilityScoreData>,
    },
  );
});
</script>
