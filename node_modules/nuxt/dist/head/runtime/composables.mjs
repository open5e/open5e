import { useSeoMeta as _useSeoMeta } from "@vueuse/head";
import { useNuxtApp } from "#app/nuxt";
export function useHead(input, options) {
  return useNuxtApp()._useHead(input, options);
}
export const useSeoMeta = (meta) => {
  return _useSeoMeta(meta);
};
export const useServerSeoMeta = (meta) => {
  if (process.server) {
    return _useSeoMeta(meta);
  }
};
