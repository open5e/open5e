import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import CharacterRulesPage from '~/pages/characters/index.vue';

const page = await mountSuspended(CharacterRulesPage);
const { data: sections } = useSections('Characters', 'Character Advancement');

// tests
test('/characters page can mount', async () => {
  expect(page);
});

test('/characters renders one link per section', async () => {
  const numberOfAnchorTags = (page.html().match(/<a /g) || []).length;
  expect(numberOfAnchorTags).toEqual(sections.value.length);
});

// mocks
mockNuxtImport('useSections', () => {
  return () => ({
    data: ref([
      {
        name: 'Alignment',
        parent: 'Characters',
        slug: 'alignment',
      },
      {
        name: 'Backgrounds',
        parent: 'Characters',
        slug: 'backgrounds',
      },
      {
        name: 'Feats',
        parent: 'Characters',
        slug: 'feats',
      },
    ]),
  });
});
