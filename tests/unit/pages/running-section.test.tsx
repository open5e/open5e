import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import RunningSectionPage from '~/pages/running/[id].vue';

const { data: section } = useFindOne('v1/section', 'abilities');

const page = await mountSuspended(RunningSectionPage);

test('/running/[id] page can mount', async () => {
  expect(page);
});

test('/running/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(section.value.name);
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: ref({
      desc: "Conditions alter a creature's capabilities in a variety of ways ...",
      document__license_url: 'http://open5e.com/legal',
      document__slug: 'wotc-srd',
      document__title: '5e Core Rules',
      document__url:
        'http://dnd.wizards.com/articles/features/systems-reference-document-srd',
      name: 'Conditions',
      parent: 'Rules',
      slug: 'conditions',
    }),
  });
});
