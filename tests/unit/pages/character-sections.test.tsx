import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import CharacterRulesPage from '~/pages/characters/index.vue';

const page = await mountSuspended(CharacterRulesPage);

// tests
test('/characters page can mount', async () => {
  expect(page);
});
