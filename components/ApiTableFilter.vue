<template>
  <div class="my-2 flex items-end justify-between gap-1 md:gap-4">
    <!-- RENDER SEARCH BAR -->
    <div v-if="search" class="relative border-b-2 border-red-400">
      <icon
        name="majesticons:search-line"
        class="absolute bottom-1.5 mr-2 h-4 w-4"
      />
      <input
        :id="search?.name"
        :name="search?.name"
        placeholder="Search..."
        class="w-20 bg-transparent pl-6 outline-none transition-colors focus:w-auto focus:bg-fog dark:focus:bg-basalt sm:w-auto"
        @input="updateFilters(search?.filterField, $event.target?.value ?? '')"
      />
    </div>

    <!-- Render selectFields are drop-down lists -->
    <div
      v-for="field in selectFields"
      :key="field.name"
      class="grid columns-1 justify-center"
    >
      <label class="font-serif text-xs" :for="field.name">
        {{ field.name }}
      </label>
      <select
        :id="field.name"
        :key="field.name"
        :name="field.name"
        class="cursor-pointer bg-transparent fill-red text-center"
        :value="field.value"
        @input="updateFilters(field.filterField, $event?.target.value)"
      >
        <option value="">-</option>
        <option
          v-for="option in field.options"
          :key="option.name"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>
    </div>

    <!-- Render checkboxFields as checkboxes -->
    <div
      v-for="checkbox in checkboxFields"
      :key="checkbox.name"
      class="flex flex-col justify-start"
    >
      <label class="block font-serif text-xs" :for="checkbox.name">
        {{ checkbox.name }}
      </label>
      <input
        :id="checkbox.name"
        type="checkbox"
        :name="checkbox.filterField"
        :checked="checkbox.value === true"
        class="my-1 size-full accent-blood"
        @input="
          updateFilters(
            checkbox.filterField,
            $event.target.checked ? true : undefined
          )
        "
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  search: { type: Object, default: undefined },
  selectFields: { type: Array, default: () => [] },
  checkboxFields: { type: Array, default: () => [] },
  updateFilters: { type: Function, default: () => {} },
});
</script>
