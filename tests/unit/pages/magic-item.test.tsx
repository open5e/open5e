import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import MagicItemPage from '~/pages/magic-items/[id].vue';

const { id } = useRoute().params;
const { data: item } = useFindOne('v1/magicitems', id);

const page = await mountSuspended(MagicItemPage);

test('/magic-item/[id] page can mount', async () => {
  expect(page);
});

test('/magic-item/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(item.name);
});

mockNuxtImport('useRoute', () => {
  return () => ({
    params: {
      id: 'bag-of-holding',
    },
  });
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: {
      slug: 'bag-of-holding',
      name: 'Bag of Holding',
      type: 'Wondrous item',
      desc: 'This bag has an interior space considerably larger than its outside dimensions...',
      rarity: 'uncommon',
      requires_attunement: '',
      document__slug: 'wotc-srd',
      document__title: '5e Core Rules',
      document__url:
        'http://dnd.wizards.com/articles/features/systems-reference-document-srd',
    },
  });
});
