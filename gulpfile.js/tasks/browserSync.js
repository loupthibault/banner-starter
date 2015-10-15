var browserSync = require('browser-sync');
var config      = require('../config');
var gulp        = require('gulp');

//________________________________________________________ tasks
// -

gulp.task('browserSync', function() {
  var settings = config.tasks.browserSync;
  settings = process.env.NODE_ENV == 'production' ? settings.production : settings.development;
  return browserSync(settings);
})
