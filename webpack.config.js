const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './public/src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: '[name].compiled.js'
    },

    resolve: {
        modules: [path.resolve(__dirname, 'public/src'), 'node_modules'],
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

                        ],
                        plugins: [
                            '@babel/plugin-syntax-jsx',
                            [
                                '@babel/plugin-transform-react-jsx',
                                {
                                    throwIfNamespace: false,
                                    runtime: 'automatic',
                                    importSource: 'modules'
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
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader'
                ]
            }
        ]
    }

};
