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
import HeaderAuthentication from '../../src/header/HeaderAuthentication';

jest.unmock('../../src/header/HeaderAuthentication');

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
            authentication_info: null,
        },
    },
};
jest.mock('../../src/hooks/usePlatformData', () => {
    const mockValue = jest.fn();
    const mockUsePlatformData = jest.fn(() => mockValue);
    mockUsePlatformData.mockImplementation(() => mockValue);
    return mockUsePlatformData;
});
const mockUsePlatformData = require('../../src/hooks/usePlatformData');
mockUsePlatformData.mockReturnValueOnce({ ...mockMicetro });
mockUsePlatformData.mockReturnValueOnce({ ...mockStandalone });
mockUsePlatformData.mockReturnValue({ ...mockBAM });

describe('HeaderAuthentication', () => {
    describe('Rendering', () => {
        it('Render HeaderAuthentication component with Micetro authentication', () => {
            const wrapper = shallow(<HeaderAuthentication />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render HeaderAuthentication component with Standalone authentication', () => {
            const wrapper = shallow(<HeaderAuthentication />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render HeaderAuthentication component with BAM authentication and default props', () => {
            const wrapper = shallow(<HeaderAuthentication />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render HeaderAuthentication component with BAM authentication and props', () => {
            const wrapper = shallow(
                <HeaderAuthentication className='varClassName' />,
            );
            expect(wrapper.getElement()).toMatchSnapshot();
        });
    });
});
