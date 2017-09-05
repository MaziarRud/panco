const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    title: "Panco",
    template: "./src/index.ejs"
});
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');


const isProd = process.env.NODE_ENV = 'production';
const cssDev = ['style-loader', {loader: 'css-loader', options: {importLoaders: 1}}, 'postcss-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [{loader: 'css-loader', options: {importLoaders: 1}}, 'postcss-loader', 'sass-loader'],
    publicPath: "../"
});

const cssConfig = isProd ? cssProd : cssDev;

const VENDORS = ['jquery'];

module.exports = {
    // context: path.resolve(__dirname, "panco"),
    entry: {
        main: './src/js/main.js',
        // vendors: VENDORS
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].[chunkhash].js",
        // publicPath: "../dist/"
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: path.resolve(__dirname, "node_modules")
            },
            {
                test: /\.s?css$/,
                use: cssConfig,
                exclude: path.resolve(__dirname, "node_modules")
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ['url-loader?name=images/[name].[ext]&limit=10000', 'image-webpack-loader'],
                exclude: path.resolve(__dirname, "node_modules")
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000&name=fonts/[name].[ext]',
                // exclude: path.resolve(__dirname, "node_modules")
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader?name=fonts/[name].[ext]',
                // exclude: path.resolve(__dirname, "node_modules")
            },

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
            // minimize: true
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "vendors",
        //     filename: 'js/commons[chunkhash].js'
        // }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html|css)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
}