<script>
/**
 * PageNotifications.vue - A UI wrapper for the `notifications` singleton
 * returned by the useNotifications composable. Displays notifications in the
 * lower right corner of the window
 *
 * -= DEPENDENCIES =-
 * - @composable useNotifications: manages notification state and actions.
 * - @composable useRoute: detect route changes (& clears notifs)
 *
 */
</script>

<template>
  <div class="fixed bottom-0 right-4 m-0 flex flex-col-reverse p-0">
    <!-- Only render 'clear all' btn when notifs array populated -->
    <div
      v-if="notifications.length"
      class="grid justify-end  dark:bg-darkness/80"
    >
      <button
        class="my-1 rounded bg-blood px-3 py-1 font-sans font-bold text-white hover:bg-red-400"
        @click="clear()"
      >
        CLEAR ALL &#x2715;
      </button>
    </div>

    <!-- Notification list -->
    <ul class="flex w-min flex-col items-end text-nowrap text-center">
      <li
        v-for="(notification, index) in notifications"
        :key="index"
        class="items-right my-2 w-min cursor-pointer border-y-2 border-blood bg-gray-100/95 px-3 py-2 duration-150  hover:border-fireball dark:bg-slate-900/95"
        @click="remove(index)"
      >
        <!-- SMALL VARIATION: use for all notifications except the latest -->
        <div 
          v-if="index < notifications.length - 1"
          class="w-min text-nowrap text-right text-xs capitalize"
        >
          <span class="font-serif">{{ notification.title }}</span>
          <span v-if="notification.subtitle" class="uppercase before:content-['_|_']">{{ notification.subtitle }}</span>
          <span class="text-base font-bold before:content-['_']">{{ notification.body }}</span>
        </div>
        <!-- EXPANDED VARIATION: use for the most recent notification -->
        <div v-else>
          <div class="text-base">
            <span class="my-0 py-0 font-serif font-light capitalize">
              {{ notification.title }}
            </span>
            <span
              v-if="notification.subtitle"
              class="text-sm uppercase text-basalt before:content-['_|_'] dark:text-smoke"
            >
              {{ notification.subtitle }}
            </span>
          </div>
          <div class="my-0 flex justify-center align-middle font-bold">
            <p class="m-0 text-5xl">
              {{ notification.body }}
            </p>
          </div>
          <div class="m-0 p-0 text-sm text-basalt dark:text-smoke">
            {{ notification.footer }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useNotifications } from '~/composables/useNotifications';

const { clear, notifications, remove } = useNotifications();

// clear notifications when route changes
const route = useRoute();
watch(
  () => route.path,
  () => clear(),
);
</script>
