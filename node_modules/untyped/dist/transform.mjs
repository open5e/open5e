import * as babel from '@babel/standalone/babel.min.js';
import babelPluginUntyped from './babel.mjs';
import '@babel/types';
import './shared/untyped.939af307.mjs';
import 'scule';

const { transform: babelTransform } = babel.default || babel;
function transform(src) {
  const res = babelTransform(src, {
    filename: "src.ts",
    presets: ["typescript"],
    plugins: [babelPluginUntyped]
  });
  return res.code;
}

export { transform };
