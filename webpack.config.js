const path = require('path');
const webpack = require('webpack');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
    context: srcPath,
    resolve: {
        alias: {
            components: path.resolve(srcPath, 'components'),
            api: path.resolve(srcPath, 'api'),
            images: path.resolve(srcPath, 'images')
        }
    },
    entry: {
        index: './index.jsx',
        vendor: ['react', 'react-dom']
    },
    output: {
        path: distPath,
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    'es2015', {
                                        modules: false
                                    }
                                ],
                                'react'
                            ],
                            plugins: [
                                'babel-plugin-transform-class-properties',
                                'transform-object-rest-spread'
                            ]
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options : {
                            url: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js', minChunks: 2})],
    devServer: {
        contentBase: distPath,
        compress: true,
        port: 8886,
        historyApiFallback: true
    },
    devtool: 'source-map'
};
