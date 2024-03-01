<script setup>
import { ref } from 'vue';
const isOpen = ref(false);
</script>

<template>
  <div>
    <button
      class="w-full bg-red-600 px-4 py-1 text-left align-middle hover:bg-red-400 dark:bg-red-700 dark:hover:bg-red-600"
      @click="isOpen = !isOpen"
    >
      <span>Report Issue</span>
      <icon
        name="heroicons:exclaimation-circle"
        class="ml-1 h-6 w-6 rounded-full"
      />
    </button>

    <modal-dialog v-show="isOpen" :show="isOpen" @close="isOpen = false">
      <slot>
        <fieldset>
          <legend
            class="mb-3 mt-0 border-b-4 border-red-400 pb-2 font-serif text-2xl"
          >
            Report an Issue
          </legend>
          <ul>
            <li class="mb-2">
              <label for="type" class="text-lg font-bold">
                What best describes your issue?
              </label>
              <select name="type" class="w-full p-2">
                <option value="" selected disabled>–</option>
                <option value="page">
                  Page is broken or doesn't load properly
                </option>
                <option value="data">Incorrect data or spelling mistake</option>
                <option value="visual">Something looks visually off</option>
                <option value="accessibility">
                  There is a problem with page accessibility
                </option>
                <option value="misc">Other</option>
              </select>
            </li>
            <li class="mb-2">
              <label for="description" class="text-lg font-bold">
                Can you describe the bug?
              </label>
              <legend class="text-sm italic">
                What happened? What did it look like? What page were you on when
                it happened?
              </legend>
              <textarea
                type="text"
                name="description"
                class="block w-full border"
              />
            </li>

            <li class="mb-2">
              <label for="reproduction" class="text-lg font-bold">
                Reproduction
              </label>
              <legend class="text-sm italic">
                Can you provide steps on how to reproduce the bug? The more
                detail the better. This will help us identify and fix the issue.
              </legend>
              <textarea
                type="text"
                name="reproduction"
                class="block h-16 w-full border"
              />
            </li>
          </ul>
        </fieldset>
      </slot>

      <!-- Actions are rendered as btns at the bottom of modal -->
      <template #actions>
        <!-- Close without submitting -->
        <button
          class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
          @click="isOpen = false"
        >
          Cancel
        </button>

        <!-- Submit Issue -->
        <button
          class="inline-flex w-full justify-center rounded-md bg-blood px-3 py-2 text-sm font-semibold text-white shadow-sm ring-offset-2 hover:ring-2 hover:ring-blood focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2"
          @click="isOpen = false"
        >
          Submit
        </button>
      </template>
    </modal-dialog>
  </div>
</template>
