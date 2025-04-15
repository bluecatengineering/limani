/* eslint-disable max-len */
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

import { t } from '@bluecateng/l10n.macro';
import DocumentWordProcessor from '@carbon/icons-react/es/DocumentWordProcessor';
import DocumentWordProcessorReference from '@carbon/icons-react/es/DocumentWordProcessorReference';
import Home from '@carbon/icons-react/es/Home';
import Settings from '@carbon/icons-react/es/Settings';

const Category = {
    Home: {
        buttonId: 'homeCategoryButton',
        title: t`Home`,
        icon: Home,
        href: '/home',
        tooltipText: t`User configured home page`,
    },
    Workflows: {
        buttonId: 'workflowsCategoryButton',
        title: t`Workflows`,
        icon: DocumentWordProcessor,
        href: '/',
        tooltipText: t`Quick access to default workflows`,
    },
    CustomWorkflows: {
        buttonId: 'customWorkflowsCategoryButton',
        title: t`Custom Workflows`,
        icon: DocumentWordProcessorReference,
        tooltipText: t`Custom workflows`,
    },
    Settings: {
        buttonId: 'settingsCategoryButton',
        title: t`Settings`,
        icon: Settings,
        tooltipText: t`Settings`,
    },
};

export default Category;
