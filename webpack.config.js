const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    title: "Panco",
    template: "./src/index.ejs"
});
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');


const isProd = process.env.NODE_ENV = 'production';
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '../',
});

const cssConfig = isProd ? cssProd : cssDev;
const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
    entry: {
        main: './src/js/main.js',
        bootstrap: bootstrapConfig
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].[chunkhash].js"
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: cssConfig,
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ['url-loader?name=images/[name].[ext]&limit=10000', 'image-webpack-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(woff2?)$/,
                use: 'url-loader?limit=10000&name=fonts/[name].[ext]'
            },
            {
                test: /\.(ttf|eot)$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            },
            // Bootstrap 3
            {
                test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
                use: 'imports-loader?jQuery=jquery'
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
        }),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.ejs')),
            minimize: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}