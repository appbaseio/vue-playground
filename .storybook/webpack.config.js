const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.plugins.push(new VueLoaderPlugin());

  return defaultConfig;
};
