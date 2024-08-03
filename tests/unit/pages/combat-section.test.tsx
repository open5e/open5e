import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import CombatSectionPage from '~/pages/combat/[section].vue';

const { data: section } = useFindOne('v1/section', 'actions-in-combat');

const page = await mountSuspended(CombatSectionPage);

test('/combat/[id] page can mount', async () => {
  expect(page);
});

test('/combat/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(section.value.name);
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: ref({
      slug: 'actions-in-combat',
      name: 'Actions in Combat',
      desc: 'When you take your action on your turn, you can take one of the actions presented here...',
      document__license_url: 'http://open5e.com/legal',
      document__slug: 'wotc-srd',
      document__title: '5e Core Rules',
      document__url:
        'http://dnd.wizards.com/articles/features/systems-reference-document-srd',
      parent: 'Combat',
    }),
  });
});
