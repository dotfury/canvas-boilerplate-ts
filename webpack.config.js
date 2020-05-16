const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TodoWebpackPlugin = require('todo-webpack-plugin');
const config = require('./config');
const { name } = require('./package');

// Concatenates client configuration with package `name` from package.json.
fs.writeFileSync(
  path.resolve(__dirname, 'config/client.json'),
  JSON.stringify({ ...{ name }, ...config.get('client') })
);

const BUILD_FOLDER = path.resolve(__dirname, 'build');

const envVariable = config.get('env');
const env = envVariable === 'production' || envVariable === 'staging' ? 'production' : 'development';
const isDevelopment = env === 'development';

const TERSER_OPTIONS = {
  parse: {
    // terser parser ecma 8 code.
    ecma: 8
  },
  compress: {
    ecma: 5,
    warnings: false,
    comparisons: false,
    inline: 2,
    drop_console: !isDevelopment
  },
  mangle: {
    safari10: true
  },
  output: {
    ecma: 5,
    comments: false,
    // eslint-disable-next-line @typescript-eslint/camelcase
    ascii_only: true
  }
};

const HTML_MINIFY_OPTIONS = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true
};

module.exports = () => {
  const webpackConfig = {
    mode: env,
    stats: 'errors-warnings',
    devtool: 'cheap-module-eval-source-map',
    entry: {
      main: './src/index.ts'
    },
    output: {
      // Avoid generating path info which puts garbage collection pressure on projects that bundle thousands of modules.
      pathinfo: false,
      path: BUILD_FOLDER,
      filename: 'js/[name]-[hash].js',
      publicPath: '/'
    },
    devServer: {
      historyApiFallback: true,
      port: 9000,
      // You can allow untrusted certificate on
      // localhost on Chrome with the flag `chrome://flags/#allow-insecure-localhost`
      https: true,
      http2: true,
      hot: true,
      open: true,
      disableHostCheck: true,
      compress: true,
      clientLogLevel: 'none',
      overlay: false
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        'config.json': path.resolve(__dirname, 'config/client.json'),
        react: path.resolve('./node_modules/react')
      }
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          include: path.resolve(__dirname, 'src'),
          options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: isDevelopment,
            experimentalWatchApi: isDevelopment
          }
        },
        {
          test: /src\/styles\/global.s?css$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              options: {
                sourceMap: false,
                importLoaders: 1
              }
            }
          ]
        },
        {
          test: /\.s?css$/,
          exclude: /src\/styles\/global.s?css$/,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                sourceMap: isDevelopment,
                importLoaders: 1
              }
            }
          ]
        },
        {
          test: /\.woff(\?.*$|$)/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot|svg)(\?.*$|$)/,
          loader: 'url-loader'
        },
        {
          test: /\.(gif|png|jpe?g|svg|ico)$/i,
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      ]
    },
    plugins: [
      isDevelopment &&
        new ForkTsCheckerWebpackPlugin({
          async: false,
          checkSyntacticErrors: true,
          silent: true
        }),

      new MiniCssExtractPlugin({
        filename: 'styles/[hash].css'
      }),

      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: './index.html',
        inject: true,
        minify: !isDevelopment && HTML_MINIFY_OPTIONS
      }),

      // Generates a TODO.md file in the root directory.
      isDevelopment &&
        new TodoWebpackPlugin({
          console: true
        }),
      // Exposes the logger globally to all modules.
      new webpack.ProvidePlugin({
        debug: [path.resolve(path.join(__dirname, './src/lib/debug')), 'default']
      })
    ].filter(Boolean),

    optimization: {
      minimize: !isDevelopment,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: TERSER_OPTIONS,
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          parallel: true,
          // Enable file caching
          cache: true,
          sourceMap: isDevelopment
        }),
        // This is only used in production mode
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: isDevelopment ? { inline: false, annotation: true } : false
          }
        })
      ],

      // Automatically split vendor and commons
      runtimeChunk: 'single',
      // Avoiding extra optimization steps not necessary in development.
      removeAvailableModules: !isDevelopment,
      removeEmptyChunks: !isDevelopment,
      // Split chunks in development mode only to improve development compilation performance.
      splitChunks: !isDevelopment && {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0
      }
    }
  };

  return webpackConfig;
};
