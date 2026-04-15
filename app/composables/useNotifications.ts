import { ref } from 'vue';

type Notification = {
  title: string;
  subtitle?: string;
  body: string | number;
  footer: string;
};

const notifications = ref<Notification[]>([]);

export const useNotifications = () => {
  const addNotif = (notif: Notification) => {
    notifications.value.push(notif);
  };

  const clear = () => {
    notifications.value = [];
  };

  const remove = (index: number) => {
    notifications.value.splice(index, 1);
  };

  return { clear, remove, notifications, addNotif };
};
