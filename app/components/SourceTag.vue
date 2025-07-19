<script>
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
    :style="{
      backgroundColor: text ? computedColor(text, 80, 95) : background,
      color: text ? computedColor(text, 50, 30) : textColor,
      // borderColor: text ? computedColor(text, 80, 90) : border,
    }"
  >
    {{ text }}
  </span>
</template>

<script setup>
import colors from 'tailwindcss/colors';

defineProps({
  text: { type: String, default: '' },
  title: { type: String, default: '' },
  textColor: { type: String, default: colors.slate[900] },
  background: { type: String, default: colors.slate[100] },
  border: { type: String, default: colors.slate[300] },
});

// this creates a quick (but non-cryptographic) numeric hash of the string
function hashCode(str) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    // convert each character of the string to a number
    const chr = str.charCodeAt(i);
    // then bitshift the number by 5 and add it to the hash
    hash = chr + (hash << 6) - hash;
    // then convert the hash to a 32bit integer
    hash |= 0;
  }
  return hash;
}
function computedColor(str, s, l) {
  // take in a numerical string that will become the hue
  let h = hashCode(str);
  // reverse the number and append it to the original number
  // this ensures even small changes to any character of the string will result in a different color
  h = h + Math.abs(h).toString().split('').reverse().join('');
  // convert the number to a hue in the HSL color space by taking modulo 360 of the hash
  h = h % 360;
  // generate an hsl color using the hue value and passed in saturation and lightness values
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}
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
