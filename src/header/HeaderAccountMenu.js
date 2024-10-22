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
import UserAvatar from '@carbon/icons-react/es/UserAvatar';

import PropTypes from 'prop-types';
import usePlatformData from '../hooks/usePlatformData';
import { resizeButtonMenu } from '../utils/display';
import './HeaderAccountMenu.less';
import AppShellIcon from './AppShellIcon';

const doLogout = () => window.open('/logout', '_self');

/**
 * Header Account Menu component is a button when clicked this button
 * reveals the username and usertype of the currently logged-in user, along
 * with a logout button that will call the logout endpoint in Gateway. <br>
 * This component is intended to be nested inside the PlatformDataContext as
 * it will require access to PlatformData. <br>
 * The component should always be wrapped inside parent element
 * that has an id=root, all the pages in Gateway is wrapped
 * with a top-level parent element that has an id=root.
 */
const HeaderAccountMenu = ({ className }) => {
    const { data } = usePlatformData();
    const userData = {
        userName: data?.user.username,
        userType: data?.user.user_type,
    };

    const { expanded, buttonProps, menuProps, guardProps } = useMenuHandler();

    resizeButtonMenu(expanded, 'accountMenuBtn', 'accountMenu');

    return (
        <div className={`HeaderAccountMenu${className ? ` ${className}` : ''}`}>
            <button
                id='accountMenuBtn'
                className='HeaderAccountMenu__button'
                type='button'
                aria-controls={expanded ? 'accountMenu' : null}
                aria-haspopup='true'
                aria-expanded={expanded}
                {...buttonProps}>
                <AppShellIcon
                    icon={UserAvatar}
                    tooltipText={t`Account`}
                    tooltipPlacement='bottom'
                    hideTooltip={expanded}
                />
            </button>
            {expanded && (
                <Layer
                    id='accountMenu'
                    className='HeaderAccountMenu__menu'
                    role='menu'
                    aria-label={t`Account`}
                    level={1}>
                    <div
                        id='user-profile'
                        className='HeaderAccountMenu__userProfile'>
                        <span>{userData.userName}</span>
                        <span>{userData.userType}</span>
                    </div>
                    <div tabIndex={0} {...guardProps} />
                    <Menu {...menuProps}>
                        <MenuItem id='logout' onClick={doLogout}>
                            {t`Logout`}
                        </MenuItem>
                    </Menu>
                    <div tabIndex={0} {...guardProps} />
                </Layer>
            )}
        </div>
    );
};

HeaderAccountMenu.propTypes = {
    /** The component class name(s). */
    className: PropTypes.string,
};

export default HeaderAccountMenu;
