<template>
  <button class="sr-hidden" @click="handleClick">
    <Icon name="heroicons:moon" />
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
