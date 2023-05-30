<template>
  <span
    class="tag-element"
    :title="title"
    :style="{ backgroundColor: background, color: textColor, border: border }"
  >
    {{ text }}
  </span>
</template>

<script>
export default {
  props: {
    text: String,
    title: String,
    textColor: {
      default: '#ffffff',
    },
    background: {
      default: '#767676',
    },
    border: {
      default: '1px solid #999999',
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
