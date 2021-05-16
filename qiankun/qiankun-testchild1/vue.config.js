const path = require('path');
const packageName = require('./package').name;

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 9725; // dev port
module.exports = {
  publicPath:`//localhost:${port}`,
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
 
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    historyApiFallback: true,//添加 重点
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },
};
