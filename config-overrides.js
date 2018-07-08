const path = require('path');
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = function override(config, env) {
  /* antd样式按需加载 */
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', style: 'css' }],
    config
  );

  /* less */
  config = rewireLess(config, env);

  /* 模块别名 */
  config.resolve.alias = {
    src: resolve('src'),
    pages: resolve('src/pages'),
    components: resolve('src/components'),
    api: resolve('src/api'),
    utils: resolve('src/utils'),
    mock: resolve('src/mock'),
    image: resolve('src/image')
  };

  return config;
};
