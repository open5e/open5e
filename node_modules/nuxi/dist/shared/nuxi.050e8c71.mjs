import { i as importModule } from './nuxi.285f10ac.mjs';

const loadKit = async (rootDir) => {
  try {
    return await importModule("@nuxt/kit", rootDir);
  } catch (e) {
    if (e.toString().includes("Cannot find module '@nuxt/kit'")) {
      throw new Error("nuxi requires `@nuxt/kit` to be installed in your project. Try installing `nuxt3` or `@nuxt/bridge` first.");
    }
    throw e;
  }
};

export { loadKit as l };
