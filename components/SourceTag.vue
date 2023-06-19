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

<script>
import colors from 'tailwindcss/colors';

export default {
  props: {
    text: String,
    title: String,
    textColor: {
      type: String,
      default: colors.slate[900],
    },
    background: {
      type: String,
      default: colors.slate[100],
    },
    border: {
      type: String,
      default: colors.slate[300],
    },
  },
  computed: {
    calcHash: function () {
      return this.hashCode(this.text);
    },
  },
  methods: {
    hashCode: function (str) {
      let hash = 0;
      for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = chr + (hash << 6) - hash;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    },
    computedColor: function (str, s, l) {
      let h = this.hashCode(str);
      let hh = (h + Math.abs(h).toString().split('').reverse().join('')) % 360;
      return 'hsl(' + hh + ', ' + s + '%, ' + l + '%)';
    },
  },
};
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
  top: -1px;
}
</style>
