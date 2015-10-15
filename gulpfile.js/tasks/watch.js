var config      = require('../config');
var gulp        = require('gulp');
var path        = require('path');
var gulpWatch   = require('gulp-watch');


//________________________________________________________ functions
// -

function watch() {
  var watchableTasks = ['images', 'html', 'css'];

  watchableTasks.forEach(function(taskName) {
    var task = config.tasks[taskName];
    if(task) {
      var filePattern = path.join(config.root.src, task.src, '/**/*.{' + task.extensions.join(',') + '}');
      gulpWatch(filePattern, function() { gulp.start(taskName)});
    }
  });
};

//________________________________________________________ tasks
// -

gulp.task('watch', ['browserSync'], watch);
