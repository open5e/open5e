<template>
  <div class="relative w-full">
    <Combobox
      v-model="selectedMonster"
      as="div"
      class="w-full"
    >
      <ComboboxInput
        class="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 dark:border-gray-700 dark:bg-darkness"
        :display-value="(item: unknown) => (item as Monster)?.name || searchQuery"
        placeholder="Search monsters..."
        @input="(event: Event) => searchQuery = (event.target as HTMLInputElement).value"
      />
      <ComboboxOptions
        ref="optionsRef"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-sm shadow-lg dark:border dark:border-gray-700 dark:bg-darkness"
        @scroll="handleScroll"
      >
        <div
          v-if="isSearching"
          class="px-4 py-2 text-gray-500"
        >
          Searching...
        </div>
        <div
          v-else-if="searchResults.length === 0 && searchQuery.length >= 2"
          class="px-4 py-2 text-gray-500"
        >
          No monsters found
        </div>
        <ComboboxOption
          v-for="monster in searchResults"
          :key="monster.id"
          v-slot="{ active }"
          :value="monster"
          as="template"
        >
          <li
            class="relative flex cursor-pointer select-none items-center justify-between px-4 py-2"
            :class="[
              active
                ? 'bg-red-600 text-white'
                : 'text-gray-900 dark:text-white',
            ]"
          >
            <div class="flex items-center">
              <span class="font-medium">{{ monster.name }}</span>
              <source-tag
                v-if="monster.document?.name"
                :title="monster.document.name"
                :text="monster.document.key"
                class="ml-2"
              />
            </div>
            <span :class="[active ? 'text-white' : 'text-gray-500']">
              CR {{ monster.challenge_rating }}
            </span>
          </li>
        </ComboboxOption>
        <div
          v-if="isLoadingMore"
          class="px-4 py-2 text-gray-500"
        >
          Loading more...
        </div>
        <div
          v-else-if="!hasMore && searchResults.length > 0"
          class="px-4 py-2 text-gray-500"
        >
          No more results...
        </div>
      </ComboboxOptions>
    </Combobox>
  </div>
</template>

<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/vue';
import { ref, watchEffect } from 'vue';
import { useAPI, API_ENDPOINTS } from '~/composables/api';
import { useSourcesList } from '~/composables/sources';
import type { Monster } from '~/types/monster';
import type { RawMonster } from '~/types/APIMonster';
const emit = defineEmits<{
  (e: 'select', monster: Monster): void;
}>();

const searchQuery = ref('');
const searchResults = ref<Monster[]>([]);
const selectedMonster = ref<Monster | null>(null);
const isSearching = ref(false);
const isLoadingMore = ref(false);
const currentPage = ref(1);
const totalCount = ref(0);
const hasMore = ref(true);
const { findPaginated } = useAPI();
const { sources } = useSourcesList();

const optionsRef = ref<HTMLElement | null>(null);

// Improved monster mapping function
const mapMonsterFromAPI = (monster: RawMonster): Monster => {
  const base = {
    id: String(monster.slug || monster.key || monster.id || ''),
    name: String(monster.name) || '',
    challenge_rating: String(
      monster.challenge_rating || monster.challenge_rating_text || '0'
    ),
    challenge_rating_decimal: Number(monster.challenge_rating_decimal) || 0,
  };

  return !monster.document
    ? base
    : {
      ...base,
      document: {
        name: monster.document.name || '',
        key: monster.document.key || '',
      }
    };
};

let debounceTimeout: ReturnType<typeof setTimeout>;

// Function to check if we're near the bottom of the scroll
const isNearBottom = (element: HTMLElement) => {
  const threshold = 300; // pixels from bottom - increased to start loading earlier
  return (
    element.scrollHeight - element.scrollTop - element.clientHeight < threshold
  );
};

// Function to handle scroll events
const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  if (isNearBottom(target) && !isLoadingMore.value && hasMore.value) {
    loadMore();
  }
};

// Function to load more results
const loadMore = async () => {
  if (isLoadingMore.value || !hasMore.value) return;

  isLoadingMore.value = true;
  try {
    const response = await findPaginated<RawMonster>({
      endpoint: API_ENDPOINTS.monsters,
      sources: sources.value,
      itemsPerPage: 25,
      pageNo: currentPage.value + 1,
      queryParams: { name__icontains: searchQuery.value },
    });

    if (response?.results?.length) {
      const newMonsters = response.results.map(mapMonsterFromAPI);
      searchResults.value = [...searchResults.value, ...newMonsters];
      currentPage.value++;
      totalCount.value = response.count;
      hasMore.value = searchResults.value.length < totalCount.value;

      // If we still have more results, preemptively load the next page
      if (hasMore.value) loadMore();
    } else {
      hasMore.value = false;
    }
  } catch (error) {
    console.error('Error loading more monsters:', error);
  } finally {
    isLoadingMore.value = false;
  }
};

// Debounced search using watchEffect
watchEffect(
  () => {
    const query = searchQuery.value;

    // Clear previous timeout
    clearTimeout(debounceTimeout);

    if (!query || query.length < 2) {
      searchResults.value = [];
      return;
    }

    // Set new timeout
    debounceTimeout = setTimeout(async () => {
      isSearching.value = true;
      try {
        const response = await findPaginated<RawMonster>({
          endpoint: API_ENDPOINTS.monsters,
          sources: sources.value,
          itemsPerPage: 25,
          pageNo: 1,
          queryParams: { name__icontains: query },
        });
        searchResults.value = response?.results?.map(mapMonsterFromAPI) || [];
        totalCount.value = response?.count || 0;
        currentPage.value = 1;
        hasMore.value = searchResults.value.length < totalCount.value;
      } catch (error) {
        console.error('Error searching monsters:', error);
        searchResults.value = [];
      } finally {
        isSearching.value = false;
      }
    }, 300);
  },
  { flush: 'post' },
);

// Handle selection
watchEffect(() => {
  const monster = selectedMonster.value;
  if (!monster) return;

  emit('select', monster);
  selectedMonster.value = null;
  searchQuery.value = '';
});
</script>
