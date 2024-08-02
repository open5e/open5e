import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import BackgroundPage from '~/pages/backgrounds/[id].vue';

const { id } = useRoute().params;
const { data: background } = useFindOne('v1/backgrounds', id);

const page = await mountSuspended(BackgroundPage);

test('/background/[id] page can mount', async () => {
  expect(page);
});

test('/background/[id] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toEqual(background.name);
});

mockNuxtImport('useRoute', () => {
  return () => ({
    params: {
      id: 'acolyte',
    },
  });
});

mockNuxtImport('useFindOne', () => {
  return () => ({
    data: {
      name: 'Acolyte',
      desc: 'You have spent your life in the service of a temple to a specific god or pantheon of gods...',
      slug: 'acolyte',
      skill_proficiencies: 'Insight, Religion',
      tool_proficiencies: null,
      languages: 'Two of your choice',
      equipment:
        'A holy symbol (a gift to you when you entered the priesthood)...',
      feature: 'Shelter of the Faithful',
      feature_desc:
        'As an acolyte, you command the respect of those who share your faith...',
      suggested_characteristics:
        'Acolytes are shaped by their experience in temples or...',
      document__slug: 'wotc-srd',
      document__title: '5e Core Rules',
      document__license_url: 'http://open5e.com/legal',
      document__url:
        'http://dnd.wizards.com/articles/features/systems-reference-document-srd',
    },
  });
});
