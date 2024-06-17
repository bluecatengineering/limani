/*
Copyright 2024 BlueCat Networks Inc.

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

import { shallow } from 'enzyme';
import React from 'react';
import DropdownMenu from '../../src/components/DropdownMenu';
import setLanguage from '../../src/functions/setLanguage';

global.document = { body: 'body' };

jest.unmock('../../src/components/DropdownMenu');

const mockUsePageModalSpinner = {
    setBusy: jest.fn(),
};
jest.mock('../../src/components/usePageModalSpinner', () =>
    jest.fn(() => {
        return mockUsePageModalSpinner;
    }),
);

const mockAddErrorMessage = {
    addErrorMessage: jest.fn(),
};
jest.mock('../../src/components/usePageMessages', () =>
    jest.fn(() => {
        return mockAddErrorMessage;
    }),
);

const mockUseMenuHandler = {
    expanded: true,
    buttonProps: {
        onKeyDown: jest.fn(),
        onClick: jest.fn(),
    },
    menuProps: {
        onKeyDown: jest.fn(),
        onClick: jest.fn(),
    },
    guardProps: {},
};
jest.mock(
    '../../node_modules/@bluecateng/pelagos/dist/hooks/useMenuHandler',
    () =>
        jest.fn(() => {
            return mockUseMenuHandler;
        }),
);
const dropdownMenuMockDefaultValue = {
    /* eslint-disable camelcase */
    dropdown_menu: [
        {
            text: 'Go to API document',
            url: '/example_go_api_documents_by_help_links',
        },
    ],
};

const mockDoGet = {
    doGet: jest.fn(() =>
        Promise.resolve({ data: dropdownMenuMockDefaultValue }),
    ),
};
jest.mock('../../src/functions/fetchFunctions', () =>
    jest.fn(() => {
        return mockDoGet;
    }),
);

const dropdownMenuMockValue = [
    {
        text: 'Go to custom page',
        onClick: jest.fn(),
    },
];

describe('DropdownMenu', () => {
    describe('Rendering', () => {
        it('Render the DropdownMenu component default props', () => {
            const wrapper = shallow(<DropdownMenu />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render the DropdownMenu component with all props', () => {
            const wrapper = shallow(
                <DropdownMenu
                    id='test-id'
                    className='test_cn'
                    tooltipText='test-tooltip'
                    tooltipPlacement='left'
                    size='left'
                    type='tertiary'
                    flipped
                    customValues={dropdownMenuMockValue}
                />,
            );
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render the DropdownMenu component with pseudo translated text', () => {
            //Required for usePageMessages()
            setLanguage('zz').finally(() => {
                const wrapper = shallow(
                    <DropdownMenu
                        id='test-id'
                        className='test_cn'
                        tooltipText='test-tooltip'
                        tooltipPlacement='left'
                        size='left'
                        type='tertiary'
                        flipped
                        customValues={dropdownMenuMockValue}
                    />,
                );
                expect(wrapper.getElement()).toMatchSnapshot();
            });
        });
    });
});
