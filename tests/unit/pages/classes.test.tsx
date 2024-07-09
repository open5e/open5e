import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import Classes from '~/pages/classes/index.vue';

const page = await mountSuspended(Classes);

test('/classes page can mount', async () => {
  expect(page);
});

test('/classes contains correct number of links', async () => {
  const numberOfAnchorTags = (page.html().match(/<a href/g) || []).length;
  expect(numberOfAnchorTags).toEqual(useFindMany('/classes').data.length);
});

mockNuxtImport('useFindMany', () => {
  return () => ({
    data: [
      {
        name: 'Barbarian',
        slug: 'barbarian',
        document__title: '5e Core Rules',
        document__slug: 'wotc-srd',
      },
      {
        name: 'Wizard',
        slug: 'wizard',
        document__title: '5e Core Rules',
        document__slug: 'wotc-srd',
      },
    ],
  });
});
