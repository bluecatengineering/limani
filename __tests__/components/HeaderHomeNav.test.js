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

import { shallow } from 'enzyme';
import HeaderHomeNav from '../../src/header/HeaderHomeNav';
import usePlatformData from '../../src/hooks/usePlatformData';

jest.unmock('../../src/header/HeaderHomeNav');

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

const customPagePlatformData = {
    user: {
        home_url: 'custom/navigation',
    },
};

describe('HeaderHomeNav', () => {
    describe('Rendering', () => {
        it('Render HeaderHomeNav component with default props', () => {
            window.location = new URL('https://gateway-test.com');
            const wrapper = shallow(<HeaderHomeNav />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render HeaderHomeNav component with props', () => {
            window.location = new URL('https://gateway-test.com');
            const wrapper = shallow(<HeaderHomeNav className='varClassName' />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render HeaderHomeNav component with inactive Home', () => {
            window.location = new URL('https://gateway-test.com/subpage');
            const wrapper = shallow(<HeaderHomeNav className='varClassName' />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render HeaderHomeNav component with active Home', () => {
            window.location = new URL(
                'https://gateway-test.com/custom/navigation',
            );
            usePlatformData.mockReturnValue({
                data: customPagePlatformData,
                isFetchingData: false,
                triggerFetchData: jest.fn(),
            });
            const wrapper = shallow(<HeaderHomeNav className='varClassName' />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render HeaderHomeNav component with active Workflows', () => {
            window.location = new URL('https://gateway-test.com/index');
            usePlatformData.mockReturnValue({
                data: customPagePlatformData,
                isFetchingData: false,
                triggerFetchData: jest.fn(),
            });
            const wrapper = shallow(<HeaderHomeNav className='varClassName' />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });
    });
});
