import { ref } from 'vue';

const notifications = ref([]);

export const useNotifications = () => {
  const addNotif = (notif) => {
    notifications.value.push(notif);
  };

  const clear = () => {
    notifications.value = [];
  };

  const remove = (index) => {
    notifications.value.splice(index, 1);
  };

  return { clear, remove, notifications, addNotif };
};
