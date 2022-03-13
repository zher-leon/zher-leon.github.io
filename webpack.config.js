module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          modifyVars: {
            'primary-color': 'red',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};