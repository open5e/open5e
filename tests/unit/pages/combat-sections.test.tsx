import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import CombatRulesPage from '~/pages/combat/index.vue';

const page = await mountSuspended(CombatRulesPage);

// tests
test('/combat page can mount', async () => {
  expect(page);
});
