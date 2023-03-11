"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Duplex = void 0;
var _utils = require("../../_internal/utils.cjs");
var _readable = require("./readable.cjs");
var _writable = require("./writable.cjs");
const Duplex = class {
  constructor(readable = new _readable.Readable(), writable = new _writable.Writable()) {
    this.allowHalfOpen = true;
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = (0, _utils.mergeFns)(readable._destroy, writable._destroy);
  }
};
exports.Duplex = Duplex;
Object.assign(Duplex.prototype, _readable.Readable.prototype);
Object.assign(Duplex.prototype, _writable.Writable.prototype);