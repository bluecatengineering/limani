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
import PlatformDataContext from '../src/components/PlatformDataContext';
import HeaderAuthentication from '../src/header/HeaderAuthentication';

const mockBAM = {
    data: {
        user: {
            // eslint-disable-next-line camelcase
            authentication_info: {
                alias: 'BAM-9.5.0',
                url: '#',
                service: 'BAM',
            },
        },
    },
};

const mockMicetro = {
    data: {
        user: {
            // eslint-disable-next-line camelcase
            authentication_info: {
                alias: 'Micetro-10',
                url: '#',
                service: 'Micetro',
            },
        },
    },
};

const mockStandalone = {
    data: {
        user: {
            // eslint-disable-next-line camelcase
            authentication_info: {
                service: 'Standalone',
            },
        },
    },
};

export default {
    title: 'Components/HeaderAuthentication',
    component: HeaderAuthentication,
    decorators: [
        (Story) => (
            <div style={{ backgroundColor: 'var(--background)' }}>
                <PlatformDataContext.Provider value={mockBAM}>
                    <Story />
                </PlatformDataContext.Provider>
            </div>
        ),
    ],
    args: {
        className: 'TestHeaderAuthentication',
    },
};

export const BAMAuthentication = {
    decorators: [
        (Story) => (
            <PlatformDataContext.Provider value={mockBAM}>
                <Story />
            </PlatformDataContext.Provider>
        ),
    ],
};

export const MicetroAuthentication = {
    decorators: [
        (Story) => (
            <PlatformDataContext.Provider value={mockMicetro}>
                <Story />
            </PlatformDataContext.Provider>
        ),
    ],
};

export const StandaloneAuthentication = {
    decorators: [
        (Story) => (
            <PlatformDataContext.Provider value={mockStandalone}>
                <Story />
            </PlatformDataContext.Provider>
        ),
    ],
};
