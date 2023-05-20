<template>
  <div class="filter-wrapper">
    <input
      v-model="filterText"
      class="filter-input"
      type="input"
      :placeholder="placeholder"
      @input.stop="onInput"
    >
    <img
      v-show="filterValue"
      class="filter-clear"
      src="/img/x-close.png"
      @click="clearSearch()"
    >
  </div>
</template>


<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Filter...'
    }
  },
  data() {
    return {
      filterText: '',
    }
  },
  computed: {
    filterValue: function () {
      return this.filterText;
    }
  },
  methods: {
    clearSearch: function () {
      this.filterText = '';
    },
    onInput: function () {
      this.$emit('input', this.filterText)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/variables';

.filter-wrapper {
  width: 30%;
  min-width: 15rem;
  position: relative;

  &::after {
    content: "";
    height: 100%;
    width: 3rem;
    opacity: 0.5;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url("/img/search-icon.png");
    background-repeat: no-repeat;
    background-position: .5rem center;
    background-size: 1.2rem;
    pointer-events: none;
  }

  .filter-input {
    font-size: $font-size-base;
    border-radius: 2px;
    border: 1px solid $color-smoke;
    height: 2rem;
    width: 100%;
    padding-left: 2rem;
    padding-right: 3rem;
    border-radius: 2rem;
    outline: none;

    &:focus,
    &:active {
      border: 1px solid $color-granite;
    }

  }

  .filter-clear {
    opacity: 0.3;
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    width: 1rem;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }
}
</style>