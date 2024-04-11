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
import { faCog } from '@fortawesome/free-solid-svg-icons';
import {
    HeaderIcon,
    useMenuHandler,
    Layer,
    Menu,
    MenuItem,
} from '@bluecateng/pelagos';
import usePlatformData from '../hooks/usePlatformData';
import { resizeButtonMenu } from '../utils/display';
import { t } from '@bluecateng/l10n.macro';
import './HeaderSystemMenu.less';

/**
 * HeaderSystemMenu component is a button when clicked this button reveals the
 * links to System menu options. <br>
 * With user access permission, Download logs is an available option to retrieve
 * all logs as a single file. <br>
 * This component is intended to be nested inside the PlatformDataContext as
 * it will require access to PlatformData. <br>
 * The component should always be wrapped inside parent element that
 * has an id=root, all the pages in Gateway is wrapped with a top-level parent
 * element that has an id=root.
 */

const HeaderSystemMenu = ({ className }) => {
    const { data } = usePlatformData();
    const canDownloadLogs = data?.user?.permissions.download_logs;
    const canViewLogs = data?.user?.permissions.view_logs;
    const downloadLogs = () =>
        window.open('/admin/logs/download', '_blank').focus();
    const viewLogs = () => window.open('/admin/view_logs', '_blank').focus();

    const { expanded, buttonProps, menuProps, guardProps } = useMenuHandler();

    resizeButtonMenu(expanded, 'systemMenuButton', 'systemMenu');

    return (
        <>
            {(canDownloadLogs || canViewLogs) && (
                <div className={className}>
                    <button
                        id='systemMenuButton'
                        className='HeaderSystemMenu__button'
                        type='button'
                        aria-controls={expanded ? 'systemMenu' : null}
                        aria-haspopup='true'
                        aria-expanded={expanded}
                        {...buttonProps}>
                        <HeaderIcon
                            className='button'
                            icon={faCog}
                            label={t`System`}
                        />
                    </button>
                    {expanded && (
                        <Layer
                            id='systemMenu'
                            role='menu'
                            className='HeaderSystemMenu__menu'
                            aria-label={`System Menu`}>
                            <div tabIndex={0} {...guardProps} />
                            <Menu {...menuProps}>
                                {canDownloadLogs && (
                                    <MenuItem
                                        id='systemMenu-dl_logs'
                                        onClick={
                                            downloadLogs
                                        }>{t`Download logs`}</MenuItem>
                                )}
                                {canViewLogs && (
                                    <MenuItem
                                        id='systemMenu-vw_logs'
                                        onClick={
                                            viewLogs
                                        }>{t`View logs`}</MenuItem>
                                )}
                            </Menu>
                            <div tabIndex={0} {...guardProps} />
                        </Layer>
                    )}
                </div>
            )}
        </>
    );
};

HeaderSystemMenu.propTypes = {
    /** The component class name(s). */
    className: PropTypes.string,
};

export default HeaderSystemMenu;
