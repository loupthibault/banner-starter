var config = require('../config');
if(!config.tasks.js) return;

var path            = require('path');
var webpack         = require('webpack');

module.exports = function(env) {
  var jsSrc = path.resolve(config.root.src, config.tasks.js.src);
  var jsDest = path.resolve(config.root.tmp, config.tasks.js.dest);
  var publicPath = path.join(config.tasks.js.src, '/');
  var filenamePattern = '[name].js';
  var extensions = config.tasks.js.extensions.map(function(extension) {
    return '.' + extension
  });

  var webpackConfig = {
    context: jsSrc,
    plugins: [
      // new webpack.ProvidePlugin({
      //   CSSPlugin: "gsap/src/uncompressed/plugins/CSSPlugin"
      // })
    ],
    resolve: {
      alias: {
        EasePack: "gsap/src/uncompressed/easing/EasePack",
        CSSPlugin: "gsap/src/uncompressed/plugins/CSSPlugin",
        TweenLite: "gsap/src/uncompressed/TweenLite",
        TimelineLite: "gsap/src/uncompressed/TimelineLite"
      },
      extensions: [''].concat(extensions)
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader?stage=1',
          exclude: /node_modules/
        }
      ]
    }
  };

  if(env !== 'test') {
    // Karma doesn't need entry points or output settings
    webpackConfig.entry = config.tasks.js.entries;

    webpackConfig.output= {
      path: path.normalize(jsDest),
      filename: filenamePattern,
      publicPath: publicPath
    };

    if(config.tasks.js.extractSharedJs) {
      // Factor out common dependencies into a shared.js
      webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: 'shared',
          filename: filenamePattern,
        })
      );
    }
  }

  if(env === 'development') {
    webpackConfig.devtool = 'source-map';
    webpack.debug = true;
  }

  if(env === 'production') {
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin()
    );
  }

  return webpackConfig;
}
