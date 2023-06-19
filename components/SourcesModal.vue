<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-100" @close="closeModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          @close="closeModal()"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-100 overflow-y-auto">
        <div
          class="flex min-h-full justify-center p-4 text-center items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div>
                <div class="mt-3 text-left sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-base mt-0 font-semibold leading-6 text-gray-900"
                    >Select Sources</DialogTitle
                  >
                  <div class="mt-2">
                    <fieldset>
                      <legend class="sr-only">Source Selection</legend>
                      <div class="space-y-3">
                        <div
                          v-for="(group, organization) in groupedDocuments"
                          :key="organization"
                        >
                          <h6 class="mt-2">{{ organization }}</h6>
                          <div
                            v-for="(document, index) in group"
                            :key="document.slug"
                            class="relative flex items-start"
                          >
                            <div class="flex h-6 items-center">
                              <input
                                :id="document.slug"
                                v-model="selectedSourcesComputed"
                                :name="document.slug"
                                type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                :value="document.slug"
                              />
                            </div>
                            <div class="ml-3 text-sm leading-6">
                              <label
                                :for="document.slug"
                                class="font-medium text-gray-900"
                                >{{ document.title }}</label
                              >
                              <span class="text-gray-500">
                                {{ document.slug }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
              <div
                class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                  @click="saveSelection()"
                >
                  Update
                </button>
                <button
                  ref="cancelButtonRef"
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  @click="closeModal()"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { useMainStore } from '~/store';

export default {
  data() {
    return {
      selectedSources: [],
      open: false,
    };
  },
  computed: {
    store() {
      return useMainStore();
    },
    sourceSelection: function () {
      return this.store.sourceSelection;
    },
    documents: function () {
      return this.store.documents;
    },
    groupedDocuments: function () {
      return this.documents.reduce((grouped, document) => {
        (grouped[document.organization] =
          grouped[document.organization] || []).push(document);
        return grouped;
      }, {});
    },
    selectedSourcesComputed: {
      get: function () {
        return this.selectedSources;
      },
      set: function (newValue) {
        this.selectedSources = newValue;
      },
    },
  },
  watch: {
    'store.sourceSelection': function (newVal) {
      this.selectedSources = [...newVal];
    },
  },
  created() {
    this.searchText = this.$route.query.text;
    this.store.loadDocuments();
    this.selectedSources = this.store.sourceSelection;
  },
  methods: {
    closeModal() {
      this.$emit('close'); // emits a 'close' event to the parent component
      setTimeout(() => {
        this.selectedSources = this.store.sourceSelection;
      }, 300);
    },
    saveSelection() {
      this.store.setSources(this.selectedSources);
      this.closeModal();
    },
  },
};
</script>

<script setup>
import { ref } from 'vue';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

const open = ref(true);
</script>
