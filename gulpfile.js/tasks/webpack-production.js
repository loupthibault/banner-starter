var config = require('../config');
if(!config.tasks.js) return;

var webpackConfig  = require('../lib/webpack-multi-config')('production');
var gulp    = require('gulp');
var logger  = require('../lib/compileLogger');
var webpack = require('webpack');

gulp.task('webpack:production', function(callback) {
  webpack(webpackConfig, function(err, stats) {
    logger(err, stats);
    callback();
  })
})
