import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import EquipmentSectionsPage from '~/pages/equipment/index.vue';

const page = await mountSuspended(EquipmentSectionsPage);
const { data: equipmentSections } = useSections('Equipment');

// tests
test('/equipment page can mount', async () => {
  expect(page);
});

test('/equipment renders one link per section', async () => {
  const numberOfAnchorTags = (page.html().match(/<a /g) || []).length;
  expect(numberOfAnchorTags).toEqual(equipmentSections.value.length);
});

// mocks
mockNuxtImport('useSections', () => {
  return () => ({
    data: ref([
      {
        slug: 'adventuring-gear',
        name: 'Adventuring Gear',
        parent: 'Equipment',
      },
      { slug: 'armor', name: 'Armor', parent: 'Equipment' },
      { slug: 'coins', name: 'Coins', parent: 'Equipment' },
    ]),
  });
});
