<script lang="ts">
/**
 * SourceTag.vue - Renders a colorful bubble containing infomation about an
 * item from the Open5e API's source document. Inline, designed by follow the
 * title of the API result.
 *
 * -= PROPS (INPUTS) =-
 * @prop {String} text - Text displayed on the tag. Typically a source's 'key'
 * @prop {String} title - Tooltip text that appears on hover
 * @prop {String} textColor - text color of tag
 * @prop {String} background - background color of tag
 * @prop {String} border - border color of tag
 */
</script>

<template>
  <span
    :class="['tag-element', 'font-sans', 'font-medium', 'ml-2']"
    :title="title"
    :style="tagStyle"
  >
    {{ text }}
  </span>
</template>

<script setup lang="ts">
import colors from 'tailwindcss/colors';

const props = defineProps({
  text: { type: String, default: '' },
  title: { type: String, default: '' },
  textColor: { type: String, default: colors.slate[900] },
  background: { type: String, default: colors.slate[100] },
  border: { type: String, default: colors.slate[300] },
});

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  }
  return h >>> 0;
}

function sourceTagColors(str: string) {
  const h = hash(str);
  const hue = (h * 137.508) % 360;
  return {
    background: `hsl(${hue}, ${78 + (h % 17)}%, ${79 + ((h >> 8) % 9)}%)`,
    color: `hsl(${hue}, ${55 + ((h >> 4) % 20)}%, ${16 + ((h >> 12) % 9)}%)`,
  };
}

const tagStyle = computed(() => {
  if (!props.text) {
    return {
      backgroundColor: props.background,
      color: props.textColor,
    };
  }
  const { background, color } = sourceTagColors(props.text);
  return { backgroundColor: background, color };
});
</script>

<style lang="scss" scoped>
.tag-element {
  display: inline-block;
  font-size: 8px;
  padding: 1px 3px;
  line-height: 10px;
  border-radius: 4px;
  text-transform: uppercase;
  position: relative;
  height: min-content;
  top: -1px;
}
</style>
