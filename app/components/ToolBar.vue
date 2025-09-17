<template>
  <ul class="mt-1 grid gap-3 border-b-4 border-red pb-2 sm:border-none">
    <li>
      <ToolButtonSourceSelector />
    </li>
    
    <li>
      <ToolButtonEncounterBuilder 
      @btn-clicked="$emit('encounter-builder-clicked')"
      />
    </li>
    
    <li>
      <ThemeSwitcher />
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