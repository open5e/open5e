"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.once = exports.default = exports.EventEmitter = void 0;
var _events = require("./_events.cjs");
const EventEmitter = _events.EventEmitter;
exports.EventEmitter = EventEmitter;
const once = _events.once;
exports.once = once;
var _default = {
  EventEmitter,
  once
};
module.exports = _default;