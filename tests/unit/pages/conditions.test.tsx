import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import ConditionsPage from '~/pages/conditions/index.vue';

const page = await mountSuspended(ConditionsPage);
const { data: conditions } = useFindMany('v1/conditions', {
  fields: ['name', 'slug', 'document__title', 'document__slug'].join(),
});

// tests
test('/conditions page can mount', async () => {
  expect(page);
});

test('/conditions renders one link per condition', async () => {
  const numberOfAnchorTags = (page.html().match(/<a /g) || []).length;
  expect(numberOfAnchorTags).toEqual(conditions.length);
});

// mocks
mockNuxtImport('useFindMany', () => {
  return () => ({
    data: [
      {
        slug: 'blinded',
        name: 'Blinded',
        document__slug: 'wotc-srd',
        document__title: '5e Core Rules',
      },
      {
        slug: 'charmed',
        name: 'Charmed',
        document__slug: 'wotc-srd',
        document__title: '5e Core Rules',
      },
      {
        slug: 'deafened',
        name: 'Deafened',
        document__slug: 'wotc-srd',
        document__title: '5e Core Rules',
      },
    ],
  });
});
