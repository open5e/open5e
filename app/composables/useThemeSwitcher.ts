import { onMounted, ref } from 'vue';

export type Theme = 'light' | 'dark';

const theme = ref<Theme | ''>('');

export function useThemeSwitcher() {
  onMounted(() => (theme.value = getTheme()));

  function getFallbackTheme(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function getTheme(): Theme {
    if (!import.meta.client) return getFallbackTheme();
    return (localStorage.getItem('theme') || getFallbackTheme()) as Theme;
  }

  function toggleTheme() {
    setTheme(getTheme() === 'light' ? 'dark' : 'light');
  }

  function setTheme(themeToSet: Theme) {
    const body = document.documentElement;
    body.classList.add(themeToSet);
    body.classList.remove(themeToSet === 'light' ? 'dark' : 'light');
    if (import.meta.client) localStorage.setItem('theme', themeToSet);
    theme.value = themeToSet;
  }

  return {
    theme,
    getTheme,
    setTheme,
    toggleTheme,
  };
}
