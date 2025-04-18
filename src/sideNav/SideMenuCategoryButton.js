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
import SidePanelClose from '@carbon/icons-react/es/SidePanelClose';
import { useMemo } from 'react';

import './SideMenuCategoryButton.less';

const SideMenuCategoryButton = ({
    buttonId,
    current,
    expanded,
    href,
    icon: Icon,
    title,
    toggleMenu,
    tooltipText,
}) => {
    const buttonProps = useMemo(
        () => ({
            'role': href ? 'link' : 'button',
            'aria-current': current,
            'aria-expanded': expanded,
            'aria-controls': 'secondaryNavigation',
            'aria-label': expanded ? t`Close side menu` : undefined,
        }),
        [expanded, current],
    );

    const onClick = href
        ? { onClick: () => window.location.replace(href) }
        : null;

    return (
        <button
            id={buttonId}
            className='SideMenuCategoryButton'
            onClick={toggleMenu}
            title={tooltipText}
            {...onClick}
            {...buttonProps}>
            {expanded ? (
                <SidePanelClose
                    className='SideMenuCategoryButton__icon'
                    size={24}
                />
            ) : (
                <>
                    <Icon className='SideMenuCategoryButton__icon' size={24} />
                    <div className='SideMenuCategoryButton__title'>{title}</div>
                </>
            )}
        </button>
    );
};

export default SideMenuCategoryButton;
