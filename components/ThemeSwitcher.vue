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
/* load theme preference before page and insert them into the head. This is to
 * avoid flicker on load. 1st check local storage, then check media preferences
 */
useHead({
  script: [
    {
      children: `
          if (localStorage.theme === "dark" || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add('dark')
          } else {
          document.documentElement.classList.remove('dark')
          }
        `,
    },
  ],
});

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
