var config       = require('../config');
if(!config.tasks.css) return;

var gulp          = require('gulp');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer')
var gulpif        = require('gulp-if');
var minify        = require('gulp-minify-css');
var browserSync   = require('browser-sync')
var handleErrors  = require('../lib/handleErrors')
var path          = require('path');

var paths = {
  src: path.join(config.root.src, config.tasks.css.src, '/**/*.{'+ config.tasks.css.extensions + '}'),
  dest: path.join(config.root.tmp, config.tasks.css.dest)
};

//________________________________________________________ functions
// -

function css() {
  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
    .pipe(sass(config.tasks.css.sass))
    .on('error', handleErrors)
    .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe(sourcemaps.write())
    .pipe(gulpif(process.env.NODE_ENV == 'production', minify()))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.reload({stream:true}));
};

//________________________________________________________ tasks
// -

gulp.task('css', css);
