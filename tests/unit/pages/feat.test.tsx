import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import FeatPage from '~/pages/feats/[id].vue';

const { id } = useRoute().params;
const { data: feat } = useFindOne('v1/feats', id);

const page = await mountSuspended(FeatPage);

test('/feats/[id] page can mount', async () => {
  expect(page);
});

test('/feats/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(feat.name);
});

mockNuxtImport('useRoute', () => {
  return () => ({
    params: {
      id: 'grappler',
    },
  });
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: {
      slug: 'grappler',
      name: 'Grappler',
      desc: "You've developed the skills necessary to hold your own in close-quarters grappling. You gain the following benefits:",
      prerequisite: 'Prerequisite: Strength 13 or higher',
      effects_desc: [
        'You have advantage on attack rolls against a creature you are grappling.',
        'You can use your action to try to pin a creature grappled by you. The creature makes a Strength or Dexterity saving throw against your maneuver DC. On a failure, you and the creature are both restrained until the grapple ends.',
      ],
      document__slug: 'wotc-srd',
      document__title: '5e Core Rules',
      document__url:
        'http://dnd.wizards.com/articles/features/systems-reference-document-srd',
    },
  });
});
