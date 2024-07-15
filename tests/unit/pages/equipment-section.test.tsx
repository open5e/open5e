import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import EquipmentSectionPage from '~/pages/equipment/[section].vue';

const { data: section } = useFindOne('v1/section', 'adventuring-gear');

const page = await mountSuspended(EquipmentSectionPage);

test('/equipment/[id] page can mount', async () => {
  expect(page);
});

test('/equipment/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(section.value.name);
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: ref({
      desc: 'This section describes items that have special rules or require further explanation. ...',
      document__license_url: 'http://open5e.com/legal',
      document__slug: 'wotc-srd',
      document__title: '5e Core Rules',
      document__url:
        'http://dnd.wizards.com/articles/features/systems-reference-document-srd',
      name: 'Adventuring Gear',
      parent: 'Equipment',
      slug: 'adventuring-gear',
    }),
  });
});
