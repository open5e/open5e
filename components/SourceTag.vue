<template>
  <span
    :class="['tag-element', 'border']"
    :title="title"
    :style="{
      backgroundColor: title ? computedColor(title, 80, 90) : background,
      color: textColor,
      borderColor: title ? computedColor(title, 80, 60) : border,
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
  methods: {
    computedColor: function (str, s, l) {
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }

      var h = hash % 360;
      return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    },
  },
};
</script>

<style lang="scss" scoped>
.tag-element {
  display: inline-block;
  font-size: 10px;
  padding: 1px 3px;
  line-height: 10px;
  border-radius: 4px;
  margin-left: 5px;
  margin-right: 3px;
  text-transform: uppercase;
  position: relative;
  top: -1px;
}
</style>
