import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import FeatsPage from '~/pages/feats/index.vue';

const page = await mountSuspended(FeatsPage);

// tests
test('/feats page can mount', async () => {
  expect(page);
});
