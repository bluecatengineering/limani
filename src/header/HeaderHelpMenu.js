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
import { t } from '@bluecateng/l10n.macro';
import { Layer, Menu, MenuItem, useMenuHandler } from '@bluecateng/pelagos';
import Help from '@carbon/icons-react/es/Help';
import PropTypes from 'prop-types';
import usePlatformData from '../hooks/usePlatformData';
import { resizeButtonMenu } from '../utils/display';
import './HeaderHelpMenu.less';
import AppShellIcon from './AppShellIcon';

/**
 * HeaderHelpMenu component is a button when clicked this button reveals the
 * links to different documentation guides. <br>
 * This component is intended to be nested inside the PlatformDataContext as
 * it will require access to PlatformData. <br>
 * The component should always be wrapped inside parent element that
 * has an id=root, all the pages in Gateway is wrapped with a top-level parent
 * element that has an id=root.
 */
const HeaderHelpMenu = ({ className }) => {
    const { data } = usePlatformData();
    const helpLinks = data?.user?.help_links;

    const helpItems = [];

    if (helpLinks?.platform) {
        helpItems.push(
            ...helpLinks.platform.map((item) => ({
                hasDivider: false,
                text: item.title,
                handler: () => {
                    window.open(item.url, '_blank').focus();
                },
            })),
        );
    }

    if (helpLinks?.custom) {
        helpItems.push(
            ...helpLinks.custom.map((item, index) => ({
                hasDivider: index === 0 && helpItems.length !== 0,
                text: item.title,
                handler: () => {
                    window.open(item.url, '_blank').focus();
                },
            })),
        );
    }

    const { expanded, buttonProps, menuProps, guardProps } = useMenuHandler();

    resizeButtonMenu(expanded, 'helpMenuButton', 'helpMenu');

    return (
        <>
            {helpItems.length ? (
                <div
                    className={`HeaderHelpMenu${
                        className ? ` ${className}` : ''
                    }`}>
                    <button
                        id='helpMenuButton'
                        className='HeaderHelpMenu__button'
                        type='button'
                        aria-controls={expanded ? 'helpMenu' : null}
                        aria-haspopup='true'
                        aria-expanded={expanded}
                        {...buttonProps}>
                        <AppShellIcon icon={Help} />
                    </button>
                    {expanded && (
                        <Layer
                            id='helpMenu'
                            role='menu'
                            className='HeaderHelpMenu__menu'
                            aria-label={t`Help Menu`}
                            level='1'>
                            <div tabIndex={0} {...guardProps} />
                            <Menu {...menuProps}>
                                {helpItems.map((helpMenuItem, index) => (
                                    <MenuItem
                                        key={helpMenuItem.id}
                                        data-index={index}
                                        hasDivider={helpMenuItem.hasDivider}
                                        id={`helpMenu-${helpMenuItem.id}`}
                                        onClick={helpMenuItem.handler}>
                                        {helpMenuItem.text}
                                    </MenuItem>
                                ))}
                            </Menu>
                            <div tabIndex={0} {...guardProps} />
                        </Layer>
                    )}
                </div>
            ) : null}
        </>
    );
};

HeaderHelpMenu.propTypes = {
    /** The component class name(s). */
    className: PropTypes.string,
};

export default HeaderHelpMenu;
