
<template>
  <!-- Container for both Report Issue button & modal popup -->
    <ToolButton
      :on-click-handler="() => isOpen = !isOpen"
      title="Report an Issue"
    >
      <Icon name="heroicons:exclaimation-circle" />
    </ToolButton>

    <ModalReportIssue
      :show="isOpen"
      @close="isOpen = false"
    />
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);


</script>
