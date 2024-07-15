import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import MonstersIndex from '~/pages/monsters/index.vue';

const page = await mountSuspended(MonstersIndex);

test('/monsters page can mount', async () => {
  expect(page);
});

const { data: monsters } = useAllMonsters();

test('/monsters renders one link per monster', async () => {
  const numberOfAnchorTags = (page.html().match(/<a href/g) || []).length;
  expect(numberOfAnchorTags).toEqual(monsters.length);
});

mockNuxtImport('useAllMonsters', () => {
  return () => ({
    data: [
      {
        name: 'Goblin',
        slug: 'goblin',
        cr: 0.25,
        type: 'Humanoid',
        size: 'Small',
        hit_points: 7,
      },
      {
        name: 'Orc',
        slug: 'orc',
        cr: 0.5,
        type: 'Humanoid',
        size: 'Medium',
        hit_points: 15,
      },
      {
        name: 'Aboleth',
        slug: 'aboleth',
        cr: 10.0,
        type: 'Aberration',
        size: 'Large',
        hit_points: 135,
      },
    ],
  });
});
