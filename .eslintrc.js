module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    env: {
        browser: true,
        es2021: true,
        node: true
    },

    extends: [
        'plugin:@typescript-eslint/recommended',
        'standard',
        'plugin:react/all'

    ],
    plugins: [
        '@typescript-eslint',
        'react',
        'sort-imports-es6-autofix'
    ],
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
        'sort-imports-es6-autofix/sort-imports-es6': ['error', {
            ignoreCase: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['single', 'multiple', 'all', 'none'],
        }],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-filename-extension': 'off',
        'react/jsx-no-literals': 'off',
        'react/jsx-no-bind': 'off',
        'react/sort-comp': 'off',
        'react/jsx-closing-tag-location': 'off',
        'react/require-optimization': 'off',
        'react/style-prop-object': 'off',
        'react/jsx-max-depth': ['error', { max: 6 }],
        'react/jsx-closing-bracket-location': 'off',
        'react/prefer-stateless-function': 'off',
        'react/jsx-sort-props': 'off',
        'react/jsx-indent-props': 'off',
        'react/no-array-index-key': 'off',
        'react/button-has-type': 'off',
        'react/jsx-child-element-spacing': 'off',
        'react/destructuring-assignment': 'off',
        'react/no-direct-mutation-state': 'off',
        '@typescript-eslint/no-empty-function': 'off'
    },
    overrides: [
        {
            files: ['*.jsx', '*.js', '*.tsx', '*.ts']
        }
    ]
};
