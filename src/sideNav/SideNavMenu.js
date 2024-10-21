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
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    SideNav,
    SideNavItems,
    SideNavMenu as _SideNavMenu, // Avoid name collision.
    SideNavLink,
} from '@bluecateng/pelagos';
import usePlatformData from '../hooks/usePlatformData';
import useSideNav from './useSideNav';
import './SideNavMenu.less';

const getStates = () =>
    JSON.parse(sessionStorage.getItem('gw-leftnav-states')) ?? {};

const saveStates = (states) =>
    sessionStorage.setItem('gw-leftnav-states', JSON.stringify(states));

const nameForState = (title) => {
    const sep = '///';
    return sep + title;
};

const keyForState = (title, parents) => {
    const navPath = parents.concat([nameForState(title)]);
    return navPath.join('');
};

const renderItem = (item, parents, isNavActive) => {
    const classNames = ['SideNavMenu__item--level' + (parents.length + 1)];

    if (item.children.length > 0) {
        const key = keyForState(item.title, parents);
        const states = getStates();
        const expanded = states[key] === true;
        const newParents = parents.concat([nameForState(item.title)]);

        return (
            <_SideNavMenu
                title={item.title}
                expanded={expanded}
                className={classNames.join(' ')}
                sideNavActive={isNavActive}
                data-state-key={key}>
                {renderItems(item.children, newParents)}
            </_SideNavMenu>
        );
    } else {
        return (
            <SideNavLink
                href={item.href}
                current={item.href === window.location.pathname}
                className={classNames.join(' ')}
                sideNavActive={true}>
                {item.title}
            </SideNavLink>
        );
    }
};

const renderItems = (items, parents, isNavActive) => {
    return items.map((item) => renderItem(item, parents, isNavActive));
};

/**
 * SideNavMenu is a component to display navigation links to the left. <br>
 * This component needs to be wrapped with SideNavContext
 * to set initial expansion setting. <br>
 * This component is intended to be nested inside the PlatformDataContext
 * as it will require access to PlatformData. <br>
 */

const SideNavMenu = ({ className }) => {
    const { data } = usePlatformData();
    const { isExpanded } = useSideNav();
    const links = data?.user?.nav_links ?? [];

    const [, setOpen] = useState(getStates());

    const handleClick = (event) => {
        const target = event.target;
        const item = target.closest('[data-state-key]');
        if (!item) {
            // Only groups have a state key.
            return;
        }
        const key = item.getAttribute('data-state-key');
        if (!key) {
            // Only groups have a state key.
            return;
        }
        const expanded = item.getAttribute('aria-expanded') === 'true';

        item.setAttribute('aria-expanded', !expanded);
        const states = getStates();
        states[key] = !expanded;
        saveStates(states);
        setOpen((open) => ({ ...open, [key]: !expanded }));
    };

    const classNames = ['SideNavMenu__nav'];
    if (className) {
        classNames.push(className);
    }
    return isExpanded ? (
        <SideNav
            id='sideNav'
            className={classNames.join(' ')}
            active={isExpanded}
            onClick={handleClick}
            data-layer='1'>
            <SideNavItems>{renderItems(links, [], isExpanded)}</SideNavItems>
        </SideNav>
    ) : null;
};

SideNavMenu.propTypes = {
    /** The component class name(s). */
    className: PropTypes.string,
};

export default SideNavMenu;
