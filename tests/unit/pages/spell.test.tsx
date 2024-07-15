import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import SpellPage from '~/pages/spells/[id].vue';

const { id } = useRoute().params;
const { data: spell } = useFindOne('v1/spells', id);

const page = await mountSuspended(SpellPage);

test('/spells/[id] page can mount', async () => {
  expect(page);
});

test('/spells/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(spell.name);
});

mockNuxtImport('useRoute', () => {
  return () => ({
    params: {
      id: 'magic-missile',
    },
  });
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: {
      slug: 'magic-missile',
      name: 'Magic Missile',
      desc: 'You create three glowing darts of magical force...',
      higher_level:
        'When you cast this spell using a spell slot of 2nd level or higher...',
      page: 'phb 257',
      range: '120 feet',
      target_range_sort: 120,
      components: 'V, S',
      requires_verbal_components: true,
      requires_somatic_components: true,
      requires_material_components: false,
      material: '',
      can_be_cast_as_ritual: false,
      ritual: 'no',
      duration: 'Instantaneous',
      concentration: 'no',
      requires_concentration: false,
      casting_time: '1 action',
      level: '1st-level',
      level_int: 1,
      spell_level: 1,
      school: 'Evocation',
      dnd_class: 'Sorcerer, Wizard',
      spell_lists: ['sorcerer', 'wizard'],
      archetype: '',
      circles: '',
      document__slug: 'wotc-srd',
      document__title: '5e Core Rules',
      document__license_url: 'http://open5e.com/legal',
      document__url:
        'http://dnd.wizards.com/articles/features/systems-reference-document-srd',
    },
  });
});
