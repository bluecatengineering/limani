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

import { shallow } from 'enzyme';
import { SidePanel } from '../../src';

global.document = { body: 'body' };

describe('SidePanel', () => {
    const componentId = 'SidePanel';

    describe('Rendering', () => {
        it('Render SidePanel component when not expanded', () => {
            const wrapper = shallow(
                <SidePanel
                    id={componentId}
                    expanded={false}
                    title='Test title'
                    onClose={jest.fn()}>
                    <h1>Test child</h1>
                </SidePanel>,
            );
            expect(
                wrapper.find(`#${componentId}`).props()['aria-expanded'],
            ).toBe(false);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render SidePanel component with children as a prop', () => {
            const wrapper = shallow(
                <SidePanel
                    id={componentId}
                    expanded={true}
                    title='Test title'
                    zIndex={2}
                    top={50}
                    onClose={jest.fn()}
                    children={<h1>Test child</h1>}
                />,
            );
            expect(
                wrapper.find(`#${componentId}`).props()['aria-expanded'],
            ).toBe(true);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render SidePanel component when expanded and show its content', () => {
            const wrapper = shallow(
                <SidePanel
                    id={componentId}
                    expanded={true}
                    title='Test title'
                    onClose={jest.fn()}>
                    <h1 id='content'>Test child</h1>
                </SidePanel>,
            );
            expect(wrapper.find(`#${componentId}`).prop('aria-expanded')).toBe(
                true,
            );
            expect(wrapper.find('#sidePanelTitle').text()).toBe('Test title');
            expect(wrapper.find('#content').text()).toBe('Test child');
            expect(wrapper.getElement()).toMatchSnapshot();
        });
    });
});
