module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-trailing-spaces': ['error', {
            'ignoreComments': true
        }],
        'no-useless-escape': 'off',
        'brace-style': ['error', 'stroustrup'],
        'space-before-function-paren': ['error', 'never'],
        'keyword-spacing': 'off',
        'semi': 'off',
        'indent': ['error', 4, {
            'SwitchCase': 1 // 1 * 4
        }]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
