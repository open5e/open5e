import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import MagicItemsPage from '~/pages/magic-items/index.vue';

const page = await mountSuspended(MagicItemsPage);

const magic_items_filters = {} as MagicItemsFilter;

const fields = {
  fields: [
    'slug',
    'name',
    'type',
    'rarity',
    'requires_attunement',
    'document__title',
    'document__slug',
  ].join(),
};
const { data: magic_items } = useMagicItems(magic_items_filters, fields);

// tests
test('/magic-items page can mount', async () => {
  expect(page);
});

test('/magic-items renders one link per item', async () => {
  const numberOfAnchorTags = (page.html().match(/<a /g) || []).length;
  expect(numberOfAnchorTags).toEqual(magic_items.length);
});

// mocks
mockNuxtImport('useMagicItems', () => {
  return () => ({
    data: [
      {
        slug: 'bag-of-holding',
        name: 'Bag of Holding',
        type: 'Wondrous item',
        rarity: 'uncommon',
        requires_attunement: '',
        document__slug: 'wotc-srd',
        document__title: '5e Core Rules',
      },
      {
        slug: 'dust-of-dryness',
        name: 'Dust of Dryness',
        type: 'Wondrous item',
        rarity: 'uncommon',
        requires_attunement: '',
        document__slug: 'wotc-srd',
        document__title: '5e Core Rules',
      },
    ],
  });
});
