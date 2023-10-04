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

import { shallow } from 'enzyme';
import FileDisplay from '../../src/components/FileDisplay';

describe('FileDisplay', () => {
    describe('Rendering', () => {
        it('Render FileDisplay with default props', () => {
            const wrapper = shallow(<FileDisplay />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render FileDisplay with props, but without onDelete', () => {
            const wrapper = shallow(
                <FileDisplay
                    id='test-id-for-file-display'
                    className='test-class-A test-class-B'
                    fileName='test-file-name'
                    disabled={false}
                />,
            );
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render FileDisplay with props, including onDelete, but no tooltip', () => {
            const wrapper = shallow(
                <FileDisplay
                    id='test-id-for-file-display'
                    className='test-class-A test-class-B'
                    fileName='test-file-name'
                    disabled={false}
                    onDelete={() => {}}
                />,
            );
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render FileDisplay with props, including onDelete and tooltip', () => {
            const wrapper = shallow(
                <FileDisplay
                    id='test-id-for-file-display'
                    className='test-class-A test-class-B'
                    fileName='test-file-name'
                    disabled={true}
                    onDelete={() => {}}
                    deleteTooltipText='test-tooltip-for-delete-button'
                />,
            );
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render FileDisplay with props, including onDownload and no tooltip', () => {
            const wrapper = shallow(
                <FileDisplay
                    id='test-id-for-file-display'
                    className='test-class-A test-class-B'
                    fileName='test-file-name'
                    disabled={true}
                    onDownload={() => {}}
                />,
            );
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render FileDisplay with props, including onDownload and tooltip', () => {
            const wrapper = shallow(
                <FileDisplay
                    id='test-id-for-file-display'
                    className='test-class-A test-class-B'
                    fileName='test-file-name'
                    disabled={true}
                    onDownload={() => {}}
                    downloadTooltipText='test-tooltip-for-download-button'
                />,
            );
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render FileDisplay with all props', () => {
            const wrapper = shallow(
                <FileDisplay
                    id='test-id-for-file-display'
                    className='test-class-A test-class-B'
                    fileName='test-file-name'
                    disabled={true}
                    onDelete={() => {}}
                    deleteTooltipText='test-tooltip-for-delete-button'
                    onDownload={() => {}}
                    downloadTooltipText='test-tooltip-for-download-button'
                />,
            );
            expect(wrapper.getElement()).toMatchSnapshot();
        });
    });
});
