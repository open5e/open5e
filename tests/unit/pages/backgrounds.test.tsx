import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import BackgroundsPage from '~/pages/backgrounds/index.vue';

const page = await mountSuspended(BackgroundsPage);

// tests
test('/backgrounds page can mount', async () => {
  expect(page);
});
