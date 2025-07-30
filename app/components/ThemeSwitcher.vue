<template>
  <ToolButton 
    :on-click-handler="toggleTheme"
    :title="theme === 'light' ? 'Dark Mode' : 'Light Mode'"
  >
    <div class="dark:hidden">
      <Icon name="heroicons:sun" />
    </div>

    <div class="hidden dark:block">
      <Icon name="heroicons:moon" />
    </div>
    
  </ToolButton>
</template>

<script setup lang="ts">
const { theme, toggleTheme } = useThemeSwitcher();

</script>
