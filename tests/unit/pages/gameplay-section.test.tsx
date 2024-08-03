import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import GameplaySectionPage from '~/pages/gameplay-mechanics/[section].vue';

const { data: section } = useFindOne('v1/section', 'abilities');

const page = await mountSuspended(GameplaySectionPage);

test('/gameplay-mechanics/[id] page can mount', async () => {
  expect(page);
});

test('/gameplay-mechanics/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(section.value.name);
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: ref({
      desc: "Six abilities provide a quick description of every creature's physical and mental characteristics...",
      document__license_url: 'http://open5e.com/legal',
      document__slug: 'wotc-srd',
      document__title: '5e Core Rules',
      document__url:
        'http://dnd.wizards.com/articles/features/systems-reference-document-srd',
      name: 'Abilities',
      parent: 'Gameplay Mechanics',
      slug: 'abilities',
    }),
  });
});
