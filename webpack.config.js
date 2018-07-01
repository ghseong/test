const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: SRC_DIR,
    entry: {
        main: './js/index.js',
    },
    output: {
        path: __dirname + '/build',
        filename: 'bundle.[name].js?[hash]'
    },
    devServer: {
        hot: true,
        filename: 'bundle.[name].js?[hash]',
        publicPath: '/',
        historyApiFallback: true,
        contentBase: './build',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: SRC_DIR,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                ['env']
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin(
            {
                inject: true,
                template: './static/index.html'
            }
        ),
        new CopyWebpackPlugin([
                {from: './static/index.html', to: '.'}
            ],
            {copyUnmodified: false}
        )
    ]
};