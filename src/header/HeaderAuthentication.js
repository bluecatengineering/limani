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
import PropTypes from 'prop-types';
import usePlatformData from '../hooks/usePlatformData';

import './HeaderAuthentication.less';
import { Tag, useTooltip } from '@bluecateng/pelagos';
import { t } from '@bluecateng/l10n.macro';

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
    const isReadOnly = data?.user?.authentication_info?.is_read_only;
    const readOnlyTooltipRef = useTooltip(
        t`Connected to Address Manager in read-
        only mode. Gateway settings aren’t 
        affected.`,
        'bottom',
    );

    return (
        <>
            {authenticationService && (
                <div
                    className={`HeaderAuthentication${
                        className ? ` ${className}` : ''
                    }`}>
                    <span className='HeaderAuthentication__authentication'>
                        {authenticationAlias ? (
                            <a
                                target='_blank'
                                rel='noreferrer'
                                href={authenticationLink}
                                title={authenticationAlias}>
                                {authenticationService}:{' '}
                                <u>{authenticationAlias}</u>
                            </a>
                        ) : (
                            authenticationService
                        )}
                    </span>
                    {isReadOnly && (
                        <Tag
                            className='HeaderAuthentication__readOnlyLabel'
                            size='sm'
                            type='gray'
                            ref={readOnlyTooltipRef}>
                            <span>{t`Read-only`}</span>
                        </Tag>
                    )}
                </div>
            )}
        </>
    );
};

HeaderAuthentication.propTypes = {
    /** The component class name(s). */
    className: PropTypes.string,
};

export default HeaderAuthentication;
