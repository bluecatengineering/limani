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

import React from 'react';
import { shallow } from 'enzyme';
import SideNavMenuItem from '../../src/sideNav/SideNavMenuItem';
import { SideNavLink, SideNavMenu } from '@bluecateng/pelagos';

jest.mock('@bluecateng/pelagos', () => ({
    SideNavItems: jest.fn(({ children, className }) => (
        <div className={className}>{children}</div>
    )),
    SideNavLink: jest.fn(({ href, current, className, children }) => (
        <a href={href} className={className} data-current={current}>
            {children}
        </a>
    )),
    SideNavMenu: jest.fn(({ title, expanded, className, children }) => (
        <div className={className} data-expanded={expanded}>
            <span>{title}</span>
            {children}
        </div>
    )),
}));

describe('SideNavMenuItem Component', () => {
    beforeEach(() => {
        // Simple in-memory storage for the test
        const mockSessionStorage = {
            getItem: (key) =>
                mockSessionStorage[key] ? mockSessionStorage[key] : null,
            setItem: (key, value) => (mockSessionStorage[key] = value),
            removeItem: (key) => delete mockSessionStorage[key],
            clear: () =>
                Object.keys(mockSessionStorage).forEach(
                    (key) => delete mockSessionStorage[key],
                ),
        };
        Object.defineProperty(window, 'sessionStorage', {
            value: mockSessionStorage,
            writable: true,
        });
    });

    afterEach(() => {
        delete window.sessionStorage;
    });

    const items = [
        {
            title: 'Item 1',
            children: [
                {
                    title: 'SubItem 1',
                    href: '/item1/subitem1',
                },
            ],
        },
        {
            title: 'Item 2',
            href: '/item2',
            children: [],
        },
    ];

    it('should render SideNavMenuItem with given className', () => {
        const wrapper = shallow(
            <SideNavMenuItem className='test-class' items={items} />,
        );
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.find('.SideNavMenuItem__nav').exists()).toBeTruthy();
        expect(wrapper.find('.test-class').exists()).toBeTruthy();
    });

    it('should render SideNavMenu for items with children', () => {
        const wrapper = shallow(<SideNavMenuItem items={items} />);
        expect(wrapper.find(SideNavMenu).exists()).toBeTruthy();
        expect(wrapper.find(SideNavMenu).prop('title')).toEqual('Item 1');
    });

    it('should render SideNavLink for items without children', () => {
        const wrapper = shallow(<SideNavMenuItem items={items} />);
        expect(wrapper.find(SideNavLink).exists()).toBeTruthy();
        const sideNavLinks = wrapper.find(SideNavLink);
        expect(sideNavLinks.at(0).prop('href')).toEqual('/item1/subitem1');
        expect(sideNavLinks.at(1).prop('href')).toEqual('/item2');
    });

    it('should pass children to SideNavMenu', () => {
        const wrapper = shallow(<SideNavMenuItem items={items} />);
        const sideNavMenu = wrapper.find(SideNavMenu).at(0);
        const children = sideNavMenu.prop('children');
        expect(children).toBeDefined();
        expect(children).toHaveLength(1);
    });
});
