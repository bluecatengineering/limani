/*
Copyright 2024 BlueCat Networks Inc.

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
import { IconButton } from '@bluecateng/pelagos';
import { Close } from '@carbon/icons-react';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useRandomId from '../hooks/useRandomId';
import './SidePanel.less';

const panelSize = {
    small: 45,
    large: 70,
};

const SidePanel = ({
    id,
    className,
    title,
    expanded,
    size,
    top,
    zIndex,
    tooltip,
    children,
    onClose,
}) => {
    id = useRandomId(id);
    const [isClickingClose, setIsClickingClose] = useState(false);
    const animationRef = useRef(null);
    const renderCountRef = useRef(0);

    const customStyles = useMemo(() => {
        return {
            width: `${panelSize[size] ?? panelSize.small}%`,
            top: `${top ?? 0}px`,
            height: `calc(100% - ${top ?? 0}px)`,
            zIndex: zIndex ?? 1,
        };
    }, [size, top, zIndex]);

    useEffect(() => {
        renderCountRef.current++;
        const sidePanel = document.getElementById(id);
        if (expanded) {
            setIsClickingClose(false);
            animationRef.current = sidePanel.animate(
                [
                    { transform: 'translateX(100%)' },
                    { transform: 'translateX(0)' },
                ],
                {
                    duration: 300,
                    fill: 'both',
                    easing: 'ease-out',
                },
            );
        } else {
            if (isClickingClose || renderCountRef.current === 1) {
                return;
            }
            handleClose();
        }
    }, [id, expanded]);

    const handleClose = useCallback(() => {
        setIsClickingClose(true);
        const animation = animationRef.current;
        if (animation) {
            animation.onfinish = onClose;
            animation.reverse();
        }
    }, [onClose]);

    return (
        <>
            {createPortal(
                <div
                    id={id}
                    className={`SidePanel${className ? ` ${className}` : ''}`}
                    aria-expanded={expanded}
                    aria-labelledby='sidePanelTitle'
                    style={customStyles}>
                    <div className='SidePanel__header'>
                        <p id='sidePanelTitle' className='SidePanel__title'>
                            {title}
                        </p>
                        <IconButton
                            id='closeSidePanelBtn'
                            className='SidePanel__close'
                            icon={Close}
                            aria-label={t`Close`}
                            tooltipText={tooltip?.text ?? undefined}
                            tooltipPlacement={tooltip?.placement ?? 'left'}
                            onClick={handleClose}
                        />
                    </div>
                    <div className='SidePanel__content'>{children}</div>
                </div>,
                document.body,
            )}
        </>
    );
};

SidePanel.propTypes = {
    /** The component id. */
    id: PropTypes.string,
    /** The component class name(s). */
    className: PropTypes.string,
    /** The side panel's title. */
    title: PropTypes.string.isRequired,
    /** Whether the panel is visible or not */
    expanded: PropTypes.bool.isRequired,
    /** The component width */
    size: PropTypes.oneOf(['small', 'large']),
    /** The margin top */
    top: PropTypes.number,
    /** The margin top */
    zIndex: PropTypes.number,
    /** Whether the tooltip is shown or not */
    tooltip: PropTypes.oneOfType(
        [
            PropTypes.shape({
                text: PropTypes.string,
                placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
            }),
        ],
        false,
    ),
    /** A callback that will be called when a user clicks mask, close button */
    onClose: PropTypes.func.isRequired,
    /** Child components */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]),
};

SidePanel.defaultProps = {
    size: 'small',
    tooltip: {
        text: 'Close',
        placement: 'left',
    },
};

export default SidePanel;
