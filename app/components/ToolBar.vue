<template>
  <ul class="grid gap-2">
    <li>
      <ThemeSwitcher />
    </li>

    <li class="hidden sm:block">
      <ToolButtonEncounterBuilder 
        @btn-clicked="$emit('encounter-builder-clicked')"
      />
    </li>

    <li>
      <ToolButtonSourceSelector />
    </li>

    <li>
      <ToolButtonReportIssue />
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineEmits(['encounter-builder-clicked']);



</script>

<style>

</style>