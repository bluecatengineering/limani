/*
Copyright 2023-2025 BlueCat Networks Inc.

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
import SideMenu from '../../src/sideNav/SideMenu';

jest.unmock('../../src/sideNav/SideMenu');

jest.mock('../../src/hooks/usePlatformData', () =>
    jest.fn(() => {
        return {
            data: {
                user: {
                    home_url: '/landing_page',
                    nav_links: {
                        custom_workflows: [
                            {
                                'title': 'Custom workflow',
                                'href': '/custom_workflow/page',
                                'children': [],
                            },
                        ],
                        default_workflows: [
                            {
                                'title': 'Workflow management',
                                'href': '/admin/workflow_export_import',
                                'children': [],
                            },
                        ],
                    },
                },
            },
        };
    }),
);

Object.defineProperty(window, 'location', {
    value: {
        pathname: '',
    },
});

describe('SideMenu', () => {
    describe('Rendering', () => {
        it('Render SideMenu component with default', () => {
            sessionStorage.getItem.mockReturnValueOnce(null);
            sessionStorage.getItem.mockReturnValueOnce(null);
            const wrapper = shallow(<SideMenu />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render SideMenu component active highlight', () => {
            window.location.pathname = '/admin/workflow_export_import';
            sessionStorage.getItem.mockReturnValueOnce(null);
            sessionStorage.getItem.mockReturnValueOnce(null);
            const wrapper = shallow(<SideMenu />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });
    });
});
