const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    title:"Panco",
    template:"./src/index.ejs"
});

module.exports = {
    entry: "./src/js/main.js",
    output: {
        path:path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module:{
        rules:[
            {test: /\.js$/, use: ["babel-loader"], exclude: path.resolve(__dirname, "node_modules") },
            {test: /\.css$/, use: ["style-loader","css-loader"], exclude: path.resolve(__dirname, "node_modules")}
        ]
    },
    plugins:[
        HtmlWebpackPluginConfig,
        new webpack.optimize.UglifyJsPlugin()
    ]
}