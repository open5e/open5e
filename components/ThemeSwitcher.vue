<template>
  <div>
    <button
      class="mx-2 mt-1 h-min rounded-full bg-fog px-4 py-3 hover:bg-smoke dark:hidden"
      @click="handleClick"
    >
      <Icon
        name="heroicons:moon"
        class="hidden text-center text-lg dark:visible"
      />
    </button>
    <button
      class="mx-2 mt-1 hidden h-min rounded-full bg-basalt px-4 py-3 text-white hover:bg-granite dark:block"
      @click="handleClick"
    >
      <Icon
        name="heroicons:sun"
        class="hidden text-center text-lg dark:visible"
      />
    </button>
  </div>
</template>

<script>
export default {
  /* load theme preference before page and insert them into the head. This is to
   * avoid flicker on load. 1st check local storage, then check media preferences
   */

  setup: function () {
    useHead({
      script: [
        {
          children: `if (localStorage.theme === "dark" || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }`,
        },
      ],
    });
  },
  methods: {
    handleClick: () => {
      const body = document.documentElement;
      if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    },
  },
};
</script>
