<template>
  <ToolButton
    class="relative"
    :on-click-handler="() => showModal = true"
    :title="`Select Sources`"
  >
    <Icon name="majesticons:book-open-line" class="z-20 size-6"/>
    <p
      v-if="sourceCount" 
      class="absolute -bottom-3 z-30 text-nowrap px-0.5 py-0 text-xs text-black  dark:text-white"
    >
      {{ sourceCount }}
    </p>

    <ModalSourceSelector 
      :show="showModal"
      @close="showModal = false"
    />

  </ToolButton>
</template>

<script setup>
const showModal = ref(false);

const { data: documents } = useDocuments({ fields: 'key' });

const { sources } = useSourcesList();
const sourceCount = computed(() => {
  if (!sources.value || !documents.value) return '';
  return `${sources.value?.length}/${documents.value?.length}`;
});

</script>
