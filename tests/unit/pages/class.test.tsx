import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { unref } from 'vue';
import ClassPage from '~/pages/classes/[className]/index.vue';

const { data: className } = useFindOne(API_ENDPOINTS.classes, 'srd_barbarian');

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: {
      key: 'srd_barbarian',
      features: [
        {
          key: 'srd_barbarian_proficiencies',
          name: 'Proficiencies',
          desc: '**Armor:** Light armor, medium armor, shields\n\n**Weapons:** Simple weapons, martial weapons\n\n**Tools:** None\n\n**Saving Throws:** Strength, Constitution\n\n**Skills:** Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival',
          gained_at: [],
          table_data: [],
          feature_type: 'PROFICIENCIES',
        },
        {
          key: 'srd_barbarian_proficiency-bonus',
          name: 'Proficiency Bonus',
          desc: '[Column data]',
          gained_at: [],
          table_data: [
            {
              level: 1,
              column_value: '+2',
            },
            {
              level: 2,
              column_value: '+2',
            },
            {
              level: 3,
              column_value: '+2',
            }
          ],
          feature_type: 'PROFICIENCY_BONUS',
        },
        {
          key: 'srd_barbarian_rage',
          name: 'Rage',
          desc: 'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.\n\n\n\nWhile raging, you gain the following benefits if you aren\'t wearing heavy armor:\n\n\n\n* You have advantage on Strength checks and Strength saving throws.\n\n* When you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian, as shown in the Rage Damage column of the Barbarian table.\n\n* You have resistance to bludgeoning, piercing, and slashing damage. \n\n\n\nIf you are able to cast spells, you can\'t cast them or concentrate on them while raging.\n\n\n\nYour rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven\'t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action.\n\n\n\nOnce you have raged the number of times shown for your barbarian level in the Rages column of the Barbarian table, you must finish a long rest before you can rage again.',
          gained_at: [
            {
              level: 1,
              detail: null,
            },
          ],
          table_data: [],
          feature_type: 'CLASS_FEATURE',
        },
      ],
      name: 'Barbarian',
    },
  });
});

mockNuxtImport('useFindMany', () => {
  return () => ({
    data: [
      {
        key: 'srd_path-of-the-berserker',
        name: 'Path of the Berserker',
        document: {
          name: 'System Reference Document 5.1',
          key: 'srd-2014',
        },
      },
    ],
  });
});

test('/classes/[className] page can mount', async () => {
  const page = await mountSuspended(ClassPage);
  expect(page);
});

test('/classes/[className] page renders title', async () => {
  const page = await mountSuspended(ClassPage);
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(unref(className)?.name);
});
