import { notImplemented } from "../../_internal/utils.mjs";
import * as socket from "./socket.mjs";
export * from "./socket.mjs";
export const createServer = notImplemented(
  "net.createServer"
);
export const connect = notImplemented("net.connect");
export const createConnection = notImplemented(
  "net.createConnection"
);
export default {
  ...socket,
  createServer,
  connect,
  createConnection
};
