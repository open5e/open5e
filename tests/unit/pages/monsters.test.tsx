import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import MonstersIndex from '~/pages/monsters/index.vue';

const page = await mountSuspended(MonstersIndex);

test('/monsters page can mount', async () => {
  expect(page);
});
