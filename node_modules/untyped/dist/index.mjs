import { i as isObject, g as getType, a as getValue, s as setValue, j as joinPath, n as nonEmpty, u as unique, e as escapeKey, b as normalizeTypes } from './shared/untyped.939af307.mjs';
export { d as defineUntypedSchema } from './shared/untyped.939af307.mjs';
import 'scule';

async function resolveSchema(obj, defaults) {
  const schema = await _resolveSchema(obj, "", {
    root: obj,
    defaults,
    resolveCache: {}
  });
  return schema;
}
async function _resolveSchema(input, id, ctx) {
  if (id in ctx.resolveCache) {
    return ctx.resolveCache[id];
  }
  const schemaId = "#" + id.replace(/\./g, "/");
  if (!isObject(input)) {
    const schema2 = {
      type: getType(input),
      id: schemaId,
      default: Array.isArray(input) ? [...input] : input
    };
    normalizeSchema(schema2);
    ctx.resolveCache[id] = schema2;
    if (ctx.defaults && getValue(ctx.defaults, id) === void 0) {
      setValue(ctx.defaults, id, schema2.default);
    }
    return schema2;
  }
  const node = { ...input };
  const schema = ctx.resolveCache[id] = {
    ...node.$schema,
    id: schemaId
  };
  for (const key in node) {
    if (key === "$resolve" || key === "$schema" || key === "$default") {
      continue;
    }
    schema.properties = schema.properties || {};
    if (!schema.properties[key]) {
      const child = schema.properties[key] = await _resolveSchema(
        node[key],
        joinPath(id, key),
        ctx
      );
      if (Array.isArray(child.tags) && child.tags.includes("@required")) {
        schema.required = schema.required || [];
        if (!schema.required.includes(key)) {
          schema.required.push(key);
        }
      }
    }
  }
  if (ctx.defaults) {
    schema.default = getValue(ctx.defaults, id);
  }
  if (schema.default === void 0 && "$default" in node) {
    schema.default = node.$default;
  }
  if (typeof node.$resolve === "function") {
    schema.default = await node.$resolve(schema.default, async (key) => {
      return (await _resolveSchema(getValue(ctx.root, key), key, ctx)).default;
    });
  }
  if (ctx.defaults) {
    setValue(ctx.defaults, id, schema.default);
  }
  if (!schema.type) {
    schema.type = getType(schema.default) || (schema.properties ? "object" : "any");
  }
  normalizeSchema(schema);
  if (ctx.defaults && getValue(ctx.defaults, id) === void 0) {
    setValue(ctx.defaults, id, schema.default);
  }
  return schema;
}
async function applyDefaults(ref, input) {
  await resolveSchema(ref, input);
  return input;
}
function normalizeSchema(schema) {
  if (schema.type === "array" && !("items" in schema)) {
    schema.items = {
      type: nonEmpty(unique(schema.default.map((i) => getType(i))))
    };
    if (schema.items.type) {
      if (schema.items.type.length === 0) {
        schema.items.type = "any";
      } else if (schema.items.type.length === 1) {
        schema.items.type = schema.items.type[0];
      }
    }
  }
  if (schema.default === void 0 && ("properties" in schema || schema.type === "object" || schema.type === "any")) {
    const propsWithDefaults = Object.entries(schema.properties || {}).filter(([, prop]) => "default" in prop).map(([key, value]) => [key, value.default]);
    schema.default = Object.fromEntries(propsWithDefaults);
  }
}

const GenerateTypesDefaults = {
  interfaceName: "Untyped",
  addExport: true,
  addDefaults: true,
  allowExtraKeys: void 0,
  partial: false,
  indentation: 0
};
const TYPE_MAP = {
  array: "any[]",
  bigint: "bigint",
  boolean: "boolean",
  number: "number",
  object: "",
  any: "any",
  string: "string",
  symbol: "Symbol",
  function: "Function"
};
const SCHEMA_KEYS = /* @__PURE__ */ new Set([
  "items",
  "default",
  "resolve",
  "properties",
  "title",
  "description",
  "$schema",
  "type",
  "tsType",
  "markdownType",
  "tags",
  "args",
  "id",
  "returns"
]);
const DECLARATION_RE = /typeof import\(["'](?<source>[^)]+)["']\)(\.(?<type>\w+)|\[["'](?<type1>\w+)["']])/g;
function extractTypeImports(declarations) {
  const typeImports = {};
  const aliases = /* @__PURE__ */ new Set();
  const imports = [];
  for (const match of declarations.matchAll(DECLARATION_RE)) {
    const { source, type1, type = type1 } = match.groups || {};
    typeImports[source] = typeImports[source] || /* @__PURE__ */ new Set();
    typeImports[source].add(type);
  }
  for (const source in typeImports) {
    const sourceImports = [];
    for (const type of typeImports[source]) {
      let count = 0;
      let alias = type;
      while (aliases.has(alias)) {
        alias = `${type}${count++}`;
      }
      aliases.add(alias);
      sourceImports.push(alias === type ? type : `${type} as ${alias}`);
      declarations = declarations.replace(
        new RegExp(
          `typeof import\\(['"]${source}['"]\\)(\\.${type}|\\[['"]${type}['"]\\])`,
          "g"
        ),
        alias
      );
    }
    imports.push(
      `import type { ${sourceImports.join(", ")} } from '${source}'`
    );
  }
  return [...imports, declarations].join("\n");
}
function generateTypes(schema, opts = {}) {
  opts = { ...GenerateTypesDefaults, ...opts };
  const baseIden = " ".repeat(opts.indentation);
  const interfaceCode = `interface ${opts.interfaceName} {
` + _genTypes(schema, baseIden + " ", opts).map((l) => l.trim().length > 0 ? l : "").join("\n") + `
${baseIden}}`;
  if (!opts.addExport) {
    return baseIden + interfaceCode;
  }
  return extractTypeImports(baseIden + `export ${interfaceCode}`);
}
function _genTypes(schema, spaces, opts) {
  const buff = [];
  for (const key in schema.properties) {
    const val = schema.properties[key];
    buff.push(...generateJSDoc(val, opts));
    if (val.tsType) {
      buff.push(
        `${escapeKey(key)}${isRequired(schema, key, opts) ? "" : "?"}: ${val.tsType},
`
      );
    } else if (val.type === "object") {
      buff.push(
        `${escapeKey(key)}${isRequired(schema, key, opts) ? "" : "?"}: {`,
        ..._genTypes(val, spaces, opts),
        "},\n"
      );
    } else {
      let type;
      if (val.type === "array") {
        type = `Array<${getTsType(val.items, opts)}>`;
      } else if (val.type === "function") {
        type = genFunctionType(val, opts);
      } else {
        type = getTsType(val, opts);
      }
      buff.push(
        `${escapeKey(key)}${isRequired(schema, key, opts) ? "" : "?"}: ${type},
`
      );
    }
  }
  if (buff.length > 0) {
    const last = buff.pop() || "";
    buff.push(last.slice(0, Math.max(0, last.length - 1)));
  }
  if (opts.allowExtraKeys === true || buff.length === 0 && opts.allowExtraKeys !== false) {
    buff.push("[key: string]: any");
  }
  return buff.flatMap((l) => l.split("\n")).map((l) => spaces + l);
}
function getTsType(type, opts) {
  if (Array.isArray(type)) {
    return [normalizeTypes(type.map((t) => getTsType(t, opts)))].flat().join("|") || "any";
  }
  if (!type) {
    return "any";
  }
  if (type.tsType) {
    return type.tsType;
  }
  if (!type.type) {
    return "any";
  }
  if (Array.isArray(type.type)) {
    return type.type.map((t) => TYPE_MAP[t]).join("|");
  }
  if (type.type === "array") {
    return `Array<${getTsType(type.items, opts)}>`;
  }
  if (type.type === "object") {
    return `{
` + _genTypes(type, " ", opts).join("\n") + `
}`;
  }
  return TYPE_MAP[type.type] || type.type;
}
function genFunctionType(schema, opts) {
  return `(${genFunctionArgs(schema.args, opts)}) => ${getTsType(
    schema.returns,
    opts
  )}`;
}
function genFunctionArgs(args, opts) {
  return args?.map((arg) => {
    let argStr = arg.name;
    if (arg.optional || arg.default) {
      argStr += "?";
    }
    if (arg.type || arg.tsType) {
      argStr += `: ${getTsType(arg, opts)}`;
    }
    return argStr;
  }).join(", ") || "";
}
function generateJSDoc(schema, opts) {
  let buff = [];
  if (schema.title) {
    buff.push(schema.title, "");
  }
  if (schema.description) {
    buff.push(schema.description, "");
  } else if (opts.defaultDescrption && schema.type !== "object") {
    buff.push(opts.defaultDescrption, "");
  }
  if (opts.addDefaults && schema.type !== "object" && schema.type !== "any" && !(Array.isArray(schema.default) && schema.default.length === 0)) {
    const stringified = JSON.stringify(schema.default);
    if (stringified) {
      buff.push(`@default ${stringified.replace(/\*\//g, "*\\/")}`);
    }
  }
  for (const key in schema) {
    if (!SCHEMA_KEYS.has(key)) {
      buff.push("", `@${key} ${schema[key]}`);
    }
  }
  if (Array.isArray(schema.tags)) {
    for (const tag of schema.tags) {
      if (tag !== "@untyped") {
        buff.push("", tag);
      }
    }
  }
  buff = buff.flatMap((i) => i.split("\n"));
  if (buff.length > 0) {
    return buff.length === 1 ? ["/** " + buff[0] + " */"] : ["/**", ...buff.map((i) => ` * ${i}`), "*/"];
  }
  return [];
}
function isRequired(schema, key, opts) {
  if (Array.isArray(schema.required) && schema.required.includes(key)) {
    return true;
  }
  return !opts.partial;
}

function generateMarkdown(schema) {
  return _generateMarkdown(schema, "", "").join("\n");
}
function _generateMarkdown(schema, title, level) {
  const lines = [];
  lines.push(`${level} ${title}`);
  if (schema.type === "object") {
    for (const key in schema.properties) {
      const val = schema.properties[key];
      lines.push("", ..._generateMarkdown(val, `\`${key}\``, level + "#"));
    }
    return lines;
  }
  lines.push(
    `- **Type**: \`${schema.markdownType || schema.tsType || schema.type}\``
  );
  if ("default" in schema) {
    lines.push(`- **Default**: \`${JSON.stringify(schema.default)}\``);
  }
  lines.push("");
  if (schema.title) {
    lines.push("> " + schema.title, "");
  }
  if (schema.type === "function") {
    lines.push("```ts", genFunctionType(schema, {}), "```", "");
  }
  if (schema.description) {
    lines.push("", schema.description, "");
  }
  return lines;
}

export { applyDefaults, generateMarkdown, generateTypes, resolveSchema };
