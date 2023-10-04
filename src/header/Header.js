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
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Layer } from '@bluecateng/pelagos';
import HeaderAccountMenu from './HeaderAccountMenu';
import HeaderBAM from './HeaderBAM';
import HeaderHelpMenu from './HeaderHelpMenu';
import HeaderLogo from './HeaderLogo';
import HeaderSystemMenu from './HeaderSystemMenu';
import HeaderHomeNav from './HeaderHomeNav';
import SideNavMenu from '../sideNav/SideNavMenu';
import usePlatformData from '../hooks/usePlatformData';
import SideNavMenuSwitcher from '../sideNav/SideNavMenuSwitcher';

import './Header.less';

/**
 * Header component presents the top navbar and the side navbar.
 * An example of this component could be found on the index page
 * of gateway after login. <br>
 * This component needs to be wrapped with SideNavContext
 * to set initial expansion setting. <br>
 * This component is intended to be nested inside the PlatformDataContext
 * as it will require access to PlatformData. <br>
 * The component should always be wrapped inside parent element
 * that has an id=root, all the pages in Gateway is wrapped
 * with a top-level parent element that has an id=root.
 */
const Header = ({ className }) => {
    const { isFetchingData, triggerFetchData } = usePlatformData();

    useEffect(() => {
        triggerFetchData();
    }, []);

    return (
        <>
            {!isFetchingData && (
                <div className={`Header${className ? ' ' + className : ''}`}>
                    <Layer data-theme='dark' className='Header__topNav'>
                        <div className='Header__leftSideMenu'>
                            <SideNavMenuSwitcher />
                            <HeaderHomeNav />
                        </div>
                        <HeaderLogo />
                        <div className='Header__rightSideMenu'>
                            <HeaderBAM />
                            <HeaderHelpMenu />
                            <HeaderSystemMenu />
                            <HeaderAccountMenu />
                        </div>
                    </Layer>
                    <SideNavMenu />
                </div>
            )}
        </>
    );
};

Header.propTypes = {
    /** The component class name(s). */
    className: PropTypes.string,
};

export default Header;
