var config            = require('../config');
var gulp              = require('gulp');
var gulpSequence      = require('gulp-sequence');
var getEnabledTasks   = require('../lib/getEnabledTasks');

gulp.task('build:production', function(cb) {
  process.env.NODE_ENV = 'production';
  var tasks = getEnabledTasks('production');
  gulpSequence( 'clean',
                tasks.assetTasks,
                tasks.codeTasks,
                'base64',
                'inject',
                ['clean:tmp', 'size-report'],
                cb);
});
