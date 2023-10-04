// eslint-disable-next-line max-len
/*
Copyright 2023 BlueCat Networks Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// eslint-disable-next-line
module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true,
    },
    'extends': ['eslint:recommended', 'plugin:react/recommended'],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        },
        'ecmaVersion': 12,
        'sourceType': 'module',
    },
    'ignorePatterns': [
        '__tests__/**',
        '__mocks__/**',
        'jest-helpers/setup-globals.js',
    ],
    'rules': {
        // enable additional rules
        'indent': ['off'], // prettier
        'no-tabs': ['off'], // prettier
        'brace-style': ['off'], // prettier
        'quotes': ['off'], // prettier
        'spaced-comment': ['off'], // prettier
        'no-trailing-spaces': ['off'], // prettier
        'max-len': ['error', { 'code': 80 }],
        'camelcase': ['error'],
        'linebreak-style': ['error', 'unix'],
        'semi': ['error', 'always'],
        'curly': ['error'],
        'eqeqeq': ['error'],
        'no-eval': ['error'],
        'no-var': ['error'],
        'react/react-in-jsx-scope': ['off'],
        'react/prop-types': ['off'],
        'prefer-const': ['error'],
    },
};
