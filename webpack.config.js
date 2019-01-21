var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const NODE_ENV = process.env.NODE_ENV || 'development';
const FILE_ENV = process.env.FILE_ENV || 'test';
// 环境 development
console.warn(`打包环境为：${NODE_ENV}`);
console.warn(`配置文件为：${FILE_ENV}\n`);

const env = {
  development: {
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js',
      publicPath: '/'
    },
    stats: {},
    devServer: {
      clientLogLevel: 'warning',
      historyApiFallback: {rewrites: {from: /.*/, to: '/index.html'}},
      // hot: true,
      contentBase: false,
      compress: true,
      host: 'localhost',
      port: 8080,
      open: false,
      overlay: {warnings: false, errors: true},
      publicPath: '/',
      proxy: {},
      // quiet: true,
      watchOptions: {poll: false},
      stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: path.resolve(__dirname, './src'),
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },

              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                }
              },
            ]
          })
        },
        {
          test: /\.(png|jpg|gif|svg|docx|doc)$/,
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: 'static/img/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: 'static/font/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ExtractTextPlugin.extract({
                fallback: 'vue-style-loader',
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      sourceMap: true
                    }
                  },
                ],
              }),
              postcss: ExtractTextPlugin.extract({
                fallback: 'vue-style-loader',
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      sourceMap: true
                    }
                  },
                ],
              }),
              less: ExtractTextPlugin.extract({
                fallback: 'vue-style-loader',
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      sourceMap: true,
                    }
                  },
                  {
                    loader: 'less-loader',
                    options: {
                      sourceMap: true,
                      modules: false,
                    },
                  },
                ],
              }),
            }
          }
        },
      ]
    },
    plugins: [
      // 替换上下文
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
      // 生成环境
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      // 样式打包
      new ExtractTextPlugin({filename: '[name].[contenthash:4].bundle.css', allChunks: true,}),
      // 生成HTMl并引用资源
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      // 拷贝资源文件
      // new CopyWebpackPlugin([
      //   {
      //     from: `static/globalvar.test.js`,
      //     to: 'static/js/globalvar.js'
      //   }
      // ])
    ],
  },
  production: {
    devtool: false,
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'static/js/[name].[chunkhash:5].chunk.js',
      chunkFilename: 'static/js/[name].[chunkhash:5].chunk.js',
      publicPath: '/'
    },
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    },
    devServer: {},
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: path.resolve(__dirname, './src'),
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },

              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                }
              },
            ]
          })
        },
        {
          test: /\.(png|jpg|gif|svg|docx|doc)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/img/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: 'static/font/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ExtractTextPlugin.extract({
                fallback: 'vue-style-loader',
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      sourceMap: false
                    }
                  },
                ],
              }),
              postcss: ExtractTextPlugin.extract({
                fallback: 'vue-style-loader',
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      sourceMap: false
                    }
                  },
                ],
              }),
              less: ExtractTextPlugin.extract({
                fallback: 'vue-style-loader',
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      sourceMap: false
                    }
                  },
                  {
                    loader: 'less-loader',
                    options: {
                      sourceMap: false
                    }
                  },
                ],
              }),
            },
            cssSourceMap: false,
            cacheBusting: true,
            transformToRequire: {
              video: ['src', 'poster'],
              source: 'src',
              img: 'src',
              image: 'xlink:href'
            }
          },
        },
      ]
    },
    plugins: [
      // 替换上下文
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
      // 打包依赖性能视图
      new BundleAnalyzerPlugin(),
      // 生成环境
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      // 删除旧文件
      new CleanWebpackPlugin(['./dist/*'], {
        root: __dirname, // 根目录
        verbose: true, // 开启在控制台输出信息
        dry: false // 启用删除文件
      }),
      // 压缩
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {comments: false,},
          compress: {warnings: false, drop_console: true}
        },
        sourceMap: false,
        parallel: true
      }),
      // 样式打包
      new ExtractTextPlugin({filename: 'static/css/[name].[contenthash].css', allChunks: true,}),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css\.*(?!.*map)/g,  //注意不要写成 /\.css$/g
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          discardComments: {removeAll: true},
          // 避免 cssnano 重新计算 z-index
          safe: true,
          // cssnano 集成了autoprefixer的功能
          // 会使用到autoprefixer进行无关前缀的清理
          // 关闭autoprefixer功能
          // 使用postcss的autoprefixer功能
          autoprefixer: false
        },
        canPrint: true
      }),
      // 生成HTMl并引用资源
      new HtmlWebpackPlugin({
        filename: './index.html',
        template: './index.html',
        // inject: true,
        // minify: {
        //   removeComments: true,
        //   collapseWhitespace: true,
        //   removeAttributeQuotes: true
        //   // more options:
        //   // https://github.com/kangax/html-minifier#options-quick-reference
        // },
        // // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        // chunksSortMode: 'dependency'
      }),
      // keep module.id stable when vendor modules does not change
      new webpack.HashedModuleIdsPlugin(),
      // enable scope hoisting
      new webpack.optimize.ModuleConcatenationPlugin(),
      // split vendor js into its own file
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'static/js/vendor.[chunkhash:5].bundle.js',
        minChunks(module) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
              path.join(__dirname, './node_modules')
            ) === 0
          )
        }
      }),
      // extract webpack runtime and module manifest to its own file in order to
      // prevent vendor hash from being updated whenever app bundle is updated
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
      }),
      // This instance extracts shared chunks from code splitted chunks and bundles them
      // in a separate chunk, similar to the vendor chunk
      // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
      new webpack.optimize.CommonsChunkPlugin({
        name: 'app',
        async: 'vendor-async',
        children: true,
        minChunks: 3
      }),
      // 拷贝资源文件
      new CopyWebpackPlugin([
        {
          from: `static/globalvar.${FILE_ENV}.js`,
          to: 'static/js/globalvar.js'
        }
      ])
    ],
  }
};

const webpackConfig = {
  // map
  devtool: env[NODE_ENV].devtool,
  // 需要打包的文件入口
  entry: {
    app: './src/main.js'
  },
  // 打包输出文件
  output: env[NODE_ENV].output,
  // 控制台输出信息配置
  stats: env[NODE_ENV].stats,
  // 入口文件路径
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      // '~': path.join(__dirname, 'src'),
      '@': path.join(__dirname, '.', 'src'),
    }
  },
  // webpack服务器
  devServer: env[NODE_ENV].devServer,
  // 模块处理
  module: env[NODE_ENV].module,
  // 插件
  plugins: env[NODE_ENV].plugins
};

module.exports = webpackConfig;
