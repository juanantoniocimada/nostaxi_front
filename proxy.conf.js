module.exports = {
  '/api/ecobank': {
    target: 'https://apimuat-gateway.ecobank.com',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {
      '^/api/ecobank': ''
    },
    configure: (proxy) => {
      // the browser's Origin header makes APIM short-circuit with an empty 200; strip it
      proxy.on('proxyReq', (proxyReq) => {
        proxyReq.removeHeader('origin');
        proxyReq.removeHeader('referer');
      });
    }
  }
};
