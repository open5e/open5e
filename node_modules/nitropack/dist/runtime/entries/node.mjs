import "#internal/nitro/virtual/polyfill";
import { toNodeListener } from "h3";
import { nitroApp } from "../app.mjs";
export const listener = toNodeListener(nitroApp.h3App);
export const handler = listener;
if (process.env.DEBUG) {
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection]", err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException]", err)
  );
} else {
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
