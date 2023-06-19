<template>
  <NuxtLayout />
</template>

<script>
import { useMainStore } from '@/store';

export default {
  mounted() {
    const mainStore = useMainStore();
    mainStore.initializeSources();
  },
};
</script>
