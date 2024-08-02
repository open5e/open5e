import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import CharacterSectionPage from '~/pages/characters/[section].vue';

const { data: section } = useFindOne('v1/section', 'alignment');

const page = await mountSuspended(CharacterSectionPage);

test('/character/[id] page can mount', async () => {
  expect(page);
});

test('/character/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(section.value.name);
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: ref({
      slug: 'alignment',
      name: 'Alignment',
      desc: 'A typical creature in the game world has an alignment, which broadly describes its moral and personal attitudes. ...',
      document__license_url: 'http://open5e.com/legal',
      document__slug: 'wotc-srd',
      document__title: '5e Core Rules',
      document__url:
        'http://dnd.wizards.com/articles/features/systems-reference-document-srd',
      parent: 'Characters',
    }),
  });
});
