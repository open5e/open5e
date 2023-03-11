import { createServer as createServer$2 } from 'node:http';
import { createServer as createServer$1 } from 'node:https';
import { promisify } from 'node:util';
import { promises, existsSync, writeFileSync, chmodSync, readFileSync, constants, statSync } from 'node:fs';
import os, { networkInterfaces } from 'node:os';
import { g as gray, c as cyan, u as underline, b as bold } from '../shared/nuxi.a3b9dacd.mjs';
import { createServer } from 'node:net';
import require$$0 from 'http';
import require$$1 from 'https';
import { d as defu } from '../shared/nuxi.a685c563.mjs';
import childProcess from 'node:child_process';
import { join } from 'node:path';
import 'tty';

const unsafePorts = /* @__PURE__ */ new Set([
  1,
  7,
  9,
  11,
  13,
  15,
  17,
  19,
  20,
  21,
  22,
  23,
  25,
  37,
  42,
  43,
  53,
  69,
  77,
  79,
  87,
  95,
  101,
  102,
  103,
  104,
  109,
  110,
  111,
  113,
  115,
  117,
  119,
  123,
  135,
  137,
  139,
  143,
  161,
  179,
  389,
  427,
  465,
  512,
  513,
  514,
  515,
  526,
  530,
  531,
  532,
  540,
  548,
  554,
  556,
  563,
  587,
  601,
  636,
  989,
  990,
  993,
  995,
  1719,
  1720,
  1723,
  2049,
  3659,
  4045,
  5060,
  5061,
  6e3,
  6566,
  6665,
  6666,
  6667,
  6668,
  6669,
  6697,
  10080
]);
function isUnsafePort(port) {
  return unsafePorts.has(port);
}
function isSafePort(port) {
  return !isUnsafePort(port);
}

function log(...arguments_) {
  console.log("[get-port]", ...arguments_);
}
async function getPort(config = {}) {
  if (typeof config === "number" || typeof config === "string") {
    config = { port: Number.parseInt(config + "") || 0 };
  }
  const options = {
    name: "default",
    random: false,
    ports: [],
    portRange: [],
    alternativePortRange: config.port ? [] : [3e3, 3100],
    host: void 0,
    verbose: false,
    ...config,
    port: config.port || Number.parseInt(process.env.PORT || "") || 3e3
  };
  if (options.random) {
    return getRandomPort(options.host);
  }
  const portsToCheck = [
    options.port,
    ...options.ports,
    ...generateRange(...options.portRange)
  ].filter((port) => {
    if (!port) {
      return false;
    }
    if (!isSafePort(port)) {
      if (options.verbose) {
        log("Ignoring unsafe port:", port);
      }
      return false;
    }
    return true;
  });
  let availablePort = await findPort(
    portsToCheck,
    options.host,
    options.verbose,
    false
  );
  if (!availablePort) {
    availablePort = await findPort(
      generateRange(...options.alternativePortRange),
      options.host,
      options.verbose
    );
    if (options.verbose) {
      log(
        `Unable to find an available port (tried ${portsToCheck.join(", ") || "-"}). Using alternative port:`,
        availablePort
      );
    }
  }
  return availablePort;
}
async function getRandomPort(host) {
  const port = await checkPort(0, host);
  if (port === false) {
    throw new Error("Unable to obtain an available random port number!");
  }
  return port;
}
async function checkPort(port, host = process.env.HOST, _verbose) {
  if (!host) {
    host = getLocalHosts([void 0, "0.0.0.0"]);
  }
  if (!Array.isArray(host)) {
    return _checkPort(port, host);
  }
  for (const _host of host) {
    const _port = await _checkPort(port, _host);
    if (_port === false) {
      if (port < 1024 && _verbose) {
        log("Unable to listen to priviliged port:", `${_host}:${port}`);
      }
      return false;
    }
    if (port === 0 && _port !== 0) {
      port = _port;
    }
  }
  return port;
}
function generateRange(from, to) {
  if (to < from) {
    return [];
  }
  const r = [];
  for (let index = from; index < to; index++) {
    r.push(index);
  }
  return r;
}
function _checkPort(port, host) {
  return new Promise((resolve) => {
    const server = createServer();
    server.unref();
    server.on("error", (error) => {
      if (error.code === "EINVAL" || error.code === "EADDRNOTAVAIL") {
        resolve(port !== 0 && isSafePort(port) && port);
      } else {
        resolve(false);
      }
    });
    server.listen({ port, host }, () => {
      const { port: port2 } = server.address();
      server.close(() => {
        resolve(isSafePort(port2) && port2);
      });
    });
  });
}
function getLocalHosts(additional) {
  const hosts = new Set(additional);
  for (const _interface of Object.values(networkInterfaces())) {
    for (const config of _interface || []) {
      hosts.add(config.address);
    }
  }
  return [...hosts];
}
async function findPort(ports, host, _verbose = false, _random = true) {
  for (const port of ports) {
    const r = await checkPort(port, host, _verbose);
    if (r) {
      return r;
    }
  }
  if (_random) {
    const randomPort = await getRandomPort(host);
    if (_verbose) {
      log(
        `Unable to find an available port (tried ${ports.join(", ") || "-"}). Using random port:`,
        randomPort
      );
    }
    return randomPort;
  } else {
    return 0;
  }
}

var httpShutdownExports = {};
var httpShutdown = {
  get exports(){ return httpShutdownExports; },
  set exports(v){ httpShutdownExports = v; },
};

(function (module, exports) {
	var http = require$$0;
	var https = require$$1;

	/**
	 * Expose `addShutdown`.
	 */
	exports = module.exports = addShutdown;

	/**
	 * Adds shutdown functionaility to the `http.Server` object
	 * @param {http.Server} server The server to add shutdown functionaility to
	 */
	function addShutdown(server) {
	  var connections = {};
	  var isShuttingDown = false;
	  var connectionCounter = 0;

	  function destroy(socket, force) {
	    if (force || (socket._isIdle && isShuttingDown)) {
	      socket.destroy();
	      delete connections[socket._connectionId];
	    }
	  }
	  function onConnection(socket) {
	    var id = connectionCounter++;
	    socket._isIdle = true;
	    socket._connectionId = id;
	    connections[id] = socket;

	    socket.on('close', function() {
	      delete connections[id];
	    });
	  }
	  server.on('request', function(req, res) {
	    req.socket._isIdle = false;

	    res.on('finish', function() {
	      req.socket._isIdle = true;
	      destroy(req.socket);
	    });
	  });

	  server.on('connection', onConnection);
	  server.on('secureConnection', onConnection);

	  function shutdown(force, cb) {
	    isShuttingDown = true;
	    server.close(function(err) {
	      if (cb) {
	        process.nextTick(function() { cb(err); });
	      }
	    });

	    Object.keys(connections).forEach(function(key) {
	      destroy(connections[key], force);
	    });
	  }
	  server.shutdown = function(cb) {
	    shutdown(false, cb);
	  };

	  server.forceShutdown = function(cb) {
	    shutdown(true, cb);
	  };

	  return server;
	}
	/**
	 * Extends the {http.Server} object with shutdown functionaility.
	 * @return {http.Server} The decorated server object
	 */
	exports.extend = function() {
	  http.Server.prototype.withShutdown = function() {
	    return addShutdown(this);
	  };

	  https.Server.prototype.withShutdown = function() {
	    return addShutdown(this);
	  };
	};
} (httpShutdown, httpShutdownExports));

const addShutdown = httpShutdownExports;

const { platform, arch } = process;
const getWslDrivesMountPoint = (() => {
  const defaultMountPoint = "/mnt/";
  let mountPoint;
  return async function() {
    if (mountPoint) {
      return mountPoint;
    }
    const configFilePath = "/etc/wsl.conf";
    let isConfigFileExists = false;
    try {
      await promises.access(configFilePath, constants.F_OK);
      isConfigFileExists = true;
    } catch {
    }
    if (!isConfigFileExists) {
      return defaultMountPoint;
    }
    const configContent = await promises.readFile(configFilePath, {
      encoding: "utf8"
    });
    const configMountPoint = /(?<!#.*)root\s*=\s*(?<mountPoint>.*)/g.exec(
      configContent
    );
    if (!configMountPoint) {
      return defaultMountPoint;
    }
    mountPoint = configMountPoint.groups.mountPoint.trim();
    mountPoint = mountPoint.endsWith("/") ? mountPoint : `${mountPoint}/`;
    return mountPoint;
  };
})();
const pTryEach = async (array, mapper) => {
  let latestError;
  for (const item of array) {
    try {
      return await mapper(item);
    } catch (error) {
      latestError = error;
    }
  }
  throw latestError;
};
const baseOpen = async (options) => {
  options = {
    wait: false,
    background: false,
    newInstance: false,
    allowNonzeroExitCode: false,
    ...options
  };
  if (Array.isArray(options.app)) {
    return pTryEach(
      options.app,
      (singleApp) => baseOpen({
        ...options,
        app: singleApp
      })
    );
  }
  let { name: app, arguments: appArguments = [] } = options.app || {};
  appArguments = [...appArguments];
  if (Array.isArray(app)) {
    return pTryEach(
      app,
      (appName) => baseOpen({
        ...options,
        app: {
          name: appName,
          arguments: appArguments
        }
      })
    );
  }
  let command;
  const cliArguments = [];
  const childProcessOptions = {};
  if (platform === "darwin") {
    command = "open";
    if (options.wait) {
      cliArguments.push("--wait-apps");
    }
    if (options.background) {
      cliArguments.push("--background");
    }
    if (options.newInstance) {
      cliArguments.push("--new");
    }
    if (app) {
      cliArguments.push("-a", app);
    }
  } else if (platform === "win32" || isWsl() && !isDocker()) {
    const mountPoint = await getWslDrivesMountPoint();
    command = isWsl() ? `${mountPoint}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe` : `${process.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`;
    cliArguments.push(
      "-NoProfile",
      "-NonInteractive",
      "\u2013ExecutionPolicy",
      "Bypass",
      "-EncodedCommand"
    );
    if (!isWsl()) {
      childProcessOptions.windowsVerbatimArguments = true;
    }
    const encodedArguments = ["Start"];
    if (options.wait) {
      encodedArguments.push("-Wait");
    }
    if (app) {
      encodedArguments.push(`"\`"${app}\`""`, "-ArgumentList");
      if (options.target) {
        appArguments.unshift(options.target);
      }
    } else if (options.target) {
      encodedArguments.push(`"${options.target}"`);
    }
    if (appArguments.length > 0) {
      appArguments = appArguments.map((argument) => `"\`"${argument}\`""`);
      encodedArguments.push(appArguments.join(","));
    }
    options.target = Buffer.from(
      encodedArguments.join(" "),
      "utf16le"
    ).toString("base64");
  } else {
    if (app) {
      command = app;
    } else {
      command = "xdg-open";
      const useSystemXdgOpen = process.versions.electron || platform === "android";
      if (!useSystemXdgOpen) {
        command = join(os.tmpdir(), "xdg-open");
        if (!existsSync(command)) {
          try {
            writeFileSync(
              join(os.tmpdir(), "xdg-open"),
              await import('./xdg-open.mjs').then((r) => r.xdgOpenScript()),
              "utf8"
            );
            chmodSync(
              command,
              493
              /* rwx r-x r-x */
            );
          } catch {
            command = "xdg-open";
          }
        }
      }
    }
    if (appArguments.length > 0) {
      cliArguments.push(...appArguments);
    }
    if (!options.wait) {
      childProcessOptions.stdio = "ignore";
      childProcessOptions.detached = true;
    }
  }
  if (options.target) {
    cliArguments.push(options.target);
  }
  if (platform === "darwin" && appArguments.length > 0) {
    cliArguments.push("--args", ...appArguments);
  }
  const subprocess = childProcess.spawn(
    command,
    cliArguments,
    childProcessOptions
  );
  if (options.wait) {
    return new Promise((resolve, reject) => {
      subprocess.once("error", reject);
      subprocess.once("close", (exitCode) => {
        if (options.allowNonzeroExitCode && exitCode > 0) {
          reject(new Error(`Exited with code ${exitCode}`));
          return;
        }
        resolve(subprocess);
      });
    });
  }
  subprocess.unref();
  return subprocess;
};
const open = (target, options = {}) => {
  if (typeof target !== "string") {
    throw new TypeError("Expected a `target`");
  }
  return baseOpen({
    ...options,
    target
  });
};
const openApp = (name, options) => {
  if (typeof name !== "string") {
    throw new TypeError("Expected a `name`");
  }
  const { arguments: appArguments = [] } = options || {};
  if (appArguments !== void 0 && appArguments !== null && !Array.isArray(appArguments)) {
    throw new TypeError("Expected `appArguments` as Array type");
  }
  return baseOpen({
    ...options,
    app: {
      name,
      arguments: appArguments
    }
  });
};
function detectArchBinary(binary) {
  if (typeof binary === "string" || Array.isArray(binary)) {
    return binary;
  }
  const { [arch]: archBinary } = binary;
  if (!archBinary) {
    throw new Error(`${arch} is not supported`);
  }
  return archBinary;
}
function detectPlatformBinary({ [platform]: platformBinary }, { wsl }) {
  if (wsl && isWsl()) {
    return detectArchBinary(wsl);
  }
  if (!platformBinary) {
    throw new Error(`${platform} is not supported`);
  }
  return detectArchBinary(platformBinary);
}
const apps = {};
defineLazyProperty(
  apps,
  "chrome",
  () => detectPlatformBinary(
    {
      darwin: "google chrome",
      win32: "chrome",
      linux: ["google-chrome", "google-chrome-stable", "chromium"]
    },
    {
      wsl: {
        ia32: "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
        x64: [
          "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe",
          "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"
        ]
      }
    }
  )
);
defineLazyProperty(
  apps,
  "firefox",
  () => detectPlatformBinary(
    {
      darwin: "firefox",
      win32: "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
      linux: "firefox"
    },
    {
      wsl: "/mnt/c/Program Files/Mozilla Firefox/firefox.exe"
    }
  )
);
defineLazyProperty(
  apps,
  "edge",
  () => detectPlatformBinary(
    {
      darwin: "microsoft edge",
      win32: "msedge",
      linux: ["microsoft-edge", "microsoft-edge-dev"]
    },
    {
      wsl: "/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
    }
  )
);
open.apps = apps;
open.openApp = openApp;
function defineLazyProperty(object, propertyName, valueGetter) {
  const define = (value) => Object.defineProperty(object, propertyName, {
    value,
    enumerable: true,
    writable: true
  });
  Object.defineProperty(object, propertyName, {
    configurable: true,
    enumerable: true,
    get() {
      const result = valueGetter();
      define(result);
      return result;
    },
    set(value) {
      define(value);
    }
  });
  return object;
}
function _isWsl() {
  if (process.platform !== "linux") {
    return false;
  }
  if (os.release().toLowerCase().includes("microsoft")) {
    if (isDocker()) {
      return false;
    }
    return true;
  }
  try {
    return readFileSync("/proc/version", "utf8").toLowerCase().includes("microsoft") ? !isDocker() : false;
  } catch {
    return false;
  }
}
let isWSLCached;
function isWsl() {
  if (isWSLCached === void 0) {
    isWSLCached = _isWsl();
  }
  return isWSLCached;
}
function hasDockerEnvironment() {
  try {
    statSync("/.dockerenv");
    return true;
  } catch {
    return false;
  }
}
function hasDockerCGroup() {
  try {
    return readFileSync("/proc/self/cgroup", "utf8").includes("docker");
  } catch {
    return false;
  }
}
let isDockerCached;
function isDocker() {
  if (isDockerCached === void 0) {
    isDockerCached = hasDockerEnvironment() || hasDockerCGroup();
  }
  return isDockerCached;
}

async function listen(handle, options_ = {}) {
  options_ = defu(options_, {
    port: process.env.PORT || 3e3,
    hostname: process.env.HOST || "",
    showURL: true,
    baseURL: "/",
    open: false,
    clipboard: false,
    isTest: process.env.NODE_ENV === "test",
    isProd: process.env.NODE_ENV === "production",
    autoClose: true
  });
  if (options_.isTest) {
    options_.showURL = false;
  }
  if (options_.isProd || options_.isTest) {
    options_.open = false;
    options_.clipboard = false;
  }
  const port = await getPort({
    port: Number(options_.port),
    verbose: !options_.isTest,
    host: options_.hostname,
    ...typeof options_.port === "object" && options_.port
  });
  let server;
  let addr;
  const getURL = (host, baseURL) => {
    const anyV4 = addr?.addr === "0.0.0.0";
    const anyV6 = addr?.addr === "[::]";
    return `${addr.proto}://${host || options_.hostname || (anyV4 || anyV6 ? "localhost" : addr.addr)}:${addr.port}${baseURL || options_.baseURL}`;
  };
  let https = false;
  if (options_.https) {
    const { key, cert } = await resolveCert(
      { ...options_.https },
      options_.hostname
    );
    https = { key, cert };
    server = createServer$1({ key, cert }, handle);
    addShutdown(server);
    await promisify(server.listen.bind(server))(port, options_.hostname);
    const _addr = server.address();
    addr = { proto: "https", addr: formatAddress(_addr), port: _addr.port };
  } else {
    server = createServer$2(handle);
    addShutdown(server);
    await promisify(server.listen.bind(server))(port, options_.hostname);
    const _addr = server.address();
    addr = { proto: "http", addr: formatAddress(_addr), port: _addr.port };
  }
  let _closed = false;
  const close = () => {
    if (_closed) {
      return Promise.resolve();
    }
    _closed = true;
    return promisify(server.shutdown)();
  };
  if (options_.clipboard) {
    const clipboardy = await import('./index3.mjs').then((r) => r.default || r);
    await clipboardy.write(getURL()).catch(() => {
      options_.clipboard = false;
    });
  }
  const showURL = (options) => {
    const add = options_.clipboard ? gray("(copied to clipboard)") : "";
    const lines = [];
    const baseURL = options?.baseURL || options_.baseURL || "";
    const name = options?.name ? ` (${options.name})` : "";
    const anyV4 = addr?.addr === "0.0.0.0";
    const anyV6 = addr?.addr === "[::]";
    if (anyV4 || anyV6) {
      lines.push(
        `  > Local${name}:    ${formatURL(getURL("localhost", baseURL))} ${add}`
      );
      for (const addr2 of getNetworkInterfaces(anyV4)) {
        lines.push(`  > Network${name}:  ${formatURL(getURL(addr2, baseURL))}`);
      }
    } else {
      lines.push(
        `  > Listening${name}:    ${formatURL(
          getURL(void 0, baseURL)
        )} ${add}`
      );
    }
    console.log("\n" + lines.join("\n") + "\n");
  };
  if (options_.showURL) {
    showURL();
  }
  const _open = async () => {
    await open(getURL()).catch(() => {
    });
  };
  if (options_.open) {
    await _open();
  }
  if (options_.autoClose) {
    process.on("exit", () => close());
  }
  return {
    url: getURL(),
    https,
    server,
    open: _open,
    showURL,
    close
  };
}
async function resolveCert(options, host) {
  if (options.key && options.cert) {
    const isInline = (s = "") => s.startsWith("--");
    const r = (s) => isInline(s) ? s : promises.readFile(s, "utf8");
    return {
      key: await r(options.key),
      cert: await r(options.cert)
    };
  }
  const { generateCA, generateSSLCert } = await import('./cert.mjs');
  const ca = await generateCA();
  const cert = await generateSSLCert({
    caCert: ca.cert,
    caKey: ca.key,
    domains: options.domains || ["localhost", "127.0.0.1", "::1", host].filter(Boolean),
    validityDays: options.validityDays || 1
  });
  return cert;
}
function getNetworkInterfaces(v4Only = true) {
  const addrs = /* @__PURE__ */ new Set();
  for (const details of Object.values(networkInterfaces())) {
    if (details) {
      for (const d of details) {
        if (!d.internal && !(d.mac === "00:00:00:00:00:00") && !d.address.startsWith("fe80::") && !(v4Only && (d.family === "IPv6" || +d.family === 6))) {
          addrs.add(formatAddress(d));
        }
      }
    }
  }
  return [...addrs].sort();
}
function formatAddress(addr) {
  return addr.family === "IPv6" || addr.family === 6 ? `[${addr.address}]` : addr.address;
}
function formatURL(url) {
  return cyan(
    underline(decodeURI(url).replace(/:(\d+)\//g, `:${bold("$1")}/`))
  );
}

export { listen };
