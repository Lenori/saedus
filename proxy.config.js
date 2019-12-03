const proxy = [
  {
    context: '/api',
    target: 'http://18.224.180.162/api',
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
    pathRewrite: {'^/api' : ''}
  }
];

module.exports = proxy;
