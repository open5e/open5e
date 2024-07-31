import { test, expect } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import RunningSectionsPage from '~/pages/running/index.vue';

const page = await mountSuspended(RunningSectionsPage);
const { data: sections } = useSections('Rules');

// tests
test('/running page can mount', async () => {
  expect(page);
});

test('/running renders one link per section', async () => {
  const numberOfAnchorTags = (page.html().match(/<a /g) || []).length;
  expect(numberOfAnchorTags).toEqual(sections.value.length);
});

// mocks
mockNuxtImport('useSections', () => {
  return () => ({
    data: ref([
      { slug: 'conditions', name: 'Conditions', parent: 'Rules' },
      { slug: 'diseases', name: 'Diseases', parent: 'Rules' },
      { slug: 'madness', name: 'Madness', parent: 'Rules' },
    ]),
  });
});
