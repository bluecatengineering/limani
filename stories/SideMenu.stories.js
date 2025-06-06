/*
Copyright 2025 BlueCat Networks Inc.

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
/* eslint-disable camelcase, max-len */

import React from 'react';
import PlatformDataContext from '../src/components/PlatformDataContext';
import SideMenu from '../src/sideNav/SideMenu';

const mockDataValue = {
    data: {
        user: {
            nav_links: [
                {
                    'title': 'Custom workflow',
                    'href': '/custom_workflow/page',
                    'children': [],
                    'is_default_workflow': false,
                },
                {
                    'title': 'Create a new workflow',
                    'href': '/create_workflow/page',
                    'children': [],
                    'is_default_workflow': true,
                },
                {
                    'title': 'Workflow management',
                    'href': '/admin/workflow_export_import',
                    'children': [],
                    'is_default_workflow': true,
                },
                {
                    'title': 'Configurations',
                    'children': [
                        {
                            'title': 'General configuration',
                            'href': '/admin/general_configuration',
                            'children': [],
                            'is_default_workflow': true,
                        },
                        {
                            'title': 'SSO configuration',
                            'href': '/admin/sso_configuration',
                            'children': [
                                {
                                    'title': 'SSO configuration1',
                                    'href': '/admin/sso_configuration1',
                                    'children': [],
                                    'is_default_workflow': true,
                                },
                            ],
                            'is_default_workflow': true,
                        },
                    ],
                    'is_default_workflow': true,
                },
            ],
        },
    },
};

export default {
    title: 'Components/SideMenu',
    component: SideMenu,
    parameters: {
        layout: 'fullscreen',
    },
};

export const Normal = {
    args: {
        className: 'TestSideNav',
    },
    decorators: [
        (Story) => (
            <div style={{ transform: 'translate3d(0,0,0)', height: '500px' }}>
                <PlatformDataContext.Provider value={mockDataValue}>
                    <Story />
                </PlatformDataContext.Provider>
            </div>
        ),
    ],
};
