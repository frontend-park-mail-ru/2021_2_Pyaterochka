const path = require('path');

module.exports = {
    mode: process.env.PRODUCTION ? 'production' : 'development',
    entry: {
        index: './src/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: '[name].compiled.js'
    },

    resolve: {
        modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'modules'), 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },

    module: {
        rules: [
            {
                test: /(.tsx)|(.ts)|(.js)|(.jsx)/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-typescript'
                        ],
                        plugins: [
                            '@babel/plugin-syntax-jsx',
                            [
                                '@babel/plugin-transform-react-jsx',
                                {
                                    throwIfNamespace: false,
                                    runtime: 'automatic',
                                    importSource: 'irbis'
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'style-loader',
                        options: { injectType: 'singletonStyleTag' }
                    },
                    {
                        loader: 'css-loader',
                        options: { url: false }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'style-loader',
                        options: { injectType: 'singletonStyleTag' }
                    },
                    {
                        loader: 'css-loader',
                        options: { url: false }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass')
                        }
                    }
                ]
            }
        ]
    }

};
