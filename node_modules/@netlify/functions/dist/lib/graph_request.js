"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphRequest = void 0;
var buffer_1 = require("buffer");
var https_1 = require("https");
var process_1 = require("process");
var siteId = process_1.env.SITE_ID;
var GRAPH_HOST = 'graph.netlify.com';
var graphRequest = function (secretToken, requestBody) {
    return new Promise(function (resolve, reject) {
        var port = 443;
        var options = {
            host: GRAPH_HOST,
            path: "/graphql?app_id=".concat(siteId),
            port: port,
            method: 'POST',
            headers: {
                Authorization: "Bearer ".concat(secretToken),
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Content-Length': requestBody ? buffer_1.Buffer.byteLength(requestBody) : 0,
            },
        };
        var req = (0, https_1.request)(options, function (res) {
            if (res.statusCode !== 200) {
                return reject(new Error(String(res.statusCode)));
            }
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            res.on('end', function () {
                var data = buffer_1.Buffer.concat(body).toString();
                try {
                    resolve(data);
                }
                catch (error) {
                    reject(error);
                }
            });
        });
        req.on('error', function (error) {
            reject(error);
        });
        req.write(requestBody);
        req.end();
    });
};
exports.graphRequest = graphRequest;
