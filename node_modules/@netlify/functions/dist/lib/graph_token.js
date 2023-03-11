"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNetlifyGraphTokenForBuild = exports.getNetlifyGraphToken = void 0;
var process_1 = require("process");
var TOKEN_HEADER = 'X-Nf-Graph-Token';
var TOKEN_HEADER_NORMALIZED = 'x-nf-graph-token';
var hasRequestStyleHeaders = function (headers) {
    return headers.get !== undefined && typeof headers.get === 'function';
};
var graphTokenFromIncomingHttpStyleHeaders = function (headers) {
    if (TOKEN_HEADER in headers || TOKEN_HEADER_NORMALIZED in headers) {
        var header = headers[TOKEN_HEADER] || headers[TOKEN_HEADER_NORMALIZED];
        if (Array.isArray(header)) {
            return header[0];
        }
        return header;
    }
};
var graphTokenFromEnv = function () {
    // _NETLIFY_GRAPH_TOKEN injected by next plugin
    // eslint-disable-next-line no-underscore-dangle
    var token = process_1.env._NETLIFY_GRAPH_TOKEN || process_1.env.NETLIFY_GRAPH_TOKEN;
    return { token: token };
};
var tokenFallback = function (event) {
    // Backwards compatibility with older version of cli that doesn't inject header
    if (event && event.authlifyToken) {
        return { token: event.authlifyToken };
    }
    // If we're in dev-mode with next.js, the plugin won't be there to inject
    // secrets, so we need to get the token from the environment
    if (process_1.env.NETLIFY_DEV === 'true') {
        return graphTokenFromEnv();
    }
    return { token: null };
};
var graphTokenFromEvent = function (event) {
    var headers = event.headers;
    // Check if object first in case there is a header with key `get`
    var token = graphTokenFromIncomingHttpStyleHeaders(headers);
    if (token) {
        return { token: token };
    }
    if (hasRequestStyleHeaders(headers)) {
        return { token: headers.get(TOKEN_HEADER) };
    }
    return tokenFallback(event);
};
var isEventRequired = function () {
    var localDev = process_1.env.NETLIFY_DEV === 'true';
    var localBuild = !localDev && process_1.env.NETLIFY_LOCAL === 'true';
    var remoteBuild = process_1.env.NETLIFY === 'true';
    // neither `localBuild` nor `remoteBuild` will be true in the on-demand builder case
    var inBuildPhase = localBuild || remoteBuild;
    var inGetStaticProps = 
    // Set by the nextjs plugin
    // eslint-disable-next-line no-underscore-dangle
    typeof process_1.env._NETLIFY_GRAPH_TOKEN !== 'undefined';
    return !inBuildPhase && !inGetStaticProps;
};
var incorrectArgumentsErrors = function (event) {
    var requiresEvent = isEventRequired();
    if (requiresEvent && event == null) {
        var errorMessage = 'You must provide an event or request to `getNetlifyGraphToken` when used in functions and on-demand builders.';
        return [{ type: 'missing-event-in-function', message: errorMessage }];
    }
    if (!requiresEvent && event != null) {
        var errorMessage = 'You must not pass arguments to `getNetlifyGraphToken` when used in builds.';
        return [{ type: 'provided-event-in-build', message: errorMessage }];
    }
};
var logErrors = function (errors) {
    for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
        var error = errors_1[_i];
        // Log errors to help guide developer
        console.error(error.message);
    }
};
var getNetlifyGraphToken = function (event, 
// caller can prevent error log. Allows getSecrets to provide better errors
supressLog) {
    var errors = incorrectArgumentsErrors(event);
    if (errors) {
        if (!supressLog) {
            logErrors(errors);
        }
        return { errors: errors };
    }
    return event ? graphTokenFromEvent(event) : graphTokenFromEnv();
};
exports.getNetlifyGraphToken = getNetlifyGraphToken;
var getNetlifyGraphTokenForBuild = function () {
    return graphTokenFromEnv();
};
exports.getNetlifyGraphTokenForBuild = getNetlifyGraphTokenForBuild;
