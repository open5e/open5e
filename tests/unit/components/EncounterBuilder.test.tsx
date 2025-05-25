import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref, computed } from 'vue';
import EncounterBuilder from '~/components/EncounterBuilder.vue';

interface MockMonster {
  id: string;
  name: string;
  count: number;
  challenge_rating_decimal: number;
  challenge_rating_text: string;
  document?: {
    name: string;
    key: string;
  };
}

// Mock child components
vi.mock('~/components/PartyBuilder.vue', () => ({
  default: { template: '<div>Party Builder</div>' },
}));

vi.mock('~/components/MonsterSearch.vue', () => ({
  default: {
    template: '<div class="monster-search">Monster Search</div>',
    emits: ['select'],
  },
}));

vi.mock('~/components/Icon.vue', () => ({
  default: { template: '<div>Icon</div>' },
}));

// Mock composables
const mockAddMonster = vi.fn();
const mockRemoveMonster = vi.fn();
const mockIncrementMonster = vi.fn();
const mockClearEncounter = vi.fn();
const mockFetchMonsterData = vi.fn().mockResolvedValue({});

const mockMonsters = ref<MockMonster[]>([]);

vi.mock('~/composables/useEncounter', () => ({
  useEncounterStore: () => ({
    monsters: mockMonsters,
    addMonster: mockAddMonster,
    removeMonster: mockRemoveMonster,
    incrementMonster: mockIncrementMonster,
    clearEncounter: mockClearEncounter,
    totalMonsters: computed(() => mockMonsters.value.length),
    totalXP: computed(() => 100),
    difficulty: computed(() => 'easy'),
    difficultyColors: {
      empty: '',
      trivial: '',
      easy: 'bg-green-200',
      medium: '',
      hard: '',
      deadly: '',
    },
    difficultyColor: computed(() => 'bg-green-200'),
    multiplier: computed(() => '1x'),
    formatXPBudget: (budget: number) => budget.toString(),
    fetchMonsterData: mockFetchMonsterData,
  }),
}));

vi.mock('~/composables/useParty', () => ({
  usePartyStore: () => ({
    partyRows: ref([]),
    partyXPBudget: ref({
      easy: 100,
      medium: 200,
      hard: 300,
      deadly: 400,
    }),
  }),
}));

vi.mock('~/composables/useXPCalculator', () => ({
  useXPCalculator: () => ({}),
}));

describe('EncounterBuilder', () => {
  beforeEach(() => {
    mockMonsters.value = [];
    vi.clearAllMocks();
  });

  it('shows empty state when no monsters', () => {
    const wrapper = mount(EncounterBuilder);
    expect(wrapper.text()).toContain('It\'s too quiet');
  });

  it('calls addMonster when monster is selected', async () => {
    const wrapper = mount(EncounterBuilder);
    const testMonster = {
      id: 'test-monster',
      name: 'Test Monster',
      challenge_rating_decimal: 1,
      challenge_rating: '1',
    };

    await wrapper
      .findComponent({ name: 'MonsterSearch' })
      .vm.$emit('select', testMonster);

    expect(mockAddMonster).toHaveBeenCalledWith(
      'test-monster',
      'Test Monster',
      1,
      '1',
    );
  });

  it('calls monster management functions when buttons are clicked', async () => {
    // Setup mock state with a monster
    mockMonsters.value = [
      {
        id: 'test-monster',
        name: 'Test Monster',
        count: 1,
        challenge_rating_decimal: 1,
        challenge_rating_text: '1',
        document: {
          name: 'Test Document',
          key: 'test',
        },
      },
    ];

    const wrapper = mount(EncounterBuilder);
    await wrapper.vm.$nextTick();

    // Find buttons by data-testid
    const removeButton = wrapper.find('[data-testid="remove-monster"]');
    await removeButton.trigger('click');
    expect(mockRemoveMonster).toHaveBeenCalledWith('test-monster');

    const incrementButton = wrapper.find('[data-testid="increment-monster"]');
    await incrementButton.trigger('click');
    expect(mockIncrementMonster).toHaveBeenCalledWith('test-monster');

    const clearButton = wrapper.find('[data-testid="clear-encounter"]');
    await clearButton.trigger('click');
    expect(mockClearEncounter).toHaveBeenCalled();
  });
});
