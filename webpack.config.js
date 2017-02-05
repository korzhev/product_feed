const webpack = require('webpack');
const path = require('path');

const sourcePath = path.join(__dirname, './front/src');
const staticsPath = path.join(__dirname, './front/static');

module.exports = function () {
    const plugins = [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ];

    return {
        devtool: 'source-map',
        context: sourcePath,
        entry: {
            source: './app.jsx',
        },
        output: {
            path: staticsPath,
            filename: 'bundle.js',
            publicPath: '/static/',
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'file-loader',
                        query: {
                            name: '[name].[ext]',
                        },
                    },
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader',
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
            modules: [
                path.resolve(__dirname, 'node_modules'),
                sourcePath,
            ],
        },

        plugins,

        stats: {
            colors: {
                green: '\u001b[32m',
            },
        },

        devServer: {
            contentBase: './front/src',
            historyApiFallback: true,
            port: 8000,
            inline: true,
            hot: true,
            proxy: [{
                path: '/api/',
                target: 'http://localhost:3000',
            }],
            stats: {
                assets: true,
                children: false,
                chunks: false,
                hash: false,
                modules: false,
                publicPath: false,
                timings: true,
                version: false,
                warnings: true,
                colors: {
                    green: '\u001b[32m',
                },
            },
        },
    };
};
