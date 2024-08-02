import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import CombatRulesPage from '~/pages/combat/index.vue';

const page = await mountSuspended(CombatRulesPage);
const { data: combatSections } = useSections('Combat');

// tests
test('/combat page can mount', async () => {
  expect(page);
});

test('/combat renders one link per sections', async () => {
  const numberOfAnchorTags = (page.html().match(/<a /g) || []).length;
  expect(numberOfAnchorTags).toEqual(combatSections.value.length);
});

// mocks
mockNuxtImport('useSections', () => {
  return () => ({
    data: ref([
      {
        name: 'Actions in Combat',
        parent: 'Combat',
        slug: 'actions-in-combat',
      },
      {
        name: 'Attacking',
        parent: 'Combat',
        slug: 'attacking',
      },
      {
        name: 'Combat Sequence',
        parent: 'Combat',
        slug: 'combat-sequence',
      },
    ]),
  });
});
