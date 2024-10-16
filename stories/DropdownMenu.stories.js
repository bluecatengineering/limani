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
import DropdownMenu from '../src/components/DropdownMenu';
import { rest } from 'msw';

const dropdownMenuMockValue = {
    /* eslint-disable camelcase, max-len */
    dropdown_menu: [
        {
            text: 'Go to API document',
            url: '/example_go_api_documents_by_help_links',
        },
        {
            text: 'Go to Gateway',
            url: '/example_go_to_gateway_page',
        },
        {
            text: 'Go to BAM',
            url: 'https://localhost:6007/example_go_to_bam_page',
        },
        {
            text: 'Download all logs',
            url: '/admin/logs/download',
        },
    ],
};

const dropdownMenuMockValue2 = {
    /* eslint-disable camelcase, max-len */
    dropdown_menu: [
        {
            text: 'Go to Custom page',
            url: '/example_go_to_custom_page',
        },
    ],
};

const customValues = [
    {
        text: 'Go to new page',
        onClick: function () {
            window
                .open('https://localhost:6006/example_go_to_new_page', '_blank')
                .focus();
        },
    },
    {
        text: 'Do an action or popup',
        onClick: function () {
            window.alert('Do something');
        },
    },
];

export default {
    title: 'Components/DropdownMenu',
    component: DropdownMenu,
    args: { size: 'medium', type: 'ghost', disabled: false },
    parameters: {
        msw: {
            handlers: [
                rest.get('/-/v3/dropdown_menu/data', (_req, res, ctx) => {
                    return res(ctx.json(dropdownMenuMockValue));
                }),
                rest.get('/-/custom_url', (_req, res, ctx) => {
                    return res(ctx.json(dropdownMenuMockValue2));
                }),
                rest.get('/-/failed_request', (_req, res, ctx) => {
                    return res(ctx.status(403));
                }),
            ],
        },
    },
};

export const Normal = {
    args: {
        className: 'TestDropdownMenu',
    },
};

export const CustomValues = {
    args: {
        className: 'TestDropdownMenu',
        customValues: customValues,
    },
};

export const CustomUrl = {
    args: {
        className: 'TestDropdownMenu',
        requestUrl: '/-/custom_url',
    },
};

export const failedRequest = {
    args: {
        className: 'TestDropdownMenu',
        requestUrl: '/-/failed_request',
    },
};

export const FullParameters = {
    args: {
        className: 'TestDropdownMenu',
        customValues: customValues,
        disabled: false,
        flipped: false,
        id: 'TestDropdownMenu',
        requestUrl: '/-/custom_url',
        size: 'large',
        tooltipPlacement: 'right',
        tooltipText: 'Custom dropdown menu with CustomUrl and customValues',
        type: 'tertiary',
    },
};
