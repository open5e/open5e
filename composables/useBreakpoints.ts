import { ref, computed, onMounted, onUnmounted } from 'vue';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

export function useBreakpoints() {
  const width = ref(window.innerWidth);

  const updateWidth = () => {
    width.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
  });

  const currentSize = computed(() => {
    if (width.value >= breakpoints.xxl) return 'xxl';
    if (width.value >= breakpoints.xl) return 'xl';
    if (width.value >= breakpoints.lg) return 'lg';
    if (width.value >= breakpoints.md) return 'md';
    if (width.value >= breakpoints.sm) return 'sm';
    return 'xs';
  });

  return {
    isSm: computed(() => currentSize.value === 'sm'),
    isMd: computed(() => currentSize.value === 'md'),
    isLg: computed(() => currentSize.value === 'lg'),
    isXl: computed(() => currentSize.value === 'xl'),
    isXXl: computed(() => currentSize.value === 'xxl'),
    currentSize,
  };
}
