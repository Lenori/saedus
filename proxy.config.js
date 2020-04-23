const proxy = [
  {
    context: '/api',
    target: 'http://18.224.180.162/api',
    //target: 'http://127.0.0.1:8888',
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
    pathRewrite: {'^/api' : ''}
  }
];

module.exports = proxy;
