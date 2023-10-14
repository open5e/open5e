<template>
  <div>
    <button
      class="rounded-md p-2 outline outline-1 outline-blood hover:bg-blood hover:text-white"
    >
      <Icon name="heroicons:funnel" class="mr-1" />
      Filter
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterProperties: '',
    };
  },
  computed: {
    filterValue: function () {
      return this.filterText;
    },
  },
  methods: {
    clearSearch: function () {},
  },
};
</script>
