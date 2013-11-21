/*
 * grunt-helpers
 * https://github.com/helpers/grunt-helpers
 *
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';


/**
 * Dependencies
 */

var path  = require('path');
var grunt = require('grunt');
var _     = require('lodash');




/**
 * @name mergeOptionsArrays
 * Merge options at the task and target levels. Normal
 * behavior is for target-level options to overwrite
 * task-level options.
 */

exports.mergeOptionsArrays = function(target, name) {
  var taskArray = grunt.config([grunt.task.current.name, 'options', name]) || [];
  var targetArray = grunt.config([grunt.task.current.name, target, 'options', name]) || [];
  return _.union(taskArray, targetArray);
};


/**
 * Data file reader factory
 * Automatically determines the reader based on extension.
 * Use instead of grunt.file.readJSON or grunt.file.readYAML
 */

exports.readData = function(filepath) {
  var ext = path.extname(filepath);
  var reader = grunt.file.readJSON;
  switch(ext) {
    case '.json':
      grunt.verbose.writeln('>> Reading JSON'.yellow);
      reader = grunt.file.readJSON;
      break;
    case '.yml':
    case '.yaml':
      grunt.verbose.writeln('>> Reading YAML'.yellow);
      reader = grunt.file.readYAML;
      break;
  }
  return reader(filepath);
};


/**
 * Options data format factory
 * Enables all of the following configs to work in task options:
 * (basically throw any data config format and it 'should' work)
 */

exports.readOptionsData = function(data) {
  var metadata;
  if (_.isString(data) || _.isArray(data)) {

    data.map(function(val) {
      grunt.verbose.ok('Type:'.yellow, grunt.util.kindOf(val));
      if (_.isString(val)) {
        grunt.file.expand(val).forEach(function(filepath) {
          var content = grunt.file.read(filepath);
          if (content.length === 0 || content === '') {
            grunt.verbose.warn('Skipping empty path:'.yellow, val);
          } else {
            var parsedData = exports.readData(filepath);
            metadata = grunt.config.process(_.extend(metadata, parsedData));
            grunt.verbose.ok('metadata:'.yellow, metadata);
          }
        });
      }
      if (_.isObject(val)) {
        metadata = grunt.config.process(_.extend(metadata, val));
        grunt.verbose.ok('metadata:'.yellow, metadata);
      }
    });
  } else if (_.isObject(data)) {
    metadata = data;
  } else {
    metadata = {};
  }
  return metadata;
};


/**
 * Compile Lo-Dash templates
 */

exports.compileTemplate = function (src, options, fn) {
  options = options || {};
  var output = grunt.template.process(src, {
    data: options.data || {},
    delimiters: options.delimiters || 'readme'
  });
  output = _.isFunction(fn) ? fn(output) : output;
  return output;
};


