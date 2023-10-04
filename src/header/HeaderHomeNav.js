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
import {
    faHouseChimney,
    faWindowMaximize,
} from '@fortawesome/free-solid-svg-icons';
import { HeaderIcon } from '@bluecateng/pelagos';
import { t } from '@bluecateng/l10n.macro';
import usePlatformData from '../hooks/usePlatformData';
import './HeaderHomeNav.less';

/**
 * HeaderHomeNav is a component with two buttons, Home and Workflows. <br>
 * Workflows button is exposed only when a custom landing page
 * is configured. <br>
 * This will allow Home to navigate to index while Workflows navigates
 * to custom landing page. <br>
 * This component is intended to be nested inside the PlatformDataContext
 * as it will require access to PlatformData. <br>
 */
const HeaderHomeNav = ({ className }) => {
    const removeHttp = (url) => {
        return url.replace(/^https?:\/\//, '');
    };

    const stripTrailingSlash = (str) => {
        return str.endsWith('/') ? str.slice(0, -1) : str;
    };

    const stripLeadingSlash = (str) => {
        return str && str !== undefined && str.startsWith('/')
            ? str.substring(1)
            : str;
    };

    const { data } = usePlatformData();
    const homeUrl = data?.user?.home_url;

    const port = window.location.port;
    const currentDomain = window.location.hostname + (port ? ':' + port : '');
    const currentURL = stripTrailingSlash(removeHttp(window.location.href));

    const landingPageActivated = ![null, '', '/', '/home', undefined].includes(
        homeUrl,
    );
    const activeLandingPage = currentURL.includes(currentDomain + '/index');
    const activeHomePage = [
        currentDomain + '/home',
        currentDomain + '/' + stripLeadingSlash(homeUrl),
        currentDomain,
    ].includes(currentURL);

    return (
        <div className={`HeaderHomeNav${className ? ' ' + className : ''}`}>
            <a
                id='headerHomeLink'
                className='HeaderHomeNav__link'
                href='/home'
                aria-current={activeHomePage ? 'page' : null}>
                <HeaderIcon icon={faHouseChimney} label={t`Home`} />
            </a>
            {landingPageActivated ? (
                <a
                    id='headerWorkflowsLink'
                    className='HeaderHomeNav__link'
                    href='/index'
                    aria-current={activeLandingPage ? 'page' : null}>
                    <HeaderIcon icon={faWindowMaximize} label={t`Workflows`} />
                </a>
            ) : null}
        </div>
    );
};

HeaderHomeNav.propTypes = {
    /** The component class name(s). */
    className: PropTypes.string,
};

export default HeaderHomeNav;
