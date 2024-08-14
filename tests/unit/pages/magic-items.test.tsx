import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import MagicItemsPage from '~/pages/magic-items/index.vue';

const page = await mountSuspended(MagicItemsPage);

const fields = {
  fields: [
    'slug',
    'name',
    'type',
    'rarity',
    'requires_attunement',
    'document__title',
    'document__slug',
  ].join(),
};

// tests
test('/magic-items page can mount', async () => {
  expect(page);
});
