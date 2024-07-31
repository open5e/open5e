import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import ConditionPage from '~/pages/conditions/[id].vue';

const { data: condition } = useFindOne('v1/condition', 'blinded');

const page = await mountSuspended(ConditionPage);

test('/conditions/[id] page can mount', async () => {
  expect(page);
});

test('/conditions/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(condition.name);
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: {
      slug: 'blinded',
      name: 'Blinded',
      desc: "* A blinded creature can't see and automatically fails any ability check that requires sight...",
      document__slug: 'wotc-srd',
      document__title: '5e Core Rules',
      document__url:
        'http://dnd.wizards.com/articles/features/systems-reference-document-srd',
    },
  });
});
