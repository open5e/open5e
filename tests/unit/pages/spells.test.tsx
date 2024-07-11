import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import SpellsIndex from '~/pages/spells/index.vue';

const page = await mountSuspended(SpellsIndex);

test('/spells page can mount', async () => {
  expect(page);
});

const { data } = useAllSpells();

test('/spells renders one link per spell', async () => {
  const numberOfAnchorTags = (page.html().match(/<a /g) || []).length;
  expect(numberOfAnchorTags).toEqual(data.value.length);
});

mockNuxtImport('useAllSpells', async () => {
  return () => ({
    data: {
      value: [
        {
          slug: 'magic-missile',
          name: 'Magic Missile',
          school: 'Evocation',
          level_int: 1,
          component: 'V, S',
          dnd_class: 'Sorcerer, Wizard',
        },
        {
          slug: 'burning-hands',
          name: 'Burning Hands',
          school: 'Evocation',
          level_int: 1,
          component: 'V, S',
          dnd_class: 'Cleric, Sorcerer, Warlock, Wizard',
        },
        {
          slug: 'misty-step',
          name: 'Misty Step',
          school: 'Conjuration',
          level_int: 2,
          component: 'V',
          dnd_class: 'Druid, Paladin, Sorcerer, Warlock, Wizard',
        },
      ],
    },
  });
});
