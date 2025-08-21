<template>
  <div class="party-builder">
    <div class="mb-2 flex items-center justify-between">
      <h3 class="mt-1 text-lg font-bold">
        Party
      </h3>
    </div>

    <div class="space-y-2">
      <div
        v-for="(row, index) in partyRows"
        :key="index"
        class="flex items-center gap-2"
      >
        <input
          v-model.number="row.count"
          type="number"
          min="1"
          class="w-16 rounded border p-1 text-sm dark:bg-gray-800"
          placeholder="Count"
        />
        <span class="text-sm">at level</span>
        <input
          v-model.number="row.level"
          type="number"
          min="1"
          max="20"
          class="w-16 rounded border p-1 text-sm dark:bg-gray-800"
          placeholder="Level"
        />
        <button
          v-if="partyRows.length > 1"
          class="rounded bg-blood px-1 py-0.5 text-sm font-medium text-white hover:text-black dark:hover:text-fog"
          @click="removePartyRow(index)"
        >
          <Icon name="heroicons:minus" />
        </button>
      </div>
      <button
        class="rounded bg-blood px-1 py-0.5 text-sm font-medium text-white hover:text-black dark:hover:text-fog"
        @click="addPartyRow"
      >
        <Icon name="heroicons:plus" /> Add
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = usePartyStore();
const { partyRows, addPartyRow, removePartyRow }
  = store;

// Ensure we have at least one row
onMounted(() => {
  if (partyRows.value.length === 0) {
    addPartyRow();
  }
});
</script>
