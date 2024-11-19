import { test, expect } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import RacesPage from '~/pages/races/index.vue'

const page = await mountSuspended(RacesPage)

test('/races page can mount', async () => {
  expect(page)
})

mockNuxtImport('useFindPaginated', () => {
  return () => ({
    data: [
      {
        key: 'srd_dragonborn',
        name: 'Dragonborn',
        document: {
          url: 'https://api.open5e.com/v2/documents/srd/',
          name: 'Systems Reference Document',
        },
      },
      {
        key: 'srd_dwarf',
        name: 'Dwarf',
        document: {
          url: 'https://api.open5e.com/v2/documents/srd/',
          name: 'Systems Reference Document',
        },
      },
      {
        key: 'srd_elf',
        name: 'Elf',
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
  })
})

mockNuxtImport('useSortState', () => {
  return () => ({
    sortBy: 'name',
    isSortDescenting: false,
    setSortState: () => {},
  })
})
