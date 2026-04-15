import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import type { Ref } from 'vue';
import { ref, computed } from 'vue';

// Now import the component after setting up mocks
import EncounterBuilderSummary from '~/components/EncounterBuilderSummary.vue';

// Create a shared mock state with Vue refs
const mockState = {
  monsters: ref([]) as Ref,
  totalMonsters: ref(0),
  difficulty: ref('empty'),
  color: ref('bg-fog hover:bg-smoke dark:bg-basalt hover:dark:bg-granite'),
};

// Mock the Icon component
vi.mock('~/components/Icon.vue', () => ({
  default: {
    template: '<div>Icon</div>',
    props: ['name'],
  },
}));

// Mock the encounter store with reactive state
vi.mock('~/composables/useEncounter', () => ({
  useEncounterStore: () => ({
    monsters: mockState.monsters,
    totalMonsters: mockState.totalMonsters,
    difficulty: mockState.difficulty,
    difficultyColors: {
      empty: 'bg-fog hover:bg-smoke dark:bg-basalt hover:dark:bg-granite',
      trivial:
        'bg-lime-200 hover:bg-lime-200 dark:bg-lime-800 hover:dark:bg-lime-900',
      easy: 'bg-green-200 hover:bg-green-200 dark:bg-green-800 hover:dark:bg-green-900',
      medium:
        'bg-blue-200 hover:bg-blue-200 dark:bg-blue-800 hover:dark:bg-blue-900',
      hard: 'bg-yellow-200 hover:bg-yellow-200 dark:bg-yellow-800 hover:dark:bg-yellow-900',
      deadly:
        'bg-orange-100 hover:bg-orange-200 dark:bg-orange-700 hover:dark:bg-orange-900',
    },
    difficultyColor: computed(() => mockState.color.value),
  }),
}));

const mountAndWaitForReady = async () => {
  const wrapper = mount(EncounterBuilderSummary, {
    global: {
      stubs: {
        Icon: true,
      },
    },
  });

  // Wait for isReady to be true
  await new Promise(resolve => setTimeout(resolve, 10));
  await wrapper.vm.$nextTick();

  return wrapper;
};

describe('EncounterBuilderSummary', () => {
  beforeEach(() => {
    // Reset mock state before each test
    mockState.monsters.value = [];
    mockState.totalMonsters.value = 0;
    mockState.difficulty.value = 'empty';
    mockState.color.value
      = 'bg-fog hover:bg-smoke dark:bg-basalt hover:dark:bg-granite';
    vi.clearAllMocks();
  });

  it('shows default state when no monsters', async () => {
    const wrapper = await mountAndWaitForReady();
    expect(wrapper.text()).toContain('Encounter Builder');
    expect(wrapper.classes()).toContain('bg-fog');
  });

  it('shows monster count and difficulty when monsters exist', async () => {
    // Update mock state
    mockState.monsters.value = [{ id: '1', name: 'Test Monster' }];
    mockState.totalMonsters.value = 1;
    mockState.difficulty.value = 'easy';
    mockState.color.value
      = 'bg-green-200 hover:bg-green-200 dark:bg-green-800 hover:dark:bg-green-900';

    const wrapper = await mountAndWaitForReady();

    // Check for the monster count and difficulty text
    const text = wrapper.text();
    expect(text).toContain('x 1');
    expect(text).toContain('easy');

    // Check for the correct color class
    expect(wrapper.classes()).toContain('bg-green-200');
  });

  it('emits show-encounter event when clicked', async () => {
    const wrapper = await mountAndWaitForReady();
    await wrapper.trigger('click');
    expect(wrapper.emitted('show-encounter')).toBeTruthy();
  });

  it('shows correct difficulty colors and text for each difficulty level', async () => {
    const difficulties = ['trivial', 'easy', 'medium', 'hard', 'deadly'];
    const colors = [
      'bg-lime-200',
      'bg-green-200',
      'bg-blue-200',
      'bg-yellow-200',
      'bg-orange-100',
    ];

    for (let i = 0; i < difficulties.length; i++) {
      // Update mock state for each difficulty
      mockState.monsters.value = [{ id: '1', name: 'Test Monster' }];
      mockState.totalMonsters.value = 1;
      mockState.difficulty.value = difficulties[i];
      mockState.color.value = `${colors[i]} hover:${colors[i]} dark:bg-${
        colors[i].split('-')[1]
      }-800 hover:dark:bg-${colors[i].split('-')[1]}-900`;

      const wrapper = await mountAndWaitForReady();

      // Check for the correct color class and text
      expect(wrapper.classes()).toContain(colors[i].split(' ')[0]);
      expect(wrapper.text().toLowerCase()).toContain(difficulties[i]);
      expect(wrapper.text()).toContain('x 1');
    }
  });
});
