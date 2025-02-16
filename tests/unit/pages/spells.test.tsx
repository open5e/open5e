import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import SpellsPage from '~/pages/spells/index.vue';

const page = await mountSuspended(SpellsPage);

test('/spells page can mount', async () => {
  expect(page);
});

mockNuxtImport('useFindPaginated', () => {
  return () => ({
    data: [
      {
        key: 'a5e-ag_accelerando',
        school: {
          key: 'transmutation',
          name: 'Transmutation',
        },
        name: 'Accelerando',
        level: 4,
        verbal: true,
        material: true,
        material_consumed: false,
        concentration: true,
        document: {
          url: 'https://api.open5e.com/v2/documents/a5e-ag/',
          name: 'Adventurer\'s Guide',
        },
      },
      {
        key: 'a5e-ag_acid-arrow',
        school: {
          key: 'evocation',
          name: 'Evocation',
        },
        name: 'Acid Arrow',
        level: 2,
        verbal: true,
        material: true,
        material_consumed: false,
        concentration: false,
        document: {
          url: 'https://api.open5e.com/v2/documents/a5e-ag/',
          name: 'Adventurer\'s Guide',
        },
      },
    ],
    paginator: {
      pageNo: 1,
      lastPageNo: 1,
      firstPage: () => {},
      lastPage: () => {},
      prevPage: () => {},
      nextPage: () => {},
    },
  });
});

mockNuxtImport('useSortState', () => {
  return () => ({
    sortBy: 'name',
    isSortDescenting: false,
    setSortState: () => {},
  });
});
