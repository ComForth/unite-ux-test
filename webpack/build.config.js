var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const VENDOR_LIBS = require('./vendor.config');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => {

    const { app } = env;
    const { mode } = env;

    // Set the base href attribute value according to the app source path
    let base = '/';
    if(app !== 'main') {
        base = '/' + app + '/';
    }

    return {
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        keep_fnames: true
                    }
                })
            ],
        },
        entry: {
            vendor: VENDOR_LIBS,
            bundle: './src/' + app + '/app.module.js'
        },
        output: {
            path: __dirname + '/../dist/' + app,
            filename: '[name].[hash].js'
        },
        module: {
            rules: [
                {
                    test: /\.(scss)$/,
                    use: [{
                    loader: 'style-loader', // inject CSS to page
                    }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                    }, {
                    loader: 'postcss-loader', // Run postcss actions
                    options: {
                        plugins: function () { // postcss plugins, can be exported to postcss.config.js
                        return [
                            require('autoprefixer')
                        ]
                        }
                    }
                    }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                    }],
                    exclude: /node_modules/
                },
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
                        outputPath: 'fonts',
                        publicPath: 'fonts'
                    }  
                },
                {
                    test: /\.html$/,
                    use: ['ng-cache-loader?prefix=view/'],
                    exclude: /\index.html$/
                
                },
                {
                    test: require.resolve('jquery'),
                    use: [
                        {
                            loader: 'expose-loader',
                            options: 'jQuery'
                        },
                        {
                            loader: 'expose-loader',
                            options: '$'
                        }
                    ]
                },
                {
                    test: /\.(js)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [["@babel/preset-env", { "targets": {chrome: "85"} }]],
                            plugins: ['@babel/plugin-proposal-object-rest-spread']
                        }
                    }
                }                  
            ],
        },
        node: {
            // console: true,
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
            }),
            new HtmlWebpackPlugin({
                template: './src/' + app + '/index.html',
                inject: 'head',
                favicon: './src/' + app + '/favicon.ico',
                base: base                   
            }),
            new CopyPlugin([
                { from: './src/' + app + '/web.config', to: './' },
                { from: './src/' + app + '/app.config.' + mode + '.json', to: './app.config.json' }
            ]),
        ]
    }
};