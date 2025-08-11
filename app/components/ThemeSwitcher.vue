<template>
  <ToolButton 
    :on-click-handler="toggleTheme"
    :title="theme === 'light' ? 'Dark Mode' : 'Light Mode'"
  >
    <div class="dark:hidden">
      <Icon name="majesticons:moon-line" class="size-6"/>
    </div>

    <div class="hidden dark:block">
      <Icon name="majesticons:sun-line" class="size-6" />
    </div>
    
  </ToolButton>
</template>

<script setup lang="ts">
const { theme, toggleTheme } = useThemeSwitcher();

</script>
