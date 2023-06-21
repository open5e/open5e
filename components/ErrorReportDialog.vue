<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
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
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
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
                <h3 class="mt-0 mb-4">
                  <Icon
                    name="fa-brands:github"
                    class="text-slate-500 w-8 h-8"
                  ></Icon>
                  Report an issue
                </h3>
                <div>
                  <div class="mt-2">
                    <label
                      for="issueTitle"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Short title for your problem</label
                    >
                    <input
                      id="issueTitle"
                      v-model="newIssueTitle"
                      type="text"
                      name="issueTitle"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div class="mt-2">
                    <label
                      for="comment"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Describe your issue</label
                    >
                    <textarea
                      id="comment"
                      v-model="description"
                      rows="4"
                      name="comment"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <p v-if="errorMessage" class="text-red-600">
                  {{ errorMessage }}
                </p>
                <br />
                <a
                  href="https://guides.github.com/features/mastering-markdown/"
                  target="_blank"
                  >Markdown Reference</a
                >
              </div>
              <div
                class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                  @click="reportIssue()"
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  ref="cancelButtonRef"
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

<script setup>
import { ref } from 'vue';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { defineEmits } from 'vue';
import { CheckIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits(['close']);

const open = ref(true);
const description = ref('');
const newIssueTitle = ref('');
const errorMessage = ref('');

const reportIssue = () => {
  if (description.value.trim() === '') {
    errorMessage.value = 'Please describe the issue before submitting.';
    return;
  }

  const issueTitle = 'Issue reported by user';
  const issueBody = `
    **URL**: ${window.location.href}
    **User Agent**: ${navigator.userAgent}
    **Description**: ${description.value}
  `;

  const issueURL = `https://github.com/open5e/open5e/issues/new?template=issue-report.md&title=${encodeURIComponent(
    issueTitle
  )}&body=${encodeURIComponent(issueBody)}`;
  window.open(issueURL, '_blank');

  // Clear the form and error message
  description.value = '';
  errorMessage.value = '';

  // Close the modal
  open.value = false;
  emit('close');
};
const closeModal = () => {
  open.value = false;
  emit('close');
};
</script>
