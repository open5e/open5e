<script>
/**
 * ApiTableButton - customizable button that displays an icon and can be clicked to trigger events.
 *
 * -= PROPS (INPUTS) =-
 * @prop {Boolean} disabled - Controls whether the button is disabled
 * @prop {String} name - Button name/label, used for accessibility
 * @prop {String} icon - The name of the icon to be displayed inside the button.
 * @prop {String} sizeClasses - TailwindCSS classes to overwrite default size
 *
 * -= EMITS (OUTPUTS) =-
 * @emits click - Emits a click event when the button is clicked.
 *
 * -= DEPENDENCIES =-
 * @component Icon -> Renders an icon based on the provided `icon` prop.
 */
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

<script setup>
defineProps({
  disabled: Boolean,
  name: { type: String, required: true },
  icon: { type: String, required: true },
  sizeClasses: { type: String, default: 'w-8 h-8' },
});

defineEmits(['click']);
</script>
