/*
Copyright 2023-2025 BlueCat Networks Inc.

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
import {
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    useTooltip,
} from '@bluecateng/pelagos';
import PropTypes from 'prop-types';
import './SideNavMenuItem.less';

const getStates = () =>
    JSON.parse(sessionStorage.getItem('gw-leftnav-states')) ?? {};

const nameForState = (title) => {
    const sep = '///';
    return sep + title;
};

const keyForState = (title, parents) => {
    const navPath = parents.concat([nameForState(title)]);
    return navPath.join('');
};

const renderItem = (item, parents) => {
    const classNames = ['SideNavMenuItem__item--level' + (parents.length + 1)];
    const key = keyForState(item.title, parents);
    const tooltipRef = useTooltip(item?.title, 'right');

    if (item?.children?.length > 0) {
        const states = getStates();
        const expanded = states[key] === true;
        const newParents = parents.concat([nameForState(item.title)]);

        return (
            <SideNavMenu
                className={classNames.join(' ')}
                data-state-key={key}
                expanded={expanded}
                key={key}
                ref={tooltipRef}
                // Do not use value as string, it will trigger the tooltips
                title={<div>{item.title}</div>}>
                {renderItems(item.children, newParents)}
            </SideNavMenu>
        );
    } else {
        return (
            <SideNavLink
                className={classNames.join(' ')}
                current={item.href === window?.location?.pathname}
                href={item.href}
                key={key}
                ref={tooltipRef}>
                {/* Do not use value as string, it will trigger the tooltips */}
                <div>{item.title}</div>
            </SideNavLink>
        );
    }
};

const renderItems = (items, parents) => {
    return items?.map((item) => renderItem(item, parents));
};

/**
 * SideNav is a component to display navigation links to the left. <br>
 * This component is intended to be nested inside the PlatformDataContext
 * as it will require access to PlatformData. <br>
 */

const SideNavMenuItem = ({ className, items }) => {
    const classNames = ['SideNavMenuItem__nav'];
    if (className) {
        classNames.push(className);
    }

    return (
        <SideNavItems className={classNames.join(' ')}>
            {renderItems(items, [])}
        </SideNavItems>
    );
};

SideNavMenuItem.propTypes = {
    /** The component class name(s). */
    className: PropTypes.string,
};

export default SideNavMenuItem;
