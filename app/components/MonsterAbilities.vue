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
 *   @property {Object} monster.saving_throws – keys are ability names, value
 *     are saving throw modifiers. These can be undefined.
 */
</script>

<template>
  <!-- Flex container for containing left & right tables -->
  <div class="flex items-center justify-center gap-4 sm:justify-normal">
    <!-- Generate a table for each of the two sets of ability data -->
    <table
      v-for="group in tableData"
      :key="group.caption"
      class="my-0 table-fixed border-0"
    >
      <caption class="sr-only">{{ group.caption }}</caption>
      <thead>
        <tr class="border-none">
          <th scope="col" class="border-none">
            <span class="sr-only">Ability</span>
          </th>
          <th scope="col" class="border-none">
            <span class="sr-only">Score</span>
          </th>
          <th scope="col" class="border-none pb-1 uppercase">
            Mod
          </th>
          <th scope="col" class="border-none pb-1 uppercase">
            Save
          </th>
        </tr>
      </thead>

      <tbody class="w-1/2 table-fixed">
        <tr
          v-for="(data, ability) in group.scores"
          :key="ability"
          class="border-none"
        >
          <th scope="row" class="border-none bg-fog dark:bg-basalt">
            {{ data.shortName }}
          </th>
          <td class="border-none bg-fog dark:bg-basalt">
            {{ data.score }}
          </td>
          <td
            :class="rollableLinkClasses"
            @click="handleRoll(data.mod, 'check', ability, monster.name)"
          >
            {{ formatModifier(data.mod) }}
          </td>
          <td
            :class="rollableLinkClasses"
            @click="handleRoll(data.save.toString(), 'save', ability, monster.name)"
          >
            {{ formatModifier(data.save) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { formatModifier, formatAbilityName } from '@/helpers';
import type { Creature } from '@/types';
const rollDice = useDiceRoller();

const props = defineProps<{ monster: Creature }>();

const rollableLinkClasses
  = 'cursor-pointer bg-smoke text-center font-bold text-blood hover:text-black dark:bg-charcoal dark:hover:text-fog';

type AbilityScoreData = {
  shortName: string;
  score: number;
  mod: string;
  save: number;
};

const ABILITY_GROUPS = [
  { caption: 'Physical Abilities', keys: ['STR', 'DEX', 'CON'] },
  { caption: 'Mental Abilities',   keys: ['WIS', 'INT', 'CHA'] },
];

const groupAbilityScores = (keys: string[], scoreData: AbilityScoreData[]) => (
  Object.fromEntries(
    scoreData
      .filter(a => keys.includes(a.shortName))
      .map(a => [a.shortName, a])
));

const tableData = computed(() => {
  const { ability_scores: scores, saving_throws: saves } = props.monster;
  const keys = Object.keys(scores) as (keyof typeof scores)[];

  const scoreData = keys.map(ability => {
    const formattedMod = formatModifier(scores[ability], { inputType: 'score' });
    return {
      shortName: ability.substring(0, 3).toUpperCase(),
      score: scores[ability],
      mod: formattedMod,
      save: saves[ability] ?? formattedMod,
    };
  });

  return ABILITY_GROUPS.map(({ caption, keys }) => ({
    caption,
    scores: groupAbilityScores(keys, scoreData),
  }));
});

const handleRoll = (modifier: string, rollType: 'check' | 'save', title: string, subtitle: string) => {
  const formattedTitle = `${formatAbilityName(title)} ${rollType === 'check' ? 'Test' : 'Saving Throw'}`;
  rollDice(modifier, { title: formattedTitle, subtitle });
};
</script>
