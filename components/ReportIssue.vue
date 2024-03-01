<script setup>
import { ref } from 'vue';
const isOpen = ref(false);
</script>

<template>
  <div>
    <button
      class="w-full bg-red-600 px-4 py-1 text-left hover:bg-red-400 dark:bg-red-700 dark:hover:bg-red-600"
      @click="isOpen = !isOpen"
    >
      Report Issue
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
            <li>
              <label for="type">What best describes your issue?</label>
              <select name="type">
                <option value="data">
                  There is something wrong with the data
                </option>
                <option value="typo">There is a typo/spelling mistake</option>
                <option value="visual">Something looks weird</option>
                <option value="misc">It is something else</option>
              </select>
            </li>
            <li>
              <label for="description"> Can you describe the bug? </label>
              <legend>What page did you notice it on? What do you see?</legend>
              <input type="text" name="description" class="block w-full" />
            </li>

            <li>
              <label for="reproduction">Reproduction</label>
              <input type="text" name="reproduction" class="block" />
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
