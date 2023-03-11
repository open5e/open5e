"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecretsForBuild = exports.getSecrets = void 0;
var graph_request_js_1 = require("./graph_request.js");
var graph_token_js_1 = require("./graph_token.js");
var services = {
    gitHub: null,
    spotify: null,
    salesforce: null,
    stripe: null,
};
var camelize = function (text) {
    var safe = text.replace(/[-_\s.]+(.)?/g, function (_, sub) { return (sub ? sub.toUpperCase() : ''); });
    return safe.slice(0, 1).toLowerCase() + safe.slice(1);
};
// The services will be camelized versions of the OneGraph service enums
// unless overridden by the serviceNormalizeOverrides object
var serviceNormalizeOverrides = {
    // Keys are the OneGraph service enums, values are the desired `secret.<service>` names
    GITHUB: 'gitHub',
};
var formatSecrets = function (result) {
    if (!result ||
        !result.data ||
        !result.data.me ||
        !result.data.me.serviceMetadata ||
        !result.data.me.serviceMetadata.loggedInServices) {
        return {};
    }
    // TODO use optional chaining once we drop node 12 or lower
    var responseServices = result.data.me.serviceMetadata.loggedInServices;
    var newSecrets = responseServices.reduce(function (acc, service) {
        var _a;
        var normalized = serviceNormalizeOverrides[service.service] || camelize(service.friendlyServiceName);
        return __assign(__assign({}, acc), (_a = {}, _a[normalized] = service, _a));
    }, {});
    return newSecrets;
};
var logErrors = function (errors) {
    for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
        var error = errors_1[_i];
        var errorMessage = void 0;
        switch (error.type) {
            case 'missing-event-in-function':
                errorMessage =
                    'You must provide an event or request to `getSecrets` when used in functions and on-demand builders.';
                break;
            case 'provided-event-in-build':
                errorMessage = 'You must not pass arguments to `getSecrets` when used in builds.';
                break;
            default: {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                var exhaustiveCheck = error.type;
                errorMessage = error.type;
                break;
            }
        }
        var message = errorMessage;
        console.error(message);
    }
};
// We select for more than we typically need here
// in order to allow for some metaprogramming for
// consumers downstream. Also, the data is typically
// static and shouldn't add any measurable overhead.
var findLoggedInServicesQuery = "query FindLoggedInServicesQuery {\n    me {\n      serviceMetadata {\n        loggedInServices {\n          friendlyServiceName\n          service\n          isLoggedIn\n          bearerToken\n          grantedScopes {\n            scope\n            scopeInfo {\n              category\n              scope\n              display\n              isDefault\n              isRequired\n              description\n              title\n            }\n          }\n        }\n      }\n    }\n  }";
var getSecretsForToken = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var body, resultBody, result, newSecrets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = JSON.stringify({ query: findLoggedInServicesQuery });
                return [4 /*yield*/, (0, graph_request_js_1.graphRequest)(token, new TextEncoder().encode(body))];
            case 1:
                resultBody = _a.sent();
                result = JSON.parse(resultBody);
                newSecrets = formatSecrets(result);
                return [2 /*return*/, newSecrets];
        }
    });
}); };
var getSecrets = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var graphTokenResponse, graphToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                graphTokenResponse = (0, graph_token_js_1.getNetlifyGraphToken)(event, true);
                graphToken = graphTokenResponse.token;
                if (!graphToken) {
                    if (graphTokenResponse.errors) {
                        logErrors(graphTokenResponse.errors);
                    }
                    return [2 /*return*/, {}];
                }
                return [4 /*yield*/, getSecretsForToken(graphToken)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getSecrets = getSecrets;
var getSecretsForBuild = function () { return __awaiter(void 0, void 0, void 0, function () {
    var graphTokenResponse, graphToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                graphTokenResponse = (0, graph_token_js_1.getNetlifyGraphTokenForBuild)();
                graphToken = graphTokenResponse.token;
                if (!graphToken) {
                    if (graphTokenResponse.errors) {
                        logErrors(graphTokenResponse.errors);
                    }
                    return [2 /*return*/, {}];
                }
                return [4 /*yield*/, getSecretsForToken(graphToken)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getSecretsForBuild = getSecretsForBuild;
