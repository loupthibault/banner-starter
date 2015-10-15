var config              = require('../config');
if(!config.tasks.html);

var gulp                = require('gulp');
var gulpIf              = require('gulp-if');
var gulpHtmlmin         = require('gulp-htmlmin');
var gulpNunjucksRender  = require('gulp-nunjucks-render');
var data                = require('gulp-data');
var path                = require('path');
var fs                  = require('fs');
var handleErrors        = require('../lib/handleErrors')
var browserSync         = require('browser-sync');
var package             = require('../../package.json');

//________________________________________________________ functions
// -

var exclude = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**');

var paths = {
  src: [path.join(config.root.src, config.tasks.html.src, '/**/*.html'), exclude],
  dest: path.join(config.root.tmp, config.tasks.html.dest)
};

var getData = function(file) {
  return {
    title: package.name,
    description: package.description,
    banners: config.banners
  };
};

function html(cb) {
  gulpNunjucksRender.nunjucks.configure([path.join(config.root.src, config.tasks.html.src)], {watch:false});

  return gulp.src(paths.src)
    .pipe(data(getData()))
    .pipe(gulpNunjucksRender())
    .on('error', handleErrors)
    .pipe(gulpIf(process.env.NODE_ENV == 'production', gulpHtmlmin(config.tasks.html.htmlmin)))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.reload({stream:true}));
};


//________________________________________________________ tasks
// -

gulp.task('html', html);
