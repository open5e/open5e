'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const nodeCrypto = require('node:crypto');

const subtle = nodeCrypto.webcrypto?.subtle || {};
const randomUUID = () => {
  return nodeCrypto.randomUUID();
};
const getRandomValues = (array) => {
  return nodeCrypto.webcrypto.getRandomValues(array);
};
const _crypto = {
  randomUUID,
  getRandomValues,
  subtle
};

exports.default = _crypto;
exports.getRandomValues = getRandomValues;
exports.randomUUID = randomUUID;
exports.subtle = subtle;
