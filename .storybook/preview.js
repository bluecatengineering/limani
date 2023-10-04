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
import './preview.less';
import { initialize, mswDecorator } from 'msw-storybook-addon';

// Initialize MSW
initialize();

const setTheme = (theme) => (
    sessionStorage.setItem('theme', theme),
    (document.documentElement.dataset.theme = theme)
);

// Mock the clientWidth value, this is because storybook renders the components in an isolated environment
// which may not have access to the actual HTML document object
Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    value: '100%',
});

export default {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        options: {
            storySort: {
                order: ['Welcome', 'Components'],
            },
        },
    },

    globalTypes: {
        theme: {
            name: 'Theme',
            description: 'Preview theme',
            defaultValue: 'cg00',
            toolbar: {
                icon: 'photo',
                items: [
                    { value: 'white', title: 'White' },
                    { value: 'cg00', title: 'Cool Gray 00' },
                    { value: 'yg100', title: 'Cyan Gray 100' },
                    { value: 'g100', title: 'Gray 100' },
                ],
            },
        },
    },

    decorators: [
        mswDecorator,
        (Story, { globals: { theme } }) => (
            setTheme(theme),
            (
                <div id='root' style={{ width: '100%' }}>
                    <Story />
                </div>
            )
        ),
    ],
};
