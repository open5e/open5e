import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import TabBar from '~/components/TabBar.vue';

const tabs = [
  { id: '5e-2014', label: '5th Edition 2014', subtitle: '5e-2014' },
  { id: '5e-2024', label: '5th Edition 2024', subtitle: '5e-2024' },
  { id: 'a5e', label: 'Advanced 5th Edition', subtitle: 'a5e' },
];

function mountTabBar(activeId = '5e-2014') {
  const activeTab = ref(activeId);
  const wrapper = mount(TabBar, {
    props: {
      tabs,
      modelValue: activeTab.value,
      'onUpdate:modelValue': (value: string) => {
        activeTab.value = value;
      },
    },
  });
  return { wrapper, activeTab };
}

describe('TabBar', () => {
  it('renders tab labels and subtitles', () => {
    const { wrapper } = mountTabBar();
    expect(wrapper.text()).toContain('5th Edition 2014');
    expect(wrapper.text()).toContain('5e-2014');
    expect(wrapper.text()).toContain('Advanced 5th Edition');
  });

  it('marks the active tab with aria-selected', () => {
    const { wrapper } = mountTabBar('5e-2024');
    const tabButtons = wrapper.findAll('[role="tab"]');
    expect(tabButtons[1]?.attributes('aria-selected')).toBe('true');
    expect(tabButtons[0]?.attributes('aria-selected')).toBe('false');
  });

  it('updates model when a tab is clicked', async () => {
    const { wrapper, activeTab } = mountTabBar();
    await wrapper.findAll('[role="tab"]')[2]?.trigger('click');
    expect(activeTab.value).toBe('a5e');
  });

  it('moves selection with arrow keys', async () => {
    const { wrapper, activeTab } = mountTabBar('5e-2014');
    await wrapper.find('#tab-5e-2014').trigger('keydown', { key: 'ArrowRight' });
    expect(activeTab.value).toBe('5e-2024');
    await wrapper.find('#tab-5e-2024').trigger('keydown', { key: 'ArrowLeft' });
    expect(activeTab.value).toBe('5e-2014');
  });
});
