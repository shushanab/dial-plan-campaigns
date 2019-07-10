const path = require('path');
const webpack = require('webpack');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

const srcPath = path.resolve(__dirname, './src/');

module.exports = {
    lintOnSave: undefined,
    productionSourceMap: false,

    pages: {
        index: {
            entry: 'src/dev/main.js',

            template: 'public/index.html',

            filename: 'index.html',

            title: 'Component development'
        }
    },
    configureWebpack: {
        resolve: {
            plugins: [
                new DirectoryNamedWebpackPlugin(true)
            ],
            modules: [
                srcPath
            ]
        },
        plugins: [
            new webpack.DefinePlugin({})
        ]
    },
    css: {
        loaderOptions: {
            stylus: {
                use: [],
                preferPathResolver: 'webpack'
            }
        }
    }
}
