var config = require('../config');
if(!config.tasks.js) return;

var gulp          = require('gulp');
var logger        = require('../lib/compileLogger');
var webpack       = require('webpack');
var webpackConfig = require('../lib/webpack-multi-config');


//________________________________________________________ functions
// -

function webpackDevelopment(cb) {
  webpack(webpackConfig('development'), function(err, stats) {
    logger(err, stats);
    cb();
  });
};

//________________________________________________________ tasks
// -

gulp.task('webpack:development', webpackDevelopment);
