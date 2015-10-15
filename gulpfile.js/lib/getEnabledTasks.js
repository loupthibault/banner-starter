var config       = require('../config');
var compact      = require('lodash/array/compact');

var assetTasks = ['images'];
var codeTasks = ['html', 'css', 'js'];
var jsTasks = {
  watch: 'webpack:watch',
  development: 'webpack:development',
  production: 'webpack:production'
};

module.exports = function(env) {

  var matchFilter = function(task) {
    if(config.tasks[task]) {
      if(task === 'js') {
        task = jsTasks[env] || jsTasks.watch;
      }
      return task;
    }
  }

  return {
    assetTasks: compact(assetTasks.map(matchFilter)),
    codeTasks: compact(codeTasks.map(matchFilter))
  };
}
