import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import MagicItemPage from '~/pages/magic-items/[id].vue';

const { data: item } = useFindOne(
  'v2/items',
  'srd_adamantine-armor-breastplate',
);

const page = await mountSuspended(MagicItemPage);

test('/magic-items/[id] page can mount', async () => {
  expect(page);
});

test('/magic-items/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(unref(item)?.name);
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: {
      name: 'Adamantine Armor (Breastplate)',
      key: 'srd_adamantine-armor-breastplate',
      desc: 'This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you\'re wearing it, any critical hit against you becomes a normal hit.',
      is_magic_item: true,
      requires_attunement: false,
      document: {
        name: 'Systems Reference Document',
        url: 'v2/documents/srd/"',
      },
      rarity: { name: 'Uncommon' },
      category: { name: 'Armor' },
    },
  });
});
