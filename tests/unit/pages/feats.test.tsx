import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import FeatsPage from '~/pages/feats/index.vue';

const page = await mountSuspended(FeatsPage);
const { data: feats } = useFindMany('v1/feats', {
  fields: ['name', 'slug', 'document__title', 'document__slug'].join(),
});

// tests
test('/feats page can mount', async () => {
  expect(page);
});

test('/feats renders one link per feat', async () => {
  const numberOfAnchorTags = (page.html().match(/<a /g) || []).length;
  expect(numberOfAnchorTags).toEqual(feats.length);
});

// mocks
mockNuxtImport('useFindMany', () => {
  return () => ({
    data: [
      {
        slug: 'empathic',
        name: 'Empathic',
        document__slug: 'a5e',
        document__title: 'Level Up Advanced 5e',
      },
      {
        slug: 'grappler',
        name: 'Grappler',
        document__slug: 'wotc_srd',
        document__title: '5e Core Rules',
      },
    ],
  });
});
