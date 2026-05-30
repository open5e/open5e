<template>
  <div
    role="tablist"
    class="flex gap-1 border-b border-granite"
  >
    <button
      v-for="tab in tabs"
      :id="`tab-${tab.id}`"
      :key="tab.id"
      type="button"
      role="tab"
      :aria-selected="model === tab.id"
      :aria-controls="`tabpanel-${tab.id}`"
      :tabindex="model === tab.id ? 0 : -1"
      class="cursor-pointer px-4 py-2 text-left transition-colors"
      :class="model === tab.id
        ? 'border-b-2 border-red text-blood dark:text-fireball'
        : 'text-black dark:text-white hover:text-red/50 dark:hover:text-red/50'"

      @click="model = tab.id"
      @keydown="onKeydown($event, tab.id)"
    >
      <span class="block">{{ tab.label }}</span>
      <span
        v-if="tab.subtitle"
        class="block text-xs text-granite"
      >
        {{ tab.subtitle }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TabBarItem } from '@/types';

const props = defineProps<{
  tabs: TabBarItem[];
}>();

const model = defineModel<string>({ required: true });

function onKeydown(event: KeyboardEvent, tabId: string) {
  const ids = props.tabs.map(tab => tab.id);
  const currentIndex = ids.indexOf(tabId);
  if (currentIndex === -1) return;

  let nextIndex = currentIndex;

  if (event.key === 'ArrowRight') {
    nextIndex = (currentIndex + 1) % ids.length;
  } else if (event.key === 'ArrowLeft') {
    nextIndex = (currentIndex - 1 + ids.length) % ids.length;
  } else {
    return;
  }

  event.preventDefault();
  model.value = ids[nextIndex]!;
  document.getElementById(`tab-${ids[nextIndex]}`)?.focus();
}
</script>
