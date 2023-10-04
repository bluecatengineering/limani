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

import { SimplePage } from '../src/pageLayout';
import { rest } from 'msw';
import './SimplePage.stories.less';

const platformMockValue = {
    /* eslint-disable camelcase, max-len */
    platform: {
        header_logo_path:
            'https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_1280.jpg',
        language: 'en',
    },
    user: {
        bam_info: {
            alias: 'BAM-9.5.0',
            url: '#',
        },
        help_links: {
            custom: [
                {
                    id: 'custom-gw-guide',
                    title: 'Gateway custom guide',
                    url: '#',
                },
            ],
            platform: [
                {
                    id: 'gw-admin-guide',
                    title: 'Gateway administration guide',
                    url: '#',
                },
                {
                    id: 'gw-admin-guide-2',
                    title: 'Gateway administration guide 2',
                    url: '#',
                },
            ],
        },
        home_url: '#',
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
        permissions: {
            download_logs: true,
        },
        user_type: 'user_type',
        username: 'username',
    },
    isFetchingData: false,
    triggerFetchData: () => {},
    /* eslint-enable camelcase, max-len */
};

export default {
    title: 'Components/SimplePage',
    component: SimplePage,
    parameters: {
        msw: [
            rest.get('/-/v3/navbar/data', (_req, res, ctx) => {
                return res(ctx.json(platformMockValue));
            }),
        ],
    },
};

//description
/**
 * SimplePage is a component to display a page template containing the header,
 * navbar, and page contents. <br/>
 * It also handles theme changes, based on its value from Platform Data
 * for UI theme. <br/>
 * Note that for theme change feature to work as expected,
 * it requires Gateway >= 23.3.0 <br/>
 * This component is intended to nest a page's contents inside of the
 * `children` property.
 */
export const Normal = {
    args: {
        pageTitle: 'Page Title',
        appTitle: 'App Title',
        children: (
            <div style={{ height: 'auto' }}>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec hendrerit rutrum orci, in varius lacus semper in.
                    Donec facilisis imperdiet risus, suscipit ultrices dui
                    scelerisque ut. Suspendisse nec urna felis. Etiam libero
                    tellus, pharetra nec dapibus sed, dignissim ut lectus.
                    Vestibulum ante ipsum primis in faucibus orci luctus et
                    ultrices posuere cubilia curae;
                </div>
                <br />
                <div style={{ fontSize: '12px' }}>
                    Nunc at efficitur ligula, id sollicitudin enim. Proin tempus
                    odio blandit, mollis leo non, suscipit urna. Nulla rutrum ex
                    eu aliquet ullamcorper. Aliquam sollicitudin, tortor ac
                    faucibus ullamcorper, urna arcu tincidunt diam, a vestibulum
                    dui quam ac urna.
                </div>
            </div>
        ),
        onLanguageChange: null,
    },
    decorators: [
        (Story) => (
            <div style={{ height: '250px' }}>
                <Story />
            </div>
        ),
    ],
};
