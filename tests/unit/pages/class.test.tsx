import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import ClassPage from '~/pages/classes/[className]/index.vue';

const { data: className } = useFindOne('v2/classes', 'srd_fighter');

const page = await mountSuspended(ClassPage);

test('/classes/[className] page can mount', async () => {
  expect(page);
});

test('/classes/[className] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(unref(className)?.name);
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: {
      url: 'http://localhost:8000/v2/classes/srd_barbarian/',
      key: 'srd_barbarian',
      hit_points: {
        hit_dice: 'd12',
        hit_dice_name: '1d12 per Barbarian level',
        hit_points_at_1st_level: '12 + your Constitution modifier',
        hit_points_at_higher_levels:
          '1d12 (or 7) + your Constitution modifier per barbarian level after 1st',
      },
      name: 'Barbarian',
      hit_dice: 'd12',
      document: 'http://localhost:8000/v2/documents/srd/',
      subclass_of: null,
      features: [
        {
          key: 'srd_barbarian_ability-score-improvement',
          name: 'Ability Score Improvement',
          desc: 'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature.',
        },
        {
          key: 'srd_barbarian_brutal-critical',
          name: 'Brutal Critical',
          desc: 'Beginning at 9th level, you can roll one additional weapon damage die when determining the extra damage for a critical hit with a melee attack.\r\n\r\nThis increases to two additional dice at 13th level and three additional dice at 17th level.',
        },
        {
          key: 'srd_barbarian_danger-sense',
          name: 'Danger Sense',
          desc: 'At 2nd level, you gain an uncanny sense of when things nearby aren’t as they should be, giving you an edge when you dodge away from danger.\r\n\r\nYou have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can’t be blinded, deafened, or incapacitated.',
        },
        {
          key: 'srd_barbarian_extra-attack',
          name: 'Extra Attack',
          desc: 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.',
        },
        {
          key: 'srd_barbarian_fast-movement',
          name: 'Fast Movement',
          desc: 'Starting at 5th level, your speed increases by 10 feet while you aren’t wearing heavy armor.',
        },
        {
          key: 'srd_barbarian_feral-instinct',
          name: 'Feral Instinct',
          desc: 'By 7th level, your instincts are so honed that you have advantage on initiative rolls.\r\n\r\nAdditionally, if you are surprised at the beginning of combat and aren’t incapacitated, you can act normally on your first turn, but only if you enter your rage before doing anything else on that turn.',
        },
        {
          key: 'srd_barbarian_indomitable-might',
          name: 'Indomitable Might',
          desc: 'Beginning at 18th level, if your total for a Strength check is less than your Strength score, you can use that score in place of the total.',
        },
        {
          key: 'srd_barbarian_persistent-rage',
          name: 'Persistent Rage',
          desc: 'Beginning at 15th level, your rage is so fierce that it ends early only if you fall unconscious or if you choose to end it.',
        },
        {
          key: 'srd_barbarian_primal-champion',
          name: 'Primal Champion',
          desc: 'At 20th level, you embody the power of the wilds. Your Strength and Constitution scores increase by 4. Your maximum for those scores is now 24.',
        },
        {
          key: 'srd_barbarian_primal-path',
          name: 'Primal Path',
          desc: 'At 3rd level, you choose a path that shapes the nature of your rage. Choose the Path of the Berserker or the Path of the Totem Warrior, both detailed at the end of the class description. Your choice grants you features at 3rd level and again at 6th, 10th, and 14th levels.',
        },
        {
          key: 'srd_barbarian_rage',
          name: 'Rage',
          desc: "In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.\r\n\r\nWhile raging, you gain the following benefits if you aren't wearing heavy armor:\r\n\r\n* You have advantage on Strength checks and Strength saving throws.\r\n* When you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian, as shown in the Rage Damage column of the Barbarian table.\r\n* You have resistance to bludgeoning, piercing, and slashing damage. \r\n\r\nIf you are able to cast spells, you can't cast them or concentrate on them while raging.\r\n\r\nYour rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven't attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action.\r\n\r\nOnce you have raged the number of times shown for your barbarian level in the Rages column of the Barbarian table, you must finish a long rest before you can rage again.",
        },
        {
          key: 'srd_barbarian_reckless-attack',
          name: 'Reckless Attack',
          desc: 'Starting at 2nd level, you can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn.',
        },
        {
          key: 'srd_barbarian_relentless-rage',
          name: 'Relentless Rage',
          desc: 'Starting at 11th level, your rage can keep you fighting despite grievous wounds. If you drop to 0 hit points while you’re raging and don’t die outright, you can make a DC 10 Constitution saving throw. If you succeed, you drop to 1 hit point instead.\r\n\r\nEach time you use this feature after the first, the DC increases by 5. When you finish a short or long rest, the DC resets to 10.',
        },
        {
          key: 'srd_barbarian_unarmored-defense',
          name: 'Unarmored Defense',
          desc: 'While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.',
        },
      ],
      levels: {
        '12': {
          features: ['srd_barbarian_ability-score-improvement'],
          'proficiency-bonus': 4,
          level: 12,
        },
        '16': {
          features: ['srd_barbarian_ability-score-improvement'],
          'proficiency-bonus': 5,
          level: 16,
        },
        '19': {
          features: ['srd_barbarian_ability-score-improvement'],
          'proficiency-bonus': 6,
          level: 19,
        },
        '4': {
          features: ['srd_barbarian_ability-score-improvement'],
          'proficiency-bonus': 2,
          level: 4,
        },
        '8': {
          features: ['srd_barbarian_ability-score-improvement'],
          'proficiency-bonus': 3,
          level: 8,
        },
        '13': {
          features: ['srd_barbarian_brutal-critical'],
          'proficiency-bonus': 5,
          level: 13,
        },
        '17': {
          features: ['srd_barbarian_brutal-critical'],
          'proficiency-bonus': 6,
          level: 17,
        },
        '9': {
          features: ['srd_barbarian_brutal-critical'],
          'proficiency-bonus': 4,
          level: 9,
        },
        '2': {
          features: [
            'srd_barbarian_danger-sense',
            'srd_barbarian_reckless-attack',
          ],
          'proficiency-bonus': 2,
          level: 2,
        },
        '5': {
          features: [
            'srd_barbarian_extra-attack',
            'srd_barbarian_fast-movement',
          ],
          'proficiency-bonus': 3,
          level: 5,
        },
        '7': {
          features: ['srd_barbarian_feral-instinct'],
          'proficiency-bonus': 3,
          level: 7,
        },
        '18': {
          features: ['srd_barbarian_indomitable-might'],
          'proficiency-bonus': 6,
          level: 18,
        },
        '15': {
          features: ['srd_barbarian_persistent-rage'],
          'proficiency-bonus': 5,
          level: 15,
        },
        '20': {
          features: ['srd_barbarian_primal-champion'],
          'proficiency-bonus': 6,
          level: 20,
        },
        '3': {
          features: ['srd_barbarian_primal-path'],
          'proficiency-bonus': 2,
          level: 3,
        },
        '1': {
          features: ['srd_barbarian_rage', 'srd_barbarian_unarmored-defense'],
          'proficiency-bonus': 2,
          level: 1,
        },
        '11': {
          features: ['srd_barbarian_relentless-rage'],
          'proficiency-bonus': 4,
          level: 11,
        },
      },
    },
  });
});

mockNuxtImport('useFindMany', () => {
  return () => ({
    data: [
      {
        key: 'srd_champion',
        name: 'Champion',
      },
    ],
  });
});
