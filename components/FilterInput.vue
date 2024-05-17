<template>
  <div class="filter-wrapper">
    <label
      :for="id"
      class="floating-label"
      :class="{ 'floating-label--top': isLabelFloating }"
      >{{ placeholder }}</label
    >
    <input
      :id="id"
      ref="input"
      v-model="filterText"
      class="filter-input bg-fog dark:bg-basalt dark:text-white"
      type="input"
      aria-description="Results will update as you type."
      @input.stop="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <button v-show="filterValue" class="filter-clear" @click="clearSearch()">
      <img src="/img/x-close.png" alt="Clear filter" />
    </button>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Filter...',
  },
});

const filterText = ref('');
const isLabelFloating = ref(false);
const input = ref(null);
const filterValue = computed(() => {
  return filterText.value;
});
const emit = defineEmits(['input']);

function clearSearch() {
  filterText.value = '';
  isLabelFloating.value = false;
  emit('input', filterText.value);
  input.value.focus();
}
function onInput() {
  emit('input', filterText.value);
}

function onFocus() {
  isLabelFloating.value = true;
}

function onBlur() {
  if (filterText.value.length === 0) {
    isLabelFloating.value = false;
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
    content: '';
    height: 100%;
    width: 3rem;
    opacity: 0.5;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url('/img/search-icon.png');
    background-repeat: no-repeat;
    background-position: 0.5rem center;
    background-size: 1.2rem;
    pointer-events: none;
  }

  .floating-label {
    position: absolute;
    top: 6px;
    left: 28px;
    padding-inline: 4px;

    font-size: 1rem;
    font-weight: normal;
    font-family: 'Source Sans Pro', sans-serif;
    color: $color-gray;
    pointer-events: none;
    transition: all 100ms ease;

    &.floating-label--top {
      top: -10px;
      left: auto;
      right: 32px;

      background: #fff;
    }
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
    background: none;
    border: none;
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    padding: 0;
    width: 1rem;
    height: 1rem;

    img {
      opacity: 0.3;
      width: 100%;
      cursor: pointer;

      &:hover {
        opacity: 0.6;
      }
    }
  }
}
</style>
