"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Blob = void 0;
Object.defineProperty(exports, "Buffer", {
  enumerable: true,
  get: function () {
    return _buffer.Buffer;
  }
});
Object.defineProperty(exports, "File", {
  enumerable: true,
  get: function () {
    return _file.File;
  }
});
Object.defineProperty(exports, "INSPECT_MAX_BYTES", {
  enumerable: true,
  get: function () {
    return _buffer.INSPECT_MAX_BYTES;
  }
});
Object.defineProperty(exports, "SlowBuffer", {
  enumerable: true,
  get: function () {
    return _buffer.SlowBuffer;
  }
});
exports.isUtf8 = exports.isAscii = exports.default = exports.constants = exports.btoa = exports.atob = void 0;
Object.defineProperty(exports, "kMaxLength", {
  enumerable: true,
  get: function () {
    return _buffer.kMaxLength;
  }
});
exports.transcode = exports.resolveObjectURL = exports.kStringMaxLength = void 0;
var _utils = require("../../_internal/utils.cjs");
var _buffer = require("./_buffer.cjs");
var _file = require("./_file.cjs");
const Blob = globalThis.Blob;
exports.Blob = Blob;
const resolveObjectURL = (0, _utils.notImplemented)("buffer.resolveObjectURL");
exports.resolveObjectURL = resolveObjectURL;
const transcode = (0, _utils.notImplemented)("buffer.transcode");
exports.transcode = transcode;
const isUtf8 = (0, _utils.notImplemented)("buffer.isUtf8");
exports.isUtf8 = isUtf8;
const isAscii = (0, _utils.notImplemented)("buffer.isAscii");
exports.isAscii = isAscii;
const btoa = global.btoa;
exports.btoa = btoa;
const atob = globalThis.atob;
exports.atob = atob;
const kStringMaxLength = 0;
exports.kStringMaxLength = kStringMaxLength;
const constants = {
  MAX_LENGTH: _buffer.kMaxLength,
  MAX_STRING_LENGTH: kStringMaxLength
};
exports.constants = constants;
var _default = {
  Buffer: _buffer.Buffer,
  SlowBuffer: _buffer.SlowBuffer,
  kMaxLength: _buffer.kMaxLength,
  INSPECT_MAX_BYTES: _buffer.INSPECT_MAX_BYTES,
  Blob,
  resolveObjectURL,
  transcode,
  btoa,
  atob,
  kStringMaxLength,
  constants,
  isUtf8,
  isAscii,
  File: _file.File
};
module.exports = _default;