module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'standard',
        'plugin:react/all'
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
        'react/jsx-indent': ['error', 4],
        'react/jsx-no-literals': 'warn',
        'react/jsx-no-bind': 'off',
        'react/sort-comp': 'off',
        'react/jsx-closing-tag-location': 'off',
        'react/require-optimization': 'off',
        'react/style-prop-object': 'off',
        'react/jsx-max-depth': ['error', { "max": 6 }],
        'react/jsx-closing-bracket-location': 'off',
        'react/prefer-stateless-function': 'off',
        'react/jsx-sort-props': 'off',
        'react/jsx-indent-props': 'off',
        'react/no-array-index-key': 'off',
        'react/button-has-type': 'off',
        'react/jsx-child-element-spacing': 'off',
        'react/destructuring-assignment': 'off',
        'react/no-direct-mutation-state': 'off'
    },
    overrides: [
        {
            files: ['*.jsx', '*.js']
        }
    ]
};
