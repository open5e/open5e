import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import ConditionPage from '~/pages/feats/[id].vue';

const { data: feat } = useFindOne('v2/feats', 'srd_grappler');

const page = await mountSuspended(ConditionPage);

test('/feats/[id] page can mount', async () => {
  expect(page);
});

test('/feats/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(unref(feat)?.name);
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: {
      name: 'Grappler',
      key: 'srd_grappler',
      has_prerequisite: true,
      prerequisite: 'Strength 13 or higher',
      desc: 'You\'ve developed the skills necessary to hold your own in close-quarters grappling. You gain the following benefits:\r\n* You have advantage on attack rolls against a creature you are grappling.\r\n* You can use your action to try to pin a creature grappled by you. The creature makes a Strength or Dexterity saving throw against your maneuver DC. On a failure, you and the creature are both restrained until the grapple ends.',
      document: {
        name: 'Systems Reference Document',
        url: 'v2/documents/srd/"',
      },
    },
  });
});
