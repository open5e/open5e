import "#internal/nitro/virtual/polyfill";
import functions from "firebase-functions";
import { toNodeListener } from "h3";
import { nitroApp } from "../app.mjs";
export const server = functions.https.onRequest(toNodeListener(nitroApp.h3App));
