/* load theme preference before page and insert them into the head. This is to
 * avoid flicker on load. 1st check local storage, then check media preferences
 */

export function useThemeHead() {
  useHead({
    script: [
      {
        children: `
          if (localStorage.theme === "dark" || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        `,
      },
    ],
  });
}
