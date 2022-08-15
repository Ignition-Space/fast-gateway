const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.tsx',
  },
  template: 'tpl/index.html',
  devServer: {
    proxy: {
      '/ees_proxy': {
        changeOrigin: true,
        target: `http://dev.efficiency.xytech.com/`,
        pathRewrite: { '^/ees_proxy': '' },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('origin', 'http://optimusnew.dev1.static.xytech.com');
        },
      },
      '/shield_proxy': {
        changeOrigin: true,
        // target: `http://shield.test.xyb2b.com.cn/`,
        target: 'http://localhost:3000/',
        pathRewrite: { '^/shield_proxy': '' },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('origin', 'http://shield.test.xyb2b.com.cn');
        },
      },
      '/proxy': {
        changeOrigin: true,
        target: `http://api.optimus.test.xyb2b.com.cn/`,
        pathRewrite: { '^/proxy': '' },
        onProxyReq(proxyReq) {
          proxyReq.setHeader('origin', 'http://optimusnew.dev1.static.xytech.com');
        },
      },
    },
  },
  plugins: [
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ['json', 'html'],
    }),
  ],
};
