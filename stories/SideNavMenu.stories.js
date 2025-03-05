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
import PlatformDataContext from '../src/components/PlatformDataContext';
import SideNavMenu from '../src/sideNav/SideNavMenu';
import SideNavContext from '../src/sideNav/SideNavContext';

const mockDataValue = {
    data: {
        user: {
            // eslint-disable-next-line camelcase
            nav_links: [
                {
                    'title': 'Administration',
                    'href': null,
                    'children': [
                        {
                            'title': 'Workflow management',
                            'href': '/admin/workflow_export_import',
                            'children': [],
                        },
                        {
                            'title': 'Create workflow',
                            'href': '/create_workflow/page',
                            'children': [],
                        },
                    ],
                },
            ],
        },
    },
};

const mockExpanded = {
    isExpanded: true,
};

export default {
    title: 'Components/SideNavMenu',
    component: SideNavMenu,
};

export const Normal = {
    args: {
        className: 'TestSideNav',
    },
    decorators: [
        (Story) => (
            <div style={{ transform: 'translate3d(0,0,0)', height: 300 }}>
                <PlatformDataContext.Provider value={mockDataValue}>
                    <SideNavContext.Provider value={mockExpanded}>
                        <Story />
                    </SideNavContext.Provider>
                </PlatformDataContext.Provider>
            </div>
        ),
    ],
};
