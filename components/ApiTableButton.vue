<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean;
    name: string;
    icon: string;
    sizeClasses?: string;
  }>(),
  {
    sizeClasses: "w-8 h8",
  },
);

defineEmits(["click"]);
</script>

<template>
  <button
    class="flex flex-col items-center justify-center rounded-md text-fog"
    :class="[
      sizeClasses,
      disabled ? 'bg-slate-800' : 'bg-blood hover:bg-fog hover:text-blood',
    ]"
    :disabled="disabled"
    :name="name"
    @click="$emit('click')"
  >
    <span class="sr-only">{{ name }}</span>
    <Icon :name="icon" />
  </button>
</template>
