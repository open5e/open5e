import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import SpellsIndex from '~/pages/spells/index.vue';

const page = await mountSuspended(SpellsIndex);

test('/spells page can mount', async () => {
  expect(page);
});
