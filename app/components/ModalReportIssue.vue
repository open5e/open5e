<script>
/**
 * ModalReportIssue.vue - A button that opens a modal menu for users to submit
 * website issues via a GoogleSheet
 *
 * -= PROPS (INPUTS) =-
 * This component does not receive any props.
 *
 * -= EMITS =-
 * @emit close: Emitted when the modal is closed. Used by parent to control
 * modal visibility
 *
 * -= DEPENDENCIES =-
 * @component Modal: Displays the issue form as a modal menu
 *
 */
</script>

<script setup>
const isOpen = ref(false);
const formData = ref({});
const status = ref('ready');

const WEBAPP_URL
  = 'https://script.google.com/macros/s/AKfycbzUzyBCluTJXL4GC98i31NRoso0td-zNgBbp8Ws4CmmLMzd3ovYBcX7HyVlo3m-kDLHZA/exec';

const submitIssue = async () => {
  // on click handler for submitting an issue
  status.value = 'pending';
  formData.value['date'] = new Date().toDateString();
  // convert form data to key=value pair string
  const data = Object.entries(formData.value)
    .map(([key, value]) => encodeURI([key, value].join('=')))
    .join('&');
  await $fetch(WEBAPP_URL, {
    method: 'POST',
    body: data,
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
  });
  status.value = 'submitted';
};

const closeModal = () => {
  isOpen.value = false;
  // short delay to give the modal closing animation time to run
  setTimeout(() => {
    formData.value = {};
    status.value = 'ready';
  }, 300);
};
</script>

<template>
  <!-- Container for both Report Issue button & modal popup -->
  <div>
    <button
      class="w-full bg-red-600 px-4 py-1 text-left align-middle hover:bg-red-400 dark:bg-red-700 dark:hover:bg-red-600"
      @click="isOpen = !isOpen"
    >
      <span>Report Issue</span>
      <icon
        name="heroicons:exclaimation-circle"
        class="ml-1 size-6 rounded-full"
      />
    </button>

    <Modal
      :show="isOpen"
      @close="isOpen = false"
    >
      <slot>
        <!-- Bug submission form -->
        <form
          v-if="['ready', 'pending'].includes(status)"
          id="report-issue-form"
          method="POST"
          :action="WEBAPP_URL"
        >
          <legend
            class="mb-3 mt-0 border-b-4 border-red-400 pb-2 font-serif text-2xl"
          >
            Report an Issue
          </legend>
          <ul>
            <li class="mb-2">
              <label
                for="type"
                class="text-lg font-bold"
              >
                What best describes your issue?
              </label>
              <select
                v-model="formData.type"
                name="type"
                class="w-full border bg-transparent p-2 dark:bg-basalt"
              >
                <option value="page">
                  A page is broken or doesn't load properly
                </option>
                <option value="data">
                  Page or API contains incorrect data or spelling mistakes
                </option>
                <option value="visual">
                  Something doesn't quite look right
                </option>
                <option value="accessibility">
                  There is a problem with page accessibility
                </option>
                <option value="misc">
                  Other
                </option>
              </select>
            </li>
            <li class="mb-2">
              <label
                for="description"
                class="text-lg font-bold"
              >
                Can you describe the bug?
              </label>
              <legend class="text-sm italic">
                What happened? What did it look like? What page were you on when
                it happened?
              </legend>
              <textarea
                v-model="formData.description"
                type="text"
                name="description"
                class="block w-full border dark:bg-basalt"
              />
            </li>

            <li class="mb-2">
              <label
                for="reproduction"
                class="text-lg font-bold"
              >
                Reproduction
              </label>
              <legend class="text-sm italic">
                Can you provide steps on how to reproduce the bug? The more
                detail the better. This will help us identify and fix the issue.
              </legend>
              <textarea
                v-model="formData.reproduction"
                type="text"
                name="reproduction"
                class="block h-16 w-full border dark:bg-basalt"
              />
            </li>
          </ul>
        </form>

        <!-- Success Screen (replaces form on successful submission) -->
        <div v-if="status === 'submitted'">
          <p
            class="mb-3 mt-0 border-b-4 border-red-400 pb-2 font-serif text-2xl"
          >
            Bug Submitted
          </p>
          <p>Thank you!</p>
        </div>
      </slot>

      <!-- Actions are rendered as btns at the bottom of modal -->
      <template #actions>
        <!-- Close without submitting -->
        <button
          class="mt-3 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-smoke hover:dark:bg-fog sm:col-start-1 sm:mt-0"
          @click="closeModal()"
        >
          Close
        </button>

        <!-- Submit Issue -->
        <button
          v-if="status === 'ready'"
          class="w-full justify-center rounded-md bg-blood px-3 py-2 text-sm font-semibold text-white shadow-sm ring-offset-2 hover:ring-2 hover:ring-blood focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2"
          for="report-issue-form"
          @click="submitIssue"
        >
          Submit
        </button>

        <!-- Pending UI -->
        <span v-if="status === 'pending'">Submitting...</span>
      </template>
    </Modal>
  </div>
</template>
