import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import FeatsPage from '~/pages/feats/index.vue';

const page = await mountSuspended(FeatsPage);

test('/feats page can mount', async () => {
  expect(page);
});

mockNuxtImport('useFindPaginated', () => {
  return () => ({
    data: [
      {
        key: 'a5e-ag_a-symbol-that-strikes-fear',
        name: 'A Symbol That Strikes Fear',
        document: {
          url: 'https://api.open5e.com/v2/documents/a5e-ag/',
          name: 'Adventurer\'s Guide',
        },
      },
      {
        key: 'a5e-ag_ace-driver',
        name: 'Ace Driver',
        document: {
          url: 'https://api.open5e.com/v2/documents/a5e-ag/',
          name: 'Adventurer\'s Guide',
        },
      },
      {
        key: 'a5e-ag_arcanum-master',
        name: 'Arcanum Master',
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
