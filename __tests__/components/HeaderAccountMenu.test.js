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
import HeaderAccountMenu from '../../src/header/HeaderAccountMenu';
import setLanguage from '../../src/functions/setLanguage';

jest.unmock('../../src/header/HeaderAccountMenu');

jest.mock('../../src/hooks/usePlatformData', () =>
    jest.fn(() => {
        return {
            data: {
                user: {
                    userName: 'varUsername',
                    userType: 'varUserType',
                },
            },
        };
    }),
);

describe('HeaderAccountMenu', () => {
    describe('Rendering', () => {
        it('Render HeaderAccountMenu component with default props', () => {
            const wrapper = shallow(<HeaderAccountMenu />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render HeaderAccountMenu component with props ', () => {
            const wrapper = shallow(
                <HeaderAccountMenu className='varClassName' />,
            );
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render HeaderAccountMenu component with pseudo translated text', () => {
            setLanguage('zz').finally(() => {
                const wrapper = shallow(<HeaderAccountMenu />);
                expect(wrapper.getElement()).toMatchSnapshot();
            });
        });
    });
});
