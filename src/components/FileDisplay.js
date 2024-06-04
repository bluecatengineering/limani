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
import { IconButton } from '@bluecateng/pelagos';
import { Close, Download } from '@carbon/icons-react';
import PropTypes from 'prop-types';
import useRandomId from '../hooks/useRandomId';
import './FileDisplay.less';

/**
 * FileDisplay component displays a file
 * with action for delete with its tooltip text display.
 * It also has the option to download a file, the user is responsible
 * to write the functionality for the download method.
 */

const FileDisplay = ({
    id,
    className,
    fileName,
    onDelete,
    deleteTooltipText,
    disabled,
    onDownload,
    downloadTooltipText,
}) => {
    id = useRandomId(id);
    const deleteId = `${id}-delete`;
    const downloadId = `${id}-download`;
    const canDelete = onDelete !== undefined && onDelete !== null;
    const canDownload = onDownload !== undefined && onDownload !== null;
    return (
        <div
            className={`FileDisplay${className ? ` ${className}` : ''}${
                canDelete ? ' FileDisplay--withDelete' : ''
            }${canDownload ? ' FileDisplay--withDownload' : ''}`}>
            {canDownload && (
                <IconButton
                    id={downloadId}
                    className='FileDisplay__download'
                    icon={Download}
                    tooltipText={downloadTooltipText}
                    tooltipPlacement='top'
                    onClick={onDownload}
                />
            )}
            <div className='FileDisplay__fileName'>{fileName}</div>
            {canDelete && (
                <IconButton
                    id={deleteId}
                    className='FileDisplay__delete'
                    icon={Close}
                    tooltipText={deleteTooltipText}
                    tooltipPlacement='top'
                    disabled={disabled}
                    onClick={onDelete}
                />
            )}
        </div>
    );
};

FileDisplay.propTypes = {
    /** The component id. */
    id: PropTypes.string,
    /** The component class name(s). */
    className: PropTypes.string,
    /** The file name to be displayed. */
    fileName: PropTypes.string,
    /** Function invoked when the delete button is clicked.
     * Setting this property enables the delete button. */
    onDelete: PropTypes.func,
    /** The text to display as tooltip in the delete button. */
    deleteTooltipText: PropTypes.string,
    /** Whether the delete button is disabled.
     * Delete can be shown, but disabled. */
    disabled: PropTypes.bool,
    /** Function invoked when the download button is clicked.
     * Setting this property enables the download button. */
    onDownload: PropTypes.func,
    /** The text to display as tooltip in the download button. */
    downloadTooltipText: PropTypes.string,
};

export default FileDisplay;
