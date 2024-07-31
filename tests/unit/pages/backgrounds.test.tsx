import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import BackgroundsPage from '~/pages/backgrounds/index.vue';

const page = await mountSuspended(BackgroundsPage);
const { data: backgrounds } = useFindMany('v1/backgrounds', {
  fields: ['name', 'slug', 'document__title', 'document__slug'].join(),
});

// tests
test('/backgrounds page can mount', async () => {
  expect(page);
});

test('/backgrounds renders one link per feat', async () => {
  const numberOfAnchorTags = (page.html().match(/<a /g) || []).length;
  expect(numberOfAnchorTags).toEqual(backgrounds.length);
});

// mocks
mockNuxtImport('useFindMany', () => {
  return () => ({
    data: [
      {
        name: 'Acolyte',
        slug: 'acolyte',
        document__slug: 'wotc-srd',
        document__title: '5e Core Rules',
      },
      {
        name: 'Artisan',
        slug: 'artisan',
        document__slug: 'a5e',
        document__title: 'Level Up Advanced 5e',
      },
    ],
  });
});
