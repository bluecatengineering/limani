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
import SideNavMenu from '../../src/sideNav/SideNavMenu';
import useSideNav from '../../src/sideNav/useSideNav';

jest.unmock('../../src/sideNav/SideNavMenu');

jest.mock('../../src/hooks/usePlatformData', () =>
    jest.fn(() => {
        return {
            data: {
                user: {
                    nav_links: [
                        {
                            'title': 'Administration',
                            'href': null,
                            'children': [
                                {
                                    'title': 'Workflow Management',
                                    'href': '/admin/workflow_export_import',
                                    'children': [],
                                },
                                {
                                    'title': 'Create Workflow',
                                    'href': '/create_workflow/page',
                                    'children': [],
                                },
                            ],
                        },
                    ],
                },
            },
        };
    }),
);

const anyFunction = expect.any(Function);

const mockUseSideNav = {
    isExpanded: true,
    setExpanded: jest.fn(),
};
jest.mock('../../src/sideNav/useSideNav', () =>
    jest.fn(() => {
        return mockUseSideNav;
    }),
);

Object.defineProperty(window, 'location', {
    value: {
        pathname: '',
    },
});

describe('SideNavMenu', () => {
    describe('Rendering', () => {
        it('Render SideNavMenu component with menu open', () => {
            sessionStorage.getItem.mockReturnValueOnce(null);
            sessionStorage.getItem.mockReturnValueOnce(null);
            const wrapper = shallow(<SideNavMenu />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render SideNavMenu component with menu open and active highlight', () => {
            window.location.pathname = '/admin/workflow_export_import';
            sessionStorage.getItem.mockReturnValueOnce(null);
            sessionStorage.getItem.mockReturnValueOnce(null);
            const wrapper = shallow(<SideNavMenu />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render SideNavMenu component with menu closed', () => {
            sessionStorage.getItem.mockReturnValueOnce(null);
            sessionStorage.getItem.mockReturnValueOnce(null);
            useSideNav.mockReturnValue({
                isExpanded: false,
                setExpanded: jest.fn(),
            });
            const wrapper = shallow(<SideNavMenu />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render SideNavMenu component with menu closed without nav context', () => {
            sessionStorage.getItem.mockReturnValueOnce(null);
            sessionStorage.getItem.mockReturnValueOnce(null);
            const wrapper = shallow(<SideNavMenu />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });
    });
});
