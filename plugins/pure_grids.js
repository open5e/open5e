/*
 * grunt-pure-grids
 * https://github.com/yahoo/grunt-pure-grids
 *
 * Copyright 2014 Yahoo! Inc.
 * Licensed under the Yahoo! Inc. BSD license.
 */

'use strict';

var rework    = require('rework'),
    pureGrids = require('rework-pure-grids');

module.exports = function (grunt) {

    grunt.registerMultiTask('pure_grids', 'Generate custom units for Pure Grids', function () {
        var options = this.options({
            indent: '    '
        });

        var units = options.units;
        delete options.units;

        // Iterate over all specified file groups.
        this.files.forEach(function (fileGroup) {
            var css = rework('').use(pureGrids.units(units, options));

            grunt.file.write(fileGroup.dest, css.toString(options));
            grunt.log.writeln('File "' + fileGroup.dest + '" created.');
        });
    });

};
