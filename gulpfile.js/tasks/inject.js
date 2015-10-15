var gulp          = require('gulp');
var inject        = require('gulp-inject');
var path          = require('path');
var config        = require('../config');
var mergeStream   = require('merge-stream');
var _             = require('lodash');
var handleErrors  = require('../lib/handleErrors');


//________________________________________________________ functions
// -

function injectTask() {

  config.banners.push({name:'Index', html:"index.html", css:["main.index.css"]});

  var injectHTML = function(bundleConfig) {

    var checkIfNeeded = function(pFileType) {
      var fileTypeToInject = bundleConfig[pFileType];
      if(fileTypeToInject && Array.isArray(fileTypeToInject) && fileTypeToInject.length) {
        var ln = fileTypeToInject.length;
        for(var i=0; i<ln; i++ )
          filesToInject.push(path.join(config.root.tmp, config.tasks[pFileType].dest, fileTypeToInject[i]));
      }
    };

    var filesToInject = [];
    checkIfNeeded('js');
    checkIfNeeded('css');

    var bundle = function() {
      return gulp.src(path.join(config.root.tmp, bundleConfig.html))
        .pipe(inject(gulp.src(filesToInject), {
          starttag: '<!-- inject:files:{{ext}} -->',
          removeTags: true,
          transform: function (filePath, file, index, length, targetFile) {
            if (filePath.slice(-3) === '.js') {
              return "<script>"+ file.contents.toString('utf8') + "</script>";
            }
            if (filePath.slice(-4) === '.css') {
              return "<style>"+ file.contents.toString('utf8') + "</style>";
            }
            return "";
          }
        }))
        .on('error', handleErrors)
        .pipe(gulp.dest(config.root.dest));
    }

    return bundle();
  };

  return mergeStream.apply(gulp, _.map(config.banners, injectHTML));
};


//________________________________________________________ tasks
// -

gulp.task('inject', injectTask);
