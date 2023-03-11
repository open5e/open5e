import { createError as _createError } from "h3";
import { toRef } from "vue";
import { useNuxtApp } from "../nuxt.mjs";
export const useError = () => toRef(useNuxtApp().payload, "error");
export const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
export const clearError = async (options = {}) => {
  const nuxtApp = useNuxtApp();
  const error = useError();
  nuxtApp.callHook("app:error:cleared", options);
  if (options.redirect) {
    await nuxtApp.$router.replace(options.redirect);
  }
  error.value = null;
};
export const isNuxtError = (err) => !!(err && typeof err === "object" && "__nuxt_error" in err);
export const createError = (err) => {
  const _err = _createError(err);
  _err.__nuxt_error = true;
  return _err;
};
