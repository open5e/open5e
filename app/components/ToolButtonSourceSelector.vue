<template>
  <ToolButton
    class="relative"
    :on-click-handler="() => showModal = true"
    :title="`Select Sources`"
  >
  <div class="flex flex-col items-center justify-center">
    <Icon name="majesticons:book-open-line" class="z-20 -my-1 size-6"/>
    <p
      v-if="selectedSourcesFraction"
      class="z-30 my-0 text-nowrap py-0 text-xs text-black  dark:text-white"
    >
      {{ selectedSourcesFraction }}
    </p>
  </div>
    <ModalSourceSelector
      :show="showModal"
      @close="showModal = false"
    />

  </ToolButton>
</template>

<script setup lang="ts">
const showModal = ref(false);

const { sourceDocuments } = useCatalog();
const { sources } = useSourcesList();

const selectedSourcesFraction = computed(() => {
  if (!sources.value || sourceDocuments.value.length === 0) return '';
  const allSourceDocumentKeys = sourceDocuments.value.map(document => document.key);
  const numerator = sources.value
    .filter(source => allSourceDocumentKeys.includes(source))
    .length;
  const denominator = sourceDocuments.value.length;
  return `${numerator}/${denominator}`;
});

</script>
