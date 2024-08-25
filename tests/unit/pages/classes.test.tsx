import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import Classes from '~/pages/classes/index.vue';

const page = await mountSuspended(Classes);

test('/classes page can mount', async () => {
  expect(page);
});
