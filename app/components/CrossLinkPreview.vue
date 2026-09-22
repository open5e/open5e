<template>
  <article
    :style="popupStyle"
    class="pointer-events-none fixed border border-red bg-fog px-3 text-charcoal dark:bg-charcoal dark:text-fog md:group-hover:visible"
    :class="!linkPreviewState && 'invisible'"
  >
    <p class="text-nowrap">
      <span class=" font-serif text-lg">
        {{ state?.data?.name }}
      </span>
      <span class="">
        {{ ` | ${category}` }}
      </span>
    </p>
    <p class="italic">{{ formatSourceDeclaration }}</p>
  </article>
</template>

<script setup lang="ts">

import type { Open5eData } from '@/types';

const { linkPreviewState } = useLinkPreview();
const state = linkPreviewState;


const popup = ref<HTMLElement | null>(null);
const mouse = ref<{ x: number; y: number } | null>(null);

const OFFSET = 12; // gap between cursor and popup
const MARGIN = 8;  // minimum gap from viewport edges

const popupStyle = computed(() => {
  if (!mouse.value) return {};

  const width = popup.value?.offsetWidth ?? 0;
  const height = popup.value?.offsetHeight ?? 0;
  let left = mouse.value.x + OFFSET;
  let top = mouse.value.y + OFFSET;

  // Flip to the other side of the cursor if we'd overflow right/bottom
  if (left + width > window.innerWidth - MARGIN) left = mouse.value.x - OFFSET - width;
  if (top + height > window.innerHeight - MARGIN) top = mouse.value.y - OFFSET - height;

  // Final clamp so it never goes off the left/top either
  left = Math.max(MARGIN, left);
  top = Math.max(MARGIN, top);

  return { left: `${left}px`, top: `${top}px` };
});

// Listen on the parent link, since that's the element being hovered
const instance = getCurrentInstance();
let parent: HTMLElement | null = null;

const onMove = (e: MouseEvent) => mouse.value = { x: e.clientX, y: e.clientY };

onMounted(() => {
  parent = (instance?.proxy?.$el as HTMLElement | undefined)?.parentElement ?? null;
  parent?.addEventListener('mousemove', onMove);
});

onBeforeUnmount(() => {
  parent?.removeEventListener('mousemove', onMove);
});

// clear Link Preview data when a link is clicked
const router = useRouter();
const { clearLinkPreviewState } = useLinkPreview();
router.afterEach(() => clearLinkPreviewState());

const endpointToCategoryDisplayNameMap = {
  '/monsters': 'Monster',
  '/species': 'Species',
  '/classes': 'Class',
  '/spells': 'Spell',
  '/magic-items': 'Magic Item',
  '/equipment': 'Equipment',
  '/feats': 'Feat',
  '/': '',
} as const;

type Endpoint = keyof typeof endpointToCategoryDisplayNameMap;

const category = computed(() => {
    if (!state || !state?.value) return '';
    const category = unref(state.value.category ?? '/') as Endpoint;
    return endpointToCategoryDisplayNameMap[category];
});

const formatSourceDeclaration = computed(() => {
  if (!state || !state.value) return '';
  const { document } = state.value.data as Open5eData;
  return `${document.name} (${document.publisher.name})`;
});
</script>
