<script>
/**
 * ModalDialog.vue - A modal dialog component that displays a centered overlay.
 * Contents and Action buttons are created by passing slots to component.
 *
 * -= PROPS (INPUTS) =-
 * @prop {Boolean} open - controls whether the modal is open or closed
 *
 * -= SLOTS =-
 * @slot default - modal main content, injected inside the modal body
 * @slot actions - A named slot for placing action buttons in the modal footer
 *
 * -= EMITS (OUTPUTS) =-
 * @emits {Boolean} close - Emits `true` when the modal is closed, so the
 *   parent component can update the modal state.
 * @emits {Boolean} update:open - Emits `false` to update the `open` prop to
 *   `false` when the modal is closed.
 *
 * -= DEPENDENCIES =-
 * @component Dialog – from @headlessui/vue: creates a modal menu
 * @component DialogPanel – from @headlessui/vue: creates the panel of modal
 * @component TransitionChild – from @headlessui/vue: creates transition effects
 * @component TransitionRoot – from @headlessui/vue: controls the root transition
 *
 */
</script>

<template>
  <TransitionRoot
    as="template"
    :show="open"
    @key.escape="closeModal"
  >
    <Dialog
      as="div"
      class="relative z-100"
      @close="closeModal"
    >
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
          class="fixed inset-0 bg-gray-500/75 transition-opacity"
          @close="closeModal()"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-100 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
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
              class="relative overflow-hidden rounded-lg bg-white px-4 pb-4 pt-2 text-left shadow-xl transition-all dark:bg-darkness dark:text-white sm:my-4 sm:w-full sm:max-w-lg sm:p-6"
            >
              <!-- Use unnamed slot to inject modal content -->
              <slot />

              <!-- Use 'actions' slot for modal buttons/etc -->
              <div
                class="mt-5 grid grid-cols-1 gap-2 sm:mt-6 sm:grid-flow-row-dense sm:grid-cols-2"
                :show="slots.actions"
              >
                <slot name="actions" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { useSlots } from 'vue';
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

const slots = useSlots();
defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['close', 'update:open']);

const closeModal = () => {
  emits('close', true);
  emits('update:open', false);
};
</script>
