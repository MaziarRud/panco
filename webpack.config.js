const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    title: "Panco",
    template: "./src/index.ejs"
});

const isProd = process.env.NODE_ENV = 'production';
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '../',
});

const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: path.resolve(__dirname, "node_modules")
            },
            {
                test: /\.css$/,
                use: cssConfig,
                exclude: path.resolve(__dirname, "node_modules")
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ['file-loader?name=images/[hash:12].[ext]','image-webpack-loader']
            }
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        // new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin({
            filename: 'css/[name].bundle.css',
            disable: !isProd,
            allChunks: true
        })
    ]
}