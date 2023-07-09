<template>
  <button
    class="mx-2 mt-1 h-min rounded-full bg-fog px-4 py-3 hover:bg-smoke dark:bg-basalt dark:text-white dark:hover:bg-granite"
    @click="handleClick"
  >
    <Icon name="heroicons:moon" class="text-center text-lg" />
  </button>
</template>

<script>
export default {
  methods: {
    handleClick: () => {
      const body = document.documentElement;
      if (body.classList.contains('dark')) {
        body.classList.remove('dark');
      } else {
        body.classList.add('dark');
      }
    },
  },
};
</script>
