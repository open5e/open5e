import { existsSync, promises } from 'node:fs';
import require$$0 from 'fs';
import require$$0$1 from 'path';
import require$$0$2 from 'os';
import { g as getAugmentedNamespace } from './nuxi.849bcf65.mjs';
import 'node:fs/promises';
import 'node:os';
import 'crypto';
import 'module';
import 'perf_hooks';
import 'vm';
import 'url';
import 'assert';
import 'process';
import 'v8';
import 'util';
import 'tty';
import { r as resolve } from './nuxi.ffb4843d.mjs';

var mainExports = {};
var main$1 = {
  get exports(){ return mainExports; },
  set exports(v){ mainExports = v; },
};

const name = "dotenv";
const version$1 = "16.0.3";
const description = "Loads environment variables from .env file";
const main = "lib/main.js";
const types = "lib/main.d.ts";
const exports = {
	".": {
		require: "./lib/main.js",
		types: "./lib/main.d.ts",
		"default": "./lib/main.js"
	},
	"./config": "./config.js",
	"./config.js": "./config.js",
	"./lib/env-options": "./lib/env-options.js",
	"./lib/env-options.js": "./lib/env-options.js",
	"./lib/cli-options": "./lib/cli-options.js",
	"./lib/cli-options.js": "./lib/cli-options.js",
	"./package.json": "./package.json"
};
const scripts = {
	"dts-check": "tsc --project tests/types/tsconfig.json",
	lint: "standard",
	"lint-readme": "standard-markdown",
	pretest: "npm run lint && npm run dts-check",
	test: "tap tests/*.js --100 -Rspec",
	prerelease: "npm test",
	release: "standard-version"
};
const repository = {
	type: "git",
	url: "git://github.com/motdotla/dotenv.git"
};
const keywords = [
	"dotenv",
	"env",
	".env",
	"environment",
	"variables",
	"config",
	"settings"
];
const readmeFilename = "README.md";
const license = "BSD-2-Clause";
const devDependencies = {
	"@types/node": "^17.0.9",
	decache: "^4.6.1",
	dtslint: "^3.7.0",
	sinon: "^12.0.1",
	standard: "^16.0.4",
	"standard-markdown": "^7.1.0",
	"standard-version": "^9.3.2",
	tap: "^15.1.6",
	tar: "^6.1.11",
	typescript: "^4.5.4"
};
const engines = {
	node: ">=12"
};
const _package = {
	name: name,
	version: version$1,
	description: description,
	main: main,
	types: types,
	exports: exports,
	scripts: scripts,
	repository: repository,
	keywords: keywords,
	readmeFilename: readmeFilename,
	license: license,
	devDependencies: devDependencies,
	engines: engines
};

const _package$1 = {
  __proto__: null,
  default: _package,
  description: description,
  devDependencies: devDependencies,
  engines: engines,
  exports: exports,
  keywords: keywords,
  license: license,
  main: main,
  name: name,
  readmeFilename: readmeFilename,
  repository: repository,
  scripts: scripts,
  types: types,
  version: version$1
};

const require$$3 = /*@__PURE__*/getAugmentedNamespace(_package$1);

const fs = require$$0;
const path = require$$0$1;
const os = require$$0$2;
const packageJson = require$$3;

const version = packageJson.version;

const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;

// Parser src into an Object
function parse (src) {
  const obj = {};

  // Convert buffer to string
  let lines = src.toString();

  // Convert line breaks to same format
  lines = lines.replace(/\r\n?/mg, '\n');

  let match;
  while ((match = LINE.exec(lines)) != null) {
    const key = match[1];

    // Default undefined or null to empty string
    let value = (match[2] || '');

    // Remove whitespace
    value = value.trim();

    // Check if double quoted
    const maybeQuote = value[0];

    // Remove surrounding quotes
    value = value.replace(/^(['"`])([\s\S]*)\1$/mg, '$2');

    // Expand newlines if double quoted
    if (maybeQuote === '"') {
      value = value.replace(/\\n/g, '\n');
      value = value.replace(/\\r/g, '\r');
    }

    // Add to object
    obj[key] = value;
  }

  return obj
}

function _log (message) {
  console.log(`[dotenv@${version}][DEBUG] ${message}`);
}

function _resolveHome (envPath) {
  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath
}

// Populates process.env from .env file
function config (options) {
  let dotenvPath = path.resolve(process.cwd(), '.env');
  let encoding = 'utf8';
  const debug = Boolean(options && options.debug);
  const override = Boolean(options && options.override);

  if (options) {
    if (options.path != null) {
      dotenvPath = _resolveHome(options.path);
    }
    if (options.encoding != null) {
      encoding = options.encoding;
    }
  }

  try {
    // Specifying an encoding returns a string instead of a buffer
    const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }));

    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key];
      } else {
        if (override === true) {
          process.env[key] = parsed[key];
        }

        if (debug) {
          if (override === true) {
            _log(`"${key}" is already defined in \`process.env\` and WAS overwritten`);
          } else {
            _log(`"${key}" is already defined in \`process.env\` and was NOT overwritten`);
          }
        }
      }
    });

    return { parsed }
  } catch (e) {
    if (debug) {
      _log(`Failed to load ${dotenvPath} ${e.message}`);
    }

    return { error: e }
  }
}

const DotenvModule = {
  config,
  parse
};

mainExports.config = DotenvModule.config;
var parse_1 = mainExports.parse = DotenvModule.parse;
main$1.exports = DotenvModule;

async function setupDotenv(options) {
  const targetEnvironment = options.env ?? process.env;
  const environment = await loadDotenv({
    cwd: options.cwd,
    fileName: options.fileName ?? ".env",
    env: targetEnvironment,
    interpolate: options.interpolate ?? true
  });
  for (const key in environment) {
    if (!key.startsWith("_") && targetEnvironment[key] === void 0) {
      targetEnvironment[key] = environment[key];
    }
  }
  return environment;
}
async function loadDotenv(options) {
  const environment = /* @__PURE__ */ Object.create(null);
  const dotenvFile = resolve(options.cwd, options.fileName);
  if (existsSync(dotenvFile)) {
    const parsed = parse_1(await promises.readFile(dotenvFile, "utf8"));
    Object.assign(environment, parsed);
  }
  if (!options.env._applied) {
    Object.assign(environment, options.env);
    environment._applied = true;
  }
  if (options.interpolate) {
    interpolate(environment);
  }
  return environment;
}
function interpolate(target, source = {}, parse = (v) => v) {
  function getValue(key) {
    return source[key] !== void 0 ? source[key] : target[key];
  }
  function interpolate2(value, parents = []) {
    if (typeof value !== "string") {
      return value;
    }
    const matches = value.match(/(.?\${?(?:[\w:]+)?}?)/g) || [];
    return parse(
      // eslint-disable-next-line unicorn/no-array-reduce
      matches.reduce((newValue, match) => {
        const parts = /(.?)\${?([\w:]+)?}?/g.exec(match);
        const prefix = parts[1];
        let value2, replacePart;
        if (prefix === "\\") {
          replacePart = parts[0];
          value2 = replacePart.replace("\\$", "$");
        } else {
          const key = parts[2];
          replacePart = parts[0].slice(prefix.length);
          if (parents.includes(key)) {
            console.warn(
              `Please avoid recursive environment variables ( loop: ${parents.join(
                " > "
              )} > ${key} )`
            );
            return "";
          }
          value2 = getValue(key);
          value2 = interpolate2(value2, [...parents, key]);
        }
        return value2 !== void 0 ? newValue.replace(replacePart, value2) : newValue;
      }, value)
    );
  }
  for (const key in target) {
    target[key] = interpolate2(getValue(key));
  }
}

export { setupDotenv as s };
