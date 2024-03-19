<template>
  <ModalDialog>
    <slot>
      <h2
        class="mb-2 mt-0 flex w-full justify-between border-b-4 border-red-400 pb-2"
      >
        Select Sources
        <span class="text-sm">
          <button class="mr-1 text-blood hover:text-red" @click="selectAll()">
            All
          </button>
          <button
            class="ml-1 text-granite hover:text-basalt"
            @click="deselectAll()"
          >
            None
          </button>
        </span>
      </h2>
      <fieldset>
        <div class="space-y-3">
          <div
            v-for="(group, organization) in allSourcesByPublisher"
            :key="organization"
          >
            <h3 class="mt-2">{{ organization }}</h3>
            <div
              v-for="document in group"
              :key="document.slug"
              class="relative flex items-start"
            >
              <div class="flex h-6 items-center">
                <input
                  :id="document.slug"
                  v-model="sourcesFormState"
                  :name="document.slug"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-blue-600 accent-blood focus:ring-blue-600"
                  :value="document.slug"
                />
              </div>
              <div class="ml-3 text-sm leading-6">
                <label :for="document.slug" class="font-medium text-gray-900">
                  {{ document.title }}
                </label>
                <source-tag :title="document.title" :text="document.slug" />
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </slot>
    <template #actions>
      <button
        ref="cancelButtonRef"
        type="button"
        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
        @click="close()"
      >
        Cancel
      </button>
      <button
        type="button"
        class="inline-flex w-full justify-center rounded-md bg-blood px-3 py-2 text-sm font-semibold text-white shadow-sm ring-offset-2 hover:ring-2 hover:ring-blood focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2"
        @click="save()"
      >
        Update
      </button>
    </template>
  </ModalDialog>
</template>

<script>
import { useMainStore } from '~/store';
import SourceTag from '~/components/SourceTag.vue';

export default {
  data() {
    return {
      sourcesFormState: [], // current state of the sources form data
    };
  },
  computed: {
    store() {
      return useMainStore();
    },

    // array of all currently selected sources
    sourceSelection: function () {
      return this.store.sourceSelection;
    },

    // array of all available sources
    allSources: function () {
      return this.store.documents;
    },

    // object of sources arranged by publisher (key: publisher, value: array of sources)
    allSourcesByPublisher: function () {
      return this.allSources.reduce((grouped, source) => {
        (grouped[source.organization] =
          grouped[source.organization] || []).push(source);
        return grouped;
      }, {});
    },
  },

  // update form state when the source selection is updated
  watch: {
    'store.sourceSelection': function (sourcesFromStore) {
      this.sourcesFormState = [...sourcesFromStore];
    },
  },

  created() {
    this.sourcesFormState = this.store.sourceSelection;
  },
  methods: {
    close() {
      this.$emit('close'); // emits a 'close' event to the parent component
      setTimeout(() => {
        this.sourcesFormState = this.store.sourceSelection;
      }, 300);
    },
    save() {
      this.store.setSources(this.sourcesFormState);
      this.close();
    },
    selectAll() {
      this.sourcesFormState = this.allSources.map((source) => source.slug);
    },
    deselectAll() {
      this.sourcesFormState = [];
    },
  },
};
</script>
