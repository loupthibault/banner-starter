var gulp    = require('gulp');
var del     = require('del');
var config  = require('../config');
var path    = require('path');


//________________________________________________________ functions
// -
function clean(cb) {
  cleanFiles([config.root.tmp, config.root.dest], cb);
};

function cleanTmp(cb) {
  cleanFiles([config.root.tmp], cb);
}

function cleanHTML(cb) {
  var files = [];
  files.push(path.join(config.root.src, config.tasks.html.src, '/**/*.html'));
  files.push('!' + path.join(config.root.src, config.tasks.html.src, 'index.html'));
  files.push(path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**'));

  cleanFiles(files, cb, true);
}

function cleanFiles(files, cb, excludeSrc) {

  excludeSrc = excludeSrc || false;

  // Don't touch node_modules or source files!
  files.push('!node_modules/**/*')
  if( !excludeSrc ) files.push('!' + path.join(config.root.src, '/**/*'));

  del(files).then(function (paths) {
    cb();
  });
}


//________________________________________________________ tasks
// -

gulp.task('clean', clean);

gulp.task('clean:tmp', cleanTmp);

gulp.task('clean:html', cleanHTML);
