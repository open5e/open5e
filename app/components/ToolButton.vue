<template>
  <div class="group relative font-bold text-white">
    <button
      class="group relative z-20 m-1 flex size-10 items-center justify-center rounded-full  bg-red text-lg group-hover:bg-red-300"
      @click="() => onClickHandler()"
    >
      <slot />
    </button>
    <div class="absolute right-8 top-0 z-10 hidden h-10 justify-center overflow-hidden text-nowrap bg-red px-4 align-middle text-sm font-bold uppercase transition-all group-hover:grid">
      <span class="mr-4 mt-[0.6rem] inline-block text-center align-middle text-white">{{ title }}</span>
      <span class="absolute -right-5 size-10 rounded-full bg-white dark:bg-darkness"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  onClickHandler: { type: Function, default: () => undefined },
  title: { type: String, default: () => '' }
});
</script>

<style>

</style>