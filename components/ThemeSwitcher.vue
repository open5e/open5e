<template>
  <button
    class="flex size-10 items-center justify-center rounded-full"
    :class="{
      'bg-fog hover:bg-smoke': theme === 'light',
      'bg-basalt text-white hover:bg-granite': theme === 'dark',
      'hidden': !theme,
    }"
    :aria-roledescription="
      theme === 'light' ? 'Dark Mode Toggle' : 'Light Mode Toggle'
    "
    @click="toggleTheme"
  >
    <Icon
      :name="theme === 'light' ? 'heroicons:sun' : 'heroicons:moon'"
      class="text-center text-lg"
    />
  </button>
</template>

<script setup lang="ts">
const { theme, toggleTheme } = useThemeSwitcher();
</script>
