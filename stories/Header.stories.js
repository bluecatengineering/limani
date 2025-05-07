/*
Copyright 2023-2024 BlueCat Networks Inc.

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
import Header from '../src/header/Header';
import PlatformDataContext from '../src/components/PlatformDataContext';
import PageContentShell from '../src/pageLayout/PageContentShell';
import './Header.stories.less';

const platformMockValue = {
    /* eslint-disable camelcase, max-len */
    data: {
        platform: {
            header_logo_path:
                'https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_1280.jpg',
            language: 'en',
            gateway_version: '25.2.1',
        },
        user: {
            authentication_info: {
                alias: 'BAM-9.5.0',
                url: '#',
                service: 'BAM',
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
            permissions: {
                download_logs: true,
                view_logs: true,
            },
            user_type: 'user_type',
            username: 'username',
        },
    },
    isFetchingData: false,
    triggerFetchData: () => {},
    /* eslint-enable camelcase */
};

export default {
    title: 'Components/Header',
    component: Header,
    decorators: [
        (Story) => {
            return (
                <div style={{ height: '300px' }}>
                    {/* // eslint-disable-next-line max-len */}
                    <PageContentShell className='PageContentShell--leftNavIsOpen--disabled'>
                        <PlatformDataContext.Provider value={platformMockValue}>
                            <Story />
                        </PlatformDataContext.Provider>
                    </PageContentShell>
                </div>
            );
        },
    ],
};

export const Normal = {
    args: {
        className: 'TestHeader',
    },
};
