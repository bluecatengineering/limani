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

import SimplePage from '../../src/pageLayout/SimplePage';
import React from 'react';

import { shallow } from 'enzyme';
import { PageContent, PageToolkit } from '../../src';

jest.unmock('../../src/pageLayout/SimplePage');

describe('SimplePage', () => {
    describe('Rendering', () => {
        it('Render SimplePage component with default props', () => {
            const wrapper = shallow(<SimplePage />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render SimplePage component with children', () => {
            const wrapper = shallow(
                <SimplePage>
                    <h1>Test Child</h1>
                </SimplePage>,
            );
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render SimplePage component with children as argument', () => {
            const wrapper = shallow(
                <SimplePage children={<h1>Test Child</h1>} />,
            );
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render SimplePage component with title', () => {
            const wrapper = shallow(<SimplePage pageTitle='Custom Title' />);
            const childTestFunction = wrapper
                .find(PageContent)
                .prop('pageTitle');
            expect(childTestFunction).toEqual('Custom Title');
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render SimplePage component with title and children', () => {
            const wrapper = shallow(
                <SimplePage
                    pageTitle='Custom Title'
                    children={<h1>My Children</h1>}
                />,
            );
            const childTestTitle = wrapper.find(PageContent).prop('pageTitle');
            const childTestChildren = wrapper
                .find(PageContent)
                .prop('children');
            expect(childTestTitle).toEqual('Custom Title');
            expect(childTestChildren).toEqual(<h1>My Children</h1>);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render SimplePage component with onLanguageChange Function', () => {
            const mockTestFn = jest.fn();
            const wrapper = shallow(
                <SimplePage onLanguageChange={mockTestFn} />,
            );
            const childTestFunction = wrapper
                .find(PageToolkit)
                .prop('onLanguageChange');
            expect(childTestFunction).toEqual(mockTestFn);
            expect(wrapper.getElement()).toMatchSnapshot();
        });
    });
});
