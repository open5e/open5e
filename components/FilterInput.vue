<template>
<div class="filter-wrapper">
  <input class="filter-input" type="input" :placeholder="placeholder" v-model="filterText"> 
  <img class="filter-clear" src="/img/x-close.png" v-show="filterValue" v-on:click="clearSearch()">
</div>
</template>


<script>
export default {
  computed:{
    filterValue: function() {
      this.$emit('input', this.filterText);
      return this.filterText;
    }
  },
  data() {
    return {
      filterText: '',
    }
  },
  props: {
    placeholder: {
      type: String,
      default: 'Filter...'
    }
  },
  methods:{
    clearSearch: function () {
      this.filterText = '';
    }
  }
}
</script>

<style lang="scss">
@import '../assets/variables';

.filter-wrapper{
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