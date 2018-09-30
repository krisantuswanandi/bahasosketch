const path = require('path')
const webpack = require('webpack')
const ExtractText = require('extract-text-webpack-plugin')
const HTMLTemplate = require('html-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    entry: {
        bundle: './src/index',
        vendor: ['react', 'react-dom', 'firebase/app', 'firebase/auth', 'firebase/database', 'firebase/storage']
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name][chunkhash:10].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['react', 'env']
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractText.extract({
                    fallback: 'style-loader',
                    use: {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100
                        }
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
        new ExtractText('style.css'),
        new HTMLTemplate({
            template: 'src/index.html',
            favicon: 'src/images/logo.png'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        })
    ]
}