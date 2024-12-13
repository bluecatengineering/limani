/*
Copyright 2023-2024 BlueCat Networks Inc.

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
import React from 'react';
import PlatformDataContext from '../src/components/PlatformDataContext';
import HeaderSystemMenu from '../src/header/HeaderSystemMenu';

const mockValue = {
    data: {
        user: {
            permissions: {
                /* eslint-disable camelcase */
                download_logs: true,
                view_logs: true,
                /* eslint-enable camelcase */
            },
        },
    },
};

export default {
    title: 'Components/HeaderSystemMenu',
    component: HeaderSystemMenu,
};

export const Normal = {
    args: {
        className: 'TestSystemMenu',
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    width: 'fit-content',
                    backgroundColor: 'var(--background)',
                }}>
                <PlatformDataContext.Provider value={mockValue}>
                    <Story />
                </PlatformDataContext.Provider>
            </div>
        ),
    ],
};
