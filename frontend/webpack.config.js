const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
      url: require.resolve("url/"),
      crypto: require.resolve("crypto-browserify"),
      assert: require.resolve("assert/"),
      zlib: require.resolve("browserify-zlib")
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]
};
