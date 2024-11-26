import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import ClassesPage from '~/pages/classes/index.vue';

const page = await mountSuspended(ClassesPage);

test('/classes page can mount', async () => {
  expect(page);
});

mockNuxtImport('useFindPaginated', () => {
  return () => ({
    data: [
      {
        key: 'srd_barbarian',
        name: 'Barbarian',
        document: {
          url: 'http://localhost:8000/v2/documents/srd/',
          name: 'Systems Reference Document',
        },
      },
      {
        key: 'srd_bard',
        name: 'Bard',
        document: {
          url: 'http://localhost:8000/v2/documents/srd/',
          name: 'Systems Reference Document',
        },
      },
      {
        key: 'srd_cleric',
        name: 'Cleric',
        document: {
          url: 'http://localhost:8000/v2/documents/srd/',
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
