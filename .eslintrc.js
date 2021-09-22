module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'standard',
        'plugin:react/recommended'
    ],
    plugins: ['react'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        indent: ['error', 4],
        semi: [2, 'always'],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/jsx-indent': ['error', 4]
    },
    overrides: [
        {
            files: ["*.jsx", "*.js"]
        }
    ],

};
