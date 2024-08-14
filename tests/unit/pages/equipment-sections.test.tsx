import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import EquipmentSectionsPage from '~/pages/equipment/index.vue';

const page = await mountSuspended(EquipmentSectionsPage);

// tests
test('/equipment page can mount', async () => {
  expect(page);
});
