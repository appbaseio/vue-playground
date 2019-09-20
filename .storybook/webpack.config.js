var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = async ({ config }) => {
  config.module.rules.push(new VueLoaderPlugin());
  return config;
};
