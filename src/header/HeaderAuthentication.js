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
import { Link } from '@carbon/icons-react';
import PropTypes from 'prop-types';
import usePlatformData from '../hooks/usePlatformData';

import './HeaderAuthentication.less';

/**
 * HeaderAuthentication component displays the connected Authentication
 * service alias and URL. <br>
 * This component is intended to be nested inside the PlatformDataContext
 * as it will require access to PlatformData.
 */
const HeaderAuthentication = ({ className }) => {
    const { data } = usePlatformData();
    const authenticationAlias = data?.user?.authentication_info?.alias;
    const authenticationLink = data?.user?.authentication_info?.url;
    const authenticationService = data?.user?.authentication_info?.service;

    return (
        <>
            <div
                className={`HeaderAuthentication__authentication${
                    className ? ` ${className}` : ''
                }`}>
                {authenticationAlias ? (
                    <span>
                        {authenticationService} &nbsp;
                        <Link id='link-icon' />
                        &nbsp;
                        <a
                            href={authenticationLink}
                            target='_blank'
                            rel='noreferrer'
                            title={authenticationAlias}>
                            {authenticationAlias}
                        </a>
                    </span>
                ) : (
                    <span>Standalone</span>
                )}
            </div>
        </>
    );
};

HeaderAuthentication.propTypes = {
    /** The component class name(s). */
    className: PropTypes.string,
};

export default HeaderAuthentication;
