import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import MonstersPage from '~/pages/monsters/index.vue';

const page = await mountSuspended(MonstersPage);

test('/monsters page can mount', async () => {
  expect(page);
});

mockNuxtImport('useFindPaginated', () => {
  return () => ({
    data: [
      {
        name: 'Aboleth',
        key: 'bfrd_aboleth',
        document: {
          url: 'https://api.open5e.com/v2/documents/bfrd/',
          name: 'Black Flag SRD',
        },
      },
      {
        name: 'Acolyte',
        key: 'srd_acolyte',
        document: {
          url: 'https://api.open5e.com/v2/documents/srd/',
          name: 'Systems Reference Document',
        },
      },
      {
        key: 'mmenag_accursed-guardian-naga',
        name: 'Accursed Guardian Naga',
        document: {
          url: 'https://api.open5e.com/v2/documents/mmenag/',
          name: 'Monstrous Menagerie',
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
