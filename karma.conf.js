// Karma configuration
// Generated on Thu Oct 29 2020 09:39:52 GMT+0100 (GMT+01:00)

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const VENDOR_LIBS = require('./webpack/vendor.config');

module.exports = function(config) {

  const preprocessors = {};  
  VENDOR_LIBS.forEach(vendorLib => {
    preprocessors[vendorLib] = ['webpack'];
  });
  preprocessors['./src/**/*spec.js'] = ['webpack'];

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './node_modules/angular/angular.js',
      "./node_modules/angular-mocks/angular-mocks.js",
      "./tests.spec.js",
      './src/**/*spec.js'
    ],
    webpack: {
      mode: 'development',
      entry: {
        vendor: VENDOR_LIBS
      },
      output: {
          path: __dirname + '/dist/test',
          filename: '[name].js'
      },
      module: {
        rules: [
          {
            test: /\.less$/,
            use: [
                {
                loader: 'style-loader', // creates style nodes from JS strings
                },
                {
                loader: 'css-loader', // translates CSS into CommonJS
                },
                {
                loader: 'less-loader', // compiles Less to CSS
                },
            ],
            exclude: /node_modules/
          },
          {
              test: /\.css$/,
              use: [
                  {
                  loader: 'style-loader', // creates style nodes from JS strings
                  },
                  {
                  loader: 'css-loader', // translates CSS into CommonJS
                  }
              ],
              include: /node_modules/
          },
          { 
              test: /\.(jp?g|png|gif|svg)$/i,
              loader: "file-loader",
              options: {
                  name : '[name].[ext]',
                  outputPath: 'assets/img',
                  publicPath: 'assets/img',
                  esModule: false                      
              }    
          },
          { 
              test: /\.(eot|ttf|woff|woff2)$/, 
              loader: "file-loader",
              options: {
                  name :'[name].[ext]',
                  outputPath: './',
                  publicPath: './'
              }  
          },
          {
              test: /\.html$/,
              use: ['ng-cache-loader?prefix=view/'],
              exclude: /\index.html$/
          
          },
        ]
      },
      node: {
        console: true,
        fs: 'empty',
        tls: 'empty',
        ws: 'empty'
      },
      plugins: [
          new webpack.ProvidePlugin({
              'window.jQuery': 'jquery',
              $: 'jquery',
              'jQuery': 'jquery'            
          }),
          new webpack.ProvidePlugin({
              'JSZip': 'JSZip',
              'window.JSZip': 'JSZip' // this doesn't expose JSZip property for window, but exposes it to every module
          })
      ] 
    },

    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: preprocessors,


    junitReporter: {
      outputDir: 'testresults/junit',
      outputFile: 'unit-test-result.xml',
      useBrowserName: false
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'junit'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    plugins: [
      require('karma-webpack'),
      ('karma-jasmine'),
      ('karma-chrome-launcher'),
      require('karma-junit-reporter')
    ]
  })
}