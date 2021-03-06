const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'source-map',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|gif|jpg|cur|svg)$/i,
                loader: 'url-loader', options: { limit: 8192 }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            inject: true
        }),
        new webpack.DefinePlugin({
            API_URL: JSON.stringify(process.env.API_URL || 'http://localhost:3000/api'),
            REDIRECT_URL: JSON.stringify(process.env.REDIRECT_URL || 'http://localhost:8080'),
            PERMITTED_POST_MESSAGE_ORIGINS: JSON.stringify(process.env.PERMITTED_POST_MESSAGE_ORIGINS || ['http://localhost:8080', 'http://localhost:8082'])
        }),
        new CopyPlugin([
            { from: 'src/static/robots.txt', to: 'robots.txt'}
        ])
    ],
    mode: 'development',
    devServer: {
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || 8080,
        historyApiFallback: true,
    }
};
