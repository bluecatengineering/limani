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
import { Form } from '@bluecateng/auto-forms';
import { t } from '@bluecateng/l10n.macro';
import { FormButtons } from '/src';

export default {
    title: 'Components/FormButtons',
    component: FormButtons,
    args: {
        cancelButtonLabel: t`Cancel`,
        saveButtonLabel: t`Save`,
        childrenPosition: 'end',
    },
};

export const Normal = {
    render: (args) => (
        <Form initialValues={{}} rules={{}} onSubmit={() => {}}>
            <FormButtons {...args} />
        </Form>
    ),
    args: {
        className: 'TestButton',
        childrenPosition: 'start',
    },
};
