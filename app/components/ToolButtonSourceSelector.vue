<template>
  <ToolButton
    class="relative"
    :on-click-handler="() => showModal = true"
    :title="`Select Sources`"
  >
    <Icon name="heroicons:book-open" class="mb-1"/>
    <p class="absolute -bottom-0.5 text-[0.6rem]">{{ sourceCount }}</p>

    <ModalSourceSelector 
      :show="showModal"
      :documents="documents"
      @close="showModal = false"
    />

  </ToolButton>
</template>

<script setup>
const showModal = ref(false);

const { data: documents } = useDocuments({
  fields: ['key', 'name', 'publisher', 'gamesystem'].join(','),
  publisher__fields: ['name', 'key'].join(','),
  gamesystem__fields: ['name', 'key'].join(','),
});

const { sources } = useSourcesList();
const sourceCount = computed(() => {
  if (!sources || !documents) return '';
  return `${sources.value.length}/${documents.value?.length}`;
});

</script>
