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
import HeaderSystemMenu from '../../src/header/HeaderSystemMenu';
import setLanguage from '../../src/functions/setLanguage';
import { useMenuHandler } from '@bluecateng/pelagos';

jest.unmock('../../src/header/HeaderSystemMenu');

jest.mock('../../src/hooks/usePlatformData', () =>
    jest
        .fn()
        .mockReturnValueOnce({
            data: {
                user: {
                    permissions: { download_logs: false, view_logs: false },
                },
            },
        })
        .mockReturnValueOnce({
            data: {
                user: { permissions: { download_logs: true, view_logs: true } },
            },
        })
        .mockReturnValueOnce({
            data: {
                user: { permissions: { download_logs: true, view_logs: true } },
            },
        })
        .mockReturnValueOnce({
            data: {
                user: { permissions: { download_logs: true, view_logs: true } },
            },
        })
        .mockReturnValueOnce({
            data: {
                user: { permissions: { download_logs: true, view_logs: true } },
            },
        }),
);

jest.mock('@bluecateng/pelagos');

describe('HeaderSystemMenu', () => {
    describe('Rendering', () => {
        it('Render HeaderSystemMenu component with default props', () => {
            useMenuHandler.mockReturnValueOnce({
                expanded: true,
                buttonProps: null,
                menuProps: null,
                guardProps: null,
            });
            const wrapper = shallow(<HeaderSystemMenu />);
            expect(wrapper.getElement()).toMatchSnapshot();
        });

        it('Render HeaderSystemMenu component with props', () => {
            useMenuHandler.mockReturnValueOnce({
                expanded: false,
                buttonProps: { onClick: () => {}, onKeyDown: () => {} },
                menuProps: null,
                guardProps: null,
            });
            const wrapper = shallow(
                <HeaderSystemMenu className='customSystemMenu' />,
            );
            expect(wrapper.getElement()).toMatchSnapshot();
        });
        it('Render HeaderSystemMenu component with pseudo translated text', () => {
            useMenuHandler.mockReturnValueOnce({
                expanded: false,
                buttonProps: { onClick: () => {}, onKeyDown: () => {} },
                menuProps: null,
                guardProps: null,
            });
            setLanguage('zz').finally(() => {
                const wrapper = shallow(
                    <HeaderSystemMenu className='customSystemMenu' />,
                );
                expect(wrapper.getElement()).toMatchSnapshot();
            });
        });
        it('Test the view logs click functionality', () => {
            // Mock the current window location
            const mockWindow = jest.fn();
            global.window.location = { replace: mockWindow };

            // Mock the system menu button's menu handler
            useMenuHandler.mockReturnValueOnce({
                expanded: true,
                buttonProps: null,
                menuProps: null,
                guardProps: null,
            });
            // Render the HeaderSystemMenu element
            const wrapper = shallow(
                <HeaderSystemMenu className='customSystemMenu' />,
            );

            // Click the view logs menu option
            wrapper.find('#systemMenu-vw_logs').simulate('click');

            // Check redirect to view_logs URL
            expect(mockWindow).toHaveBeenCalledWith('/admin/view_logs');
        });
        it('Test the download all logs click functionality', () => {
            // Mock the opening of a new window
            const mockWindowOpen = jest
                .fn()
                .mockReturnValue({ focus: jest.fn() });
            global.window.open = mockWindowOpen;

            // Mock the system menu button's menu handler
            useMenuHandler.mockReturnValueOnce({
                expanded: true,
                buttonProps: null,
                menuProps: null,
                guardProps: null,
            });
            // Render the HeaderSystemMenu element
            const wrapper = shallow(
                <HeaderSystemMenu className='customSystemMenu' />,
            );
            // Click the download all logs button
            wrapper.find('#systemMenu-dl_logs').simulate('click');

            // Check a new window was opened and redirected to download logs URL
            expect(mockWindowOpen).toHaveBeenCalledWith(
                '/admin/logs/download',
                '_blank',
            );
            // Check download all logs window was put into focus
            expect(mockWindowOpen().focus).toHaveBeenCalled();
        });
    });
});
