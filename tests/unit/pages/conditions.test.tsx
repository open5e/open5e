import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import ConditionsPage from '~/pages/conditions/index.vue';

const page = await mountSuspended(ConditionsPage);

test('/conditions page can mount', async () => {
  expect(page);
});

mockNuxtImport('useFindPaginated', () => {
  return () => ({
    data: [
      {
        key: 'blinded',
        name: 'Blinded',
        document: {
          url: 'https://api.open5e.com/v2/documents/srd/',
          name: 'Systems Reference Document',
        },
      },
      {
        key: 'charmed',
        name: 'Charmed',
        document: {
          url: 'https://api.open5e.com/v2/documents/srd/',
          name: 'Systems Reference Document',
        },
      },
      {
        key: 'deafened',
        name: 'Deafened',
        document: {
          url: 'https://api.open5e.com/v2/documents/srd/',
          name: 'Systems Reference Document',
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
