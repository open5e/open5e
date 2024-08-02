import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import GameplaySectionsPage from '~/pages/gameplay-mechanics/index.vue';

const page = await mountSuspended(GameplaySectionsPage);
const { data: sections } = useSections('Gameplay Mechanics');

// tests
test('/gameplay-mechanics page can mount', async () => {
  expect(page);
});

test('/gameplay-mechanics renders one link per section', async () => {
  const numberOfAnchorTags = (page.html().match(/<a /g) || []).length;
  expect(numberOfAnchorTags).toEqual(sections.value.length);
});

// mocks
mockNuxtImport('useSections', () => {
  return () => ({
    data: ref([
      { slug: 'abilities', name: 'Abilities', parent: 'Gameplay Mechanics' },

      {
        slug: 'between-adventures',
        name: 'Between Adventures',
        parent: 'Gameplay Mechanics',
      },
      {
        slug: 'environment',
        name: 'Environment',
        parent: 'Gameplay Mechanics',
      },
    ]),
  });
});
