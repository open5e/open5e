"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.File = void 0;
class File extends Blob {
  constructor(...args) {
    super(...args);
    this.size = 0;
    this.type = "";
    this.name = "";
    this.lastModified = 0;
    throw new Error("[unenv] buffer.File is not implemented");
  }
  arrayBuffer() {
    throw new Error("Not implemented");
  }
  slice() {
    throw new Error("Not implemented");
  }
  text() {
    throw new Error("Not implemented");
  }
  stream() {
    throw new Error("Not implemented");
  }
}
exports.File = File;