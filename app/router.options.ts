export default {
  prefetchLinks: false,
  scrollBehavior(to, from, savedPosition) {
    console.log('scrollBehavior', to, from, savedPosition);
    return { top: 0 };
  },
};
