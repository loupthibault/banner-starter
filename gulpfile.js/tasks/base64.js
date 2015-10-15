var config       = require('../config');
if(!config.tasks.css && !config.tasks.html) return;
var gulp          = require('gulp');
var gulpBase64    = require('gulp-base64');
var gulpImg64     = require('gulp-img64');
var path          = require('path');



//________________________________________________________ functions
// -

function base64Css() {

  var paths = {
    src: path.join(config.root.tmp, config.tasks.css.dest, '/**/*.css'),
    dest: path.join(config.root.tmp, config.tasks.css.dest)
  };

  return gulp.src(paths.src)
    .pipe(gulpBase64({
      baseDir: paths.dest,
      extensions: ['svg', 'png', 'jpg'],
      debug: false,
      maxImageSize: 1000 * 1024
    }))
    .pipe(gulp.dest(paths.dest));
};

function base64Html() {

  var paths = {
    src: path.join(config.root.tmp, config.tasks.html.dest, '/**/*.html'),
    dest: path.join(config.root.tmp, config.tasks.html.dest)
  };
  return gulp.src(paths.src)
        .pipe(gulpImg64())
        .pipe(gulp.dest(paths.dest));
}

//________________________________________________________ tasks
// -

gulp.task('base64Css', base64Css);
gulp.task('base64Html', base64Html);
gulp.task('base64', ['base64Css', 'base64Html']);
