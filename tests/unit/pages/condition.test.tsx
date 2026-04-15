import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import ConditionPage from '~/pages/conditions/[id].vue';

const { data: condition } = useFindOne(API_ENDPOINTS.conditions, 'blinded');

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
      "descriptions": [
        {
            "desc": "* A blinded creature can’t see and it automatically fails ability checks that require sight.\n\n* Attack rolls against a blinded creature are made with advantage, and the creature’s attack rolls are made with disadvantage.",
            "document": "a5e-ag",
            "gamesystem": "a5e"
        },
        {
            "desc": "* A blinded creature can't see and automatically fails any ability check that requires sight.\r\n* Attack rolls against the creature have advantage, and the creature’s attack rolls have disadvantage.",
            "document": "srd-2014",
            "gamesystem": "5e-2014"
        },
        {
            "desc": "While you have the Blinded condition, you experience the following effects.\n * Can’t See. You can’t see and automatically fail any ability check that requires sight.\n * Attacks Affected. Attack rolls against you have Advantage, and your attack rolls have Disadvantage.",
            "document": "srd-2024",
            "gamesystem": "5e-2024"
        }
      ],
      document: {
        name: 'Systems Reference Document',
        url: 'v2/documents/srd/',
      },
    },
  });
});
