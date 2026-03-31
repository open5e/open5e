<template>
  <ToolButton
    class="relative"
    :on-click-handler="() => showModal = true"
    :title="`Select Sources`"
  >
    <Icon name="majesticons:book-open-line" class="z-20 size-6"/>
    <p
      v-if="selectedSourcesFraction" 
      class="absolute -bottom-3 z-30 my-0 text-nowrap py-0 text-xs text-black  dark:text-white"
    >
      {{ selectedSourcesFraction }}
    </p>

    <ModalSourceSelector 
      :show="showModal"
      @close="showModal = false"
    />

  </ToolButton>
</template>

<script setup lang="ts">
const showModal = ref(false);

const { data: documents } = useDocuments({ fields: 'key', type: 'SOURCE' });
const { sources } = useSourcesList();

const selectedSourcesFraction = computed(() => {
  if (!sources.value || !documents.value) return '';
  const allSourceDocumentKeys = documents.value.map(document => document.key);
  const numerator = sources.value
    .filter(source => allSourceDocumentKeys.includes(source))
    .length;
  const denominator = documents.value?.length;
  return `${numerator}/${denominator}`;
});

</script>
