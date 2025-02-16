import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import SpellPage from '~/pages/spells/[id].vue';

const { data: spell } = useFindOne(
  'v2/spells',
  'srd_adamantine-armor-breastplate',
);

const page = await mountSuspended(SpellPage);

test('/magic-items/[id] page can mount', async () => {
  expect(page);
});

test('/magic-items/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(unref(spell)?.name);
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: {
      name: 'Magic Missile',
      key: 'srd_magic-missile',
      url: 'http://localhost:8000/v2/spells/srd_magic-missile/',
      school: { name: 'Evocation' },
      desc: 'You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4 + 1 force damage to its target. The darts all strike simultaneously, and you can direct them to hit one creature or several.',
      level: 1,
      higher_level:
        'When you cast this spell using a spell slot of 2nd level or higher, the spell creates one more dart for each slot level above 1st.',
      range_text: '120 feet',
      ritual: false,
      casting_time: 'action',
      verbal: true,
      somatic: true,
      material: false,
      material_specified: '',
      material_cost: null,
      material_consumed: false,
      saving_throw_ability: '',
      attack_roll: false,
      damage_roll: '',
      damage_types: [],
      duration: 'instantaneous',
      shape_type: null,
      shape_size: null,
      concentration: false,
      document: {
        name: 'System Reference Document',
        publisher: { name: 'Wizards of the Coast' },
      },
      classes: [
        { name: 'Sorcerer', url: 'v2/classes/srd_sorcerer/' },
        { name: 'Wizard', url: 'v2/classes/srd_wizard/' },
      ],
    },
  });
});
