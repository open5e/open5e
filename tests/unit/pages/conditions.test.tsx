import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import ConditionsPage from '~/pages/conditions/index.vue';

const page = await mountSuspended(ConditionsPage);

// tests
test('/conditions page can mount', async () => {
  expect(page);
});
