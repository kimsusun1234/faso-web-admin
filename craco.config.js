const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#000',
            '@input-height-base '          : '46px',
            '@select-item-selected-color': '#fff'
         },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};