const path = require('path')
const webpack = require('webpack')
const ExtractText = require('extract-text-webpack-plugin')
const HTMLTemplate = require('html-webpack-plugin')

module.exports = {
    entry: {
        bundle: './src/index',
        vendor: ['react', 'react-dom', 'firebase']
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[chunkhash:10].js'
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
                            localIdentName: '[hash:base64:5]'
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
        new ExtractText('[contenthash:10].css'),
        new HTMLTemplate({
            template: 'src/index.html',
            favicon: 'src/images/logo.png'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
}