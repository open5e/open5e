<template>
  <div class="my-2 flex items-end justify-between gap-2 md:gap-3">
    <!-- RENDER SEARCH BAR -->
    <div
      v-if="search"
      class="relative border-b-2 border-red-400"
    >
      <Icon
        name="majesticons:search-line"
        class="absolute bottom-1.5 mr-2 size-4"
      />

      <input
        :id="search?.name"
        :name="search?.name"
        placeholder="Search..."
        :value="filterState.fieldsState.value[search.filterField]"
        class="w-20 bg-transparent pl-6 outline-none transition-colors focus:w-auto focus:bg-fog dark:focus:bg-basalt sm:w-auto"
        @input="
          filterState.updateField(
            search?.filterField,
            $event.target?.value ?? '',
          )
        "
      />
    </div>

    <!-- Render selectFields as drop-down lists -->
    <template v-if="selectFields">
      <div
        v-for="field in selectFields"
        :key="field.name"
        class="grid columns-1 justify-center"
      >
        <label
          class="font-serif text-xs"
          :for="field.name"
        >
          {{ field.name }}
        </label>

        <select
          :id="field.name"
          :key="field.name"
          :name="field.name"
          class="cursor-pointer bg-transparent fill-red text-center"
          :value="filterState.fieldsState.value[field.filterField]"
          @input="
            filterState.updateField(field.filterField, $event?.target.value)
          "
        >
          <option value="">
            -
          </option>

          <option
            v-for="option in field.options"
            :key="option.name"
            :value="option.value"
          >
            {{ option.name }}
          </option>
        </select>
      </div>
    </template>

    <!-- Render checkboxFields as checkboxes -->
    <template v-if="checkboxFields">
      <div
        v-for="checkbox in checkboxFields"
        :key="checkbox.name"
        class="flex flex-col justify-start"
      >
        <label
          class="block font-serif text-xs"
          :for="checkbox.name"
        >
          {{ checkbox.name }}
        </label>

        <input
          :id="checkbox.name"
          type="checkbox"
          :name="checkbox.filterField"
          :checked="filterState.fieldsState.value[checkbox.filterField] === true"
          class="my-1 size-full accent-blood"
          @input="
            filterState.updateField(
              checkbox.filterField,
              $event.target.checked ? true : undefined,
            )
          "
        />
      </div>
    </template>

    <ApiTableButton
      name="Clear filter"
      :disabled="!filterState.canClearFilter.value"
      icon="heroicons:x-mark"
      :class="{
        invisible: !filterState.canClearFilter.value,
      }"
      @click="filterState.clearFilter"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<
  {
    filterState: FilterState<Fields>
    search: {
      name: string
      filterField: string
    }
    selectFields: {
      name: string
      filterField: string
      options: { name: string, value: string }[]
    }[]
    checkboxFields: {
      name: string
      filterField: string
    }[]
  }
>()
</script>
