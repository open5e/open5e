import { describe, test, expect, beforeAll } from 'vitest';
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime';
import { ref } from 'vue';
import ConditionPage from '~/pages/conditions/[id].vue';

const mockCondition = {
  name: 'Blinded',
  descriptions: [
    {
      desc: '* A blinded creature can\'t see and it automatically fails ability checks that require sight.',
      document: 'a5e-ag',
      gamesystem: 'a5e',
    },
    {
      desc: '* A blinded creature can\'t see and automatically fails any ability check that requires sight.',
      document: 'srd-2014',
      gamesystem: '5e-2014',
    },
    {
      desc: 'While you have the Blinded condition, you experience the following effects.',
      document: 'srd-2024',
      gamesystem: '5e-2024',
    },
  ],
  document: {
    key: 'srd-2014',
    name: 'Systems Reference Document',
  },
};

const sources = ref(['a5e-ag', 'srd-2014', 'srd-2024']);

mockNuxtImport('useFindOne', () => {
  return () => ({ data: ref(mockCondition) });
});

mockNuxtImport('useSourcesList', () => {
  return () => ({ sources });
});

mockNuxtImport('useCatalog', () => {
  return () => ({
    documentName: (key: string) => ({
      'a5e-ag': 'Adventurers Guide',
      'srd-2014': 'Systems Reference Document',
      'srd-2024': 'Systems Reference Document 2024',
    })[key] ?? key,
    gameSystemName: (key: string) => ({
      'a5e': 'Advanced 5th Edition',
      '5e-2014': '5th Edition 2014',
      '5e-2024': '5th Edition 2024',
    })[key] ?? key,
    sortGameSystemKeys: (keys: string[]) => {
      const order = ['5e-2024', '5e-2014', 'a5e'];
      return [...keys].sort(
        (a, b) => order.indexOf(a) - order.indexOf(b),
      );
    },
  });
});

describe('/conditions/[id]', () => {
  let page: Awaited<ReturnType<typeof mountSuspended>>;

  beforeAll(async () => {
    page = await mountSuspended(ConditionPage);
  });

  test('page can mount', () => {
    expect(page).toBeTruthy();
  });

  test('page renders title', () => {
    const title = page.find('h1');
    expect(title.exists()).toBe(true);
    expect(title.text()).toContain('Blinded');
  });

  test('does not show the multiple-definitions explainer', () => {
    expect(page.text()).not.toContain('has multiple definitions in different rulebooks');
  });

  test('shows human-readable game system names in tabs', () => {
    expect(page.text()).toContain('5th Edition 2014');
    expect(page.text()).toContain('Advanced 5th Edition');
    expect(page.find('[role="tablist"]').exists()).toBe(true);
  });

  test('orders tabs with 2024 SRD first, then 2014 SRD, then others', () => {
    const tabs = page.findAll('[role="tab"]');
    expect(tabs[0]?.text()).toContain('5th Edition 2024');
    expect(tabs[1]?.text()).toContain('5th Edition 2014');
    expect(tabs[2]?.text()).toContain('Advanced 5th Edition');
  });

  test('hides tabs when only one source is selected', async () => {
    sources.value = ['srd-2014'];
    await page.vm.$nextTick();
    expect(page.find('[role="tablist"]').exists()).toBe(false);
  });
});
