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

import React from 'react';

import usePlatformData from '../../src/hooks/usePlatformData';
import { shallow } from 'enzyme';
import PageToolkit from '../../src/components/PageToolkit';
import ThemeSwitch from '../../src/components/ThemeSwitch';

const mockUsePlatformDataValue = {
    data: jest.fn(),
    isFetchingData: false,
    triggerFetchData: jest.fn(),
};

jest.mock('../../src/hooks/usePlatformData', () =>
    jest.fn(() => {
        return mockUsePlatformDataValue;
    }),
);

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: (f) => f(),
}));

global.document = { documentElement: { dataset: { theme: 'default' } } };

describe('PageToolkit with ThemeSwitch', () => {
    describe('Rendering', () => {
        it('Render PageToolkit component to verify ThemeSwitch Component', () => {
            const wrapper = shallow(<PageToolkit />);
            expect(wrapper.find('ThemeSwitch').exists()).toBe(true);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render ThemeSwitch component to verify default', () => {
            usePlatformData.mockReturnValue({
                data: {
                    platform: {},
                },
                isFetchingData: false,
                triggerFetchData: jest.fn(),
            });
            const wrapper = shallow(<ThemeSwitch />);
            expect(wrapper.getElement()).toMatchSnapshot();
            expect(document.documentElement.dataset.theme).toBe('default');
        });

        it('Render ThemeSwitch component to test light theme', () => {
            usePlatformData.mockReturnValue({
                data: {
                    platform: {
                        ui_theme: 'standard_light_theme',
                    },
                },
                isFetchingData: false,
                triggerFetchData: jest.fn(),
            });
            const wrapper = shallow(<ThemeSwitch />);
            expect(wrapper.getElement()).toMatchSnapshot();
            expect(document.documentElement.dataset.theme).toBe('light');
        });

        it('Render ThemeSwitch component to test dark theme', () => {
            usePlatformData.mockReturnValue({
                data: {
                    platform: {
                        ui_theme: 'original_dark_theme',
                    },
                },
                isFetchingData: false,
                triggerFetchData: jest.fn(),
            });
            const wrapper = shallow(<ThemeSwitch />);
            expect(wrapper.getElement()).toMatchSnapshot();
            expect(document.documentElement.dataset.theme).toBe('dark');
        });
    });
});
