<template>
  <div class="mt-1">
    <button
      class="mr-1 h-min rounded-full bg-fog px-3 py-2 hover:bg-smoke dark:hidden sm:mx-2 md:px-4 md:py-3"
      aria-roledescription="Dark Mode Toggle"
      @click="handleClick"
    >
      <Icon
        name="heroicons:moon"
        class="hidden text-center text-lg dark:visible"
      />
    </button>
    <button
      class="mr-1 hidden h-min rounded-full bg-basalt px-3 py-2 text-white hover:bg-granite dark:block sm:mx-2 md:px-4 md:py-3"
      aria-roledescription="Light Mode Toggle"
      @click="handleClick"
    >
      <Icon
        name="heroicons:sun"
        class="hidden text-center text-lg dark:visible"
      />
    </button>
  </div>
</template>

<script setup>
useThemeHead();

const handleClick = () => {
  const body = document.documentElement;
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
};
</script>
