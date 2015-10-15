var config = require('../config');
if(!config.tasks.images) return;

var gulp          = require('gulp');
var imagemin      = require('gulp-imagemin');
var changed       = require('gulp-changed');
var browserSync   = require('browser-sync');
var path          = require('path');


var paths = {
  src: path.join(config.root.src, config.tasks.images.src, '/**'),
  dest: path.join(config.root.tmp, config.tasks.images.dest)
};

//________________________________________________________ functions
// -

function images() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(imagemin(config.tasks.images.optimizations))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.reload({stream:true}));
};


//________________________________________________________ tasks
// -

gulp.task('images', images);
