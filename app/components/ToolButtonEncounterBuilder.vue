<template>
  <ToolButton
    title="Encounter Builder"
    :on-click-handler="() => $emit('btn-clicked')"
  >
    <Icon 
      name="game-icons:crossed-swords"
    />
  </ToolButton>
</template>

<script setup>
defineEmits(['btn-clicked']);
</script>