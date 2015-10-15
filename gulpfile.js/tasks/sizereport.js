var config       = require('../config');
var gulp         = require('gulp');
var sizereport   = require('gulp-sizereport');
var path         = require('path');

function sizeReport() {
  return gulp.src(path.join( config.root.dest, '/**/*.html'))
    .pipe(sizereport({
      gzip: true,
      total:false
    }));
}


gulp.task('size-report', sizeReport);
