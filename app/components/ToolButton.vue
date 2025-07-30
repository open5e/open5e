<template>
  <div class="group relative text-black dark:text-white">
    <button
      class="group relative z-20 m-1 flex size-10 items-center justify-center rounded-full border bg-fog text-lg group-hover:bg-smoke  dark:bg-basalt dark:hover:bg-granite"
      @click="() => onClickHandler()"
    >
      <slot />
    </button>
    <div class="absolute right-10 top-0 z-10 hidden h-10 justify-center overflow-hidden text-nowrap bg-fog px-4 align-middle text-sm font-bold uppercase transition-all group-hover:grid dark:bg-basalt">
      <span class="mr-4 mt-2 inline-block text-center align-middle">{{ title }}</span>
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