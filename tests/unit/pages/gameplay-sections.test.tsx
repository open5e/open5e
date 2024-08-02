import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import GameplaySectionsPage from '~/pages/gameplay-mechanics/index.vue';

const page = await mountSuspended(GameplaySectionsPage);

// tests
test('/gameplay-mechanics page can mount', async () => {
  expect(page);
});
