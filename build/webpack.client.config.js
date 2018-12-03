const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const config = require('../config')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

let webpackConfig = merge(base, {
  entry: {
    app: './src/entry-client.js'
  },
  resolve: {
    alias: {
      // 'create-http': './httpClient.js'
    }
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    // // extract vendor chunks for better caching
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function (module) {
    //     // a module is extracted into the vendor chunk if...
    //     return (
    //       // it's inside node_modules
    //       /node_modules/.test(module.context) &&
    //       // and not a CSS file (due to extract-text-webpack-plugin limitation)
    //       !/\.css$/.test(module.request)
    //     )
    //   }
    // }),
    // // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // // on every build.
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest'
    // }),
    new VueSSRClientPlugin()
  ]
})

// 服务器端配置
if (process.env.NODE_ENV === 'production') {
  webpackConfig = merge(webpackConfig, {
    plugins: [
      // auto generate service worker
      new SWPrecachePlugin({
        cacheId: 'ffl',
        filename: 'service-worker.js',
        minify: true,
        dontCacheBustUrlsMatching: /./,
        staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
        runtimeCaching: [
          // 如果在staticFileGlobs中设置相同的缓存路径，可能导致此处不起作用
          {
            urlPattern: /\/js\//,
            handler: 'fastest',
            options: {
              cache: {
                maxEntries: 10,
                name: 'js-cache'
              }
            }
          },
          {
            urlPattern: /\/fonts\/|\.ttf|\.eot|\.svg|\.woff/,
            handler: 'fastest',
            options: {
              cache: {
                maxEntries: 10,
                name: 'fonts-cache'
              }
            }
          }
        ]
      }),
      // Make sure that the plugin is after any plugins that add images
      new ImageminPlugin({
        disable: false, // Disable during development
        pngquant: {
          quality: '90'
        }
      })
    ]
  })
}

if (config.build.productionGzip) {
  let CompressionWebpackPlugin = require('compression-webpack-plugin')
  // http://www.css88.com/doc/webpack2/plugins/compression-webpack-plugin/
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 5120,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
