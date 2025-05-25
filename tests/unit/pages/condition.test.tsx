import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import ConditionPage from '~/pages/conditions/[id].vue';

const { data: condition } = useFindOne('v2/condition', 'blinded');

const page = await mountSuspended(ConditionPage);

test('/conditions/[id] page can mount', async () => {
  expect(page);
});

test('/conditions/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(unref(condition)?.name);
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: {
      name: 'Blinded',
      desc: '* A blinded creature can\'t see and automatically fails any ability check that requires sight.\r\n* Attack rolls against the creature have advantage, and the creature’s attack rolls have disadvantage.',
      document: {
        name: 'Systems Reference Document',
        url: 'v2/documents/srd/',
      },
    },
  });
});
