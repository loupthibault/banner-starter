var config              = require('../../config');
var gulp                = require('gulp');
var render              = require('gulp-nunjucks-render');
var rename              = require('gulp-rename');
var mergeStream         = require('merge-stream');
var _                   = require('lodash');
var path                = require('path');
var handleErrors        = require('../../lib/handleErrors');


var settings = {
  tags: {
    blockStart: '<%',
    blockEnd: '%>',
    variableStart: '<$',
    variableEnd: '$>',
    commentStart: '<#',
    commentEnd: '#>'
  },
  template: path.normalize('./gulpfile.js/tasks/buildHtml/template.html'),
  dest: path.join(config.root.src, config.tasks.html.src)
}

//________________________________________________________ tasks
// -

gulp.task('build:html', ['clean:html'], function() {

  render.nunjucks.configure( settings.nunjucks, {watch:false, tags:settings.tags});

  function buildHTML(bannerConfig, index) {

    return gulp.src(settings.template)
      .pipe(render({
        index:index,
        include:bannerConfig.include
      }))
      .on('error', handleErrors)
      .pipe(rename(bannerConfig.html))
      .pipe(gulp.dest(settings.dest));
  }

  return mergeStream.apply(gulp, _.map(config.banners, buildHTML));
});
