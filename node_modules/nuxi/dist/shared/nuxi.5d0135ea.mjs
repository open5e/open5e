import require$$0 from 'assert';
import { g as gray, b as bold, a as green } from './nuxi.a3b9dacd.mjs';
import { a as tryRequireModule } from './nuxi.285f10ac.mjs';

const version = "3.2.3";
const engines = {
	node: "^14.18.0 || ^16.10.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
};

var assert = require$$0;

var clear = function clear(opts) {
    if (typeof (opts) === 'boolean') {
        opts = {
            fullClear: opts
        };
    }

    opts = opts || {};
    assert(typeof (opts) === 'object', 'opts must be an object');

    opts.fullClear = opts.hasOwnProperty('fullClear') ?
        opts.fullClear : true;

    assert(typeof (opts.fullClear) === 'boolean',
        'opts.fullClear must be a boolean');

    if (opts.fullClear === true) {
        process.stdout.write('\x1b[2J');
    }

    process.stdout.write('\x1b[0f');
};

function showBanner(_clear) {
  if (_clear) {
    clear();
  }
  console.log(gray(`Nuxi ${bold(version)}`));
}
function showVersions(cwd) {
  const getPkgVersion = (pkg) => {
    return tryRequireModule(`${pkg}/package.json`, cwd)?.version || "";
  };
  const nuxtVersion = getPkgVersion("nuxt") || getPkgVersion("nuxt-edge");
  const nitroVersion = getPkgVersion("nitropack");
  console.log(gray(
    green(`Nuxt ${bold(nuxtVersion)}`) + (nitroVersion ? ` with Nitro ${bold(nitroVersion)}` : "")
  ));
}

export { showVersions as a, engines as e, showBanner as s };
