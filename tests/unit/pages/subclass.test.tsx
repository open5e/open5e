import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import SubclassPage from '~/pages/classes/[className]/[subclass].vue';

const page = await mountSuspended(SubclassPage);

const { data: subclass } = useSubclass('cleric', 'life-domain');
test('/classes/[className]/[subclass] page can mount', async () => {
  expect(page);
});

test('/classes/[className]/[subclass] page renders title', async () => {
  const title = page.find('h1');
  expect(title.exists()).toBe(true);
  expect(title.text()).toContain(subclass.name);
});

// mock input for useFindOne() composable
mockNuxtImport('useSubclass', () => {
  return () => ({
    data: {
      name: 'Life Domain',
      slug: 'life-domain',
      desc: 'The Life domain focuses on the vibrant positive energy...',
      document__slug: 'wotc-srd',
      document__title: '5e Core Rules',
    },
  });
});
