<template>
  <div class="absolute bottom-0 right-8 m-0 flex flex-col-reverse p-0">
    <div
      v-if="notifications.length"
      class="flex gap-2 bg-white/80 dark:bg-darkness/80"
    >
      <h2 class="my-0 text-lg">Notifications</h2>
      <button class="font-bold text-blood hover:text-red-400" @click="clear()">
        Clear
      </button>
    </div>
    <ul class="flex flex-col">
      <li
        v-for="(notification, index) in notifications"
        :key="index"
        class="mt-1 border-b-2 border-t-2 border-red-400 bg-gray-100 px-3 py-2 dark:bg-slate-900"
      >
        <p class="my-0 font-serif text-xs font-light">
          {{ notification.title }}
        </p>
        <div class="my-0 flex justify-between align-middle font-bold">
          <p class="m-0 text-4xl">{{ notification.body }}</p>
          <button
            class="float-right font-bold text-blood transition-all hover:text-red-400"
            @click="remove(index)"
          >
            &#x2715;
          </button>
        </div>
        <div class="m-0 p-0 text-sm">
          {{ notification.footer }}
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
  () => clear()
);
</script>
