"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  TextDecoder: true,
  TextEncoder: true,
  deprecate: true,
  _errnoException: true,
  _exceptionWithHostPort: true,
  _extend: true,
  callbackify: true,
  getSystemErrorMap: true,
  getSystemErrorName: true,
  toUSVString: true,
  stripVTControlCharacters: true,
  transferableAbortController: true,
  transferableAbortSignal: true,
  parseArgs: true,
  inherits: true,
  promisify: true
};
exports.getSystemErrorName = exports.getSystemErrorMap = exports.deprecate = exports.default = exports.callbackify = exports._extend = exports._exceptionWithHostPort = exports._errnoException = exports.TextEncoder = exports.TextDecoder = void 0;
Object.defineProperty(exports, "inherits", {
  enumerable: true,
  get: function () {
    return _inherits.default;
  }
});
exports.parseArgs = void 0;
Object.defineProperty(exports, "promisify", {
  enumerable: true,
  get: function () {
    return _promisify.promisify;
  }
});
exports.transferableAbortSignal = exports.transferableAbortController = exports.toUSVString = exports.stripVTControlCharacters = void 0;
var _utils = require("../../_internal/utils.cjs");
var _inherits = _interopRequireDefault(require("../../npm/inherits.cjs"));
var legacyTypes = _interopRequireWildcard(require("./_legacy-types.cjs"));
Object.keys(legacyTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === legacyTypes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return legacyTypes[key];
    }
  });
});
var logUtils = _interopRequireWildcard(require("./_log.cjs"));
Object.keys(logUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === logUtils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return logUtils[key];
    }
  });
});
var _types = _interopRequireDefault(require("./types/index.cjs"));
var _promisify = require("./_promisify.cjs");
var mime = _interopRequireWildcard(require("./_mime.cjs"));
Object.keys(mime).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === mime[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return mime[key];
    }
  });
});
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const TextDecoder = globalThis.TextDecoder;
exports.TextDecoder = TextDecoder;
const TextEncoder = globalThis.TextEncoder;
exports.TextEncoder = TextEncoder;
const deprecate = fn => fn;
exports.deprecate = deprecate;
const _errnoException = (0, _utils.notImplemented)("util._errnoException");
exports._errnoException = _errnoException;
const _exceptionWithHostPort = (0, _utils.notImplemented)("util._exceptionWithHostPort");
exports._exceptionWithHostPort = _exceptionWithHostPort;
const _extend = (0, _utils.notImplemented)("util._extend");
exports._extend = _extend;
const callbackify = (0, _utils.notImplemented)("util.callbackify");
exports.callbackify = callbackify;
const getSystemErrorMap = (0, _utils.notImplemented)("util.getSystemErrorMap");
exports.getSystemErrorMap = getSystemErrorMap;
const getSystemErrorName = (0, _utils.notImplemented)("util.getSystemErrorName");
exports.getSystemErrorName = getSystemErrorName;
const toUSVString = (0, _utils.notImplemented)("util.toUSVString");
exports.toUSVString = toUSVString;
const stripVTControlCharacters = (0, _utils.notImplemented)("util.stripVTControlCharacters");
exports.stripVTControlCharacters = stripVTControlCharacters;
const transferableAbortController = (0, _utils.notImplemented)("util.transferableAbortController");
exports.transferableAbortController = transferableAbortController;
const transferableAbortSignal = (0, _utils.notImplemented)("util.transferableAbortSignal");
exports.transferableAbortSignal = transferableAbortSignal;
const parseArgs = (0, _utils.notImplemented)("util.parseArgs");
exports.parseArgs = parseArgs;
var _default = {
  _errnoException,
  _exceptionWithHostPort,
  _extend,
  callbackify,
  deprecate,
  getSystemErrorMap,
  getSystemErrorName,
  inherits: _inherits.default,
  promisify: _promisify.promisify,
  stripVTControlCharacters,
  toUSVString,
  TextDecoder,
  TextEncoder,
  types: _types.default,
  transferableAbortController,
  transferableAbortSignal,
  parseArgs,
  ...mime,
  ...logUtils,
  ...legacyTypes
};
module.exports = _default;