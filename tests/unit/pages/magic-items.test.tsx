import { test, expect } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import MagicItemsPage from '~/pages/magic-items/index.vue'

const page = await mountSuspended(MagicItemsPage)

test('/magic-items page can mount', async () => {
  expect(page)
})

mockNuxtImport('useFindPaginated', () => {
  return () => ({
    data: [
      {
        key: 'srd_adamantine-armor-breastplate',
        name: 'Adamantine Armor (Breastplate)',
        document: {
          url: 'https://api.open5e.com/v2/documents/srd/',
          name: 'Systems Reference Document',
        },
      },
      {
        key: 'srd_adamantine-armor-chain-mail',
        name: 'Adamantine Armor (Chain-Mail)',
        document: {
          url: 'https://api.open5e.com/v2/documents/srd/',
          name: 'Systems Reference Document',
        },
      },
      {
        key: 'srd_adamantine-armor-chain-shirt',
        name: 'Adamantine Armor (Chain-Shirt)',
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
