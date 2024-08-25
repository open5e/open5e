import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import RunningSectionsPage from '~/pages/running/index.vue';

const page = await mountSuspended(RunningSectionsPage);

// tests
test('/running page can mount', async () => {
  expect(page);
});
