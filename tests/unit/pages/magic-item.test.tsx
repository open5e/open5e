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
      desc: "This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet. The bag weighs 15 pounds, regardless of its contents. Retrieving an item from the bag requires an action.\n\nIf the bag is overloaded, pierced, or torn, it ruptures and is destroyed, and its contents are scattered in the Astral Plane. If the bag is turned inside out, its contents spill forth, unharmed, but the bag must be put right before it can be used again. Breathing creatures inside the bag can survive up to a number of minutes equal to 10 divided by the number of creatures (minimum 1 minute), after which time they begin to suffocate.\n\nPlacing a _bag of holding_ inside an extradimensional space created by a _handy haversack_, _portable hole_, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it to a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened.",
      rarity: 'uncommon',
      requires_attunement: '',
      document__slug: 'wotc-srd',
      document__title: '5e Core Rules',
      document__url:
        'http://dnd.wizards.com/articles/features/systems-reference-document-srd',
    },
  });
});
