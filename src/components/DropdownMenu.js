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
import {
    IconButton,
    Layer,
    Menu,
    MenuItem,
    MenuItemDivider,
    useLayer,
    useMenuHandler,
    useMenuPositioner,
} from '@bluecateng/pelagos';
import ChevronDown from '@carbon/icons-react/es/ChevronDown';
import PropTypes from 'prop-types';
import { Fragment, forwardRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { doGet } from '../functions/fetchFunctions';
import usePageMessages from './usePageMessages';
import usePageModalSpinner from './usePageModalSpinner';

import './DropdownMenu.less';

const setRefs =
    (...refs) =>
    (current) => {
        for (const ref of refs) {
            if (typeof ref === 'function') {
                ref(current);
            } else {
                ref.current = current;
            }
        }
    };

/** A button with a pop-up menu. */
const DropdownMenu = forwardRef(
    (
        {
            id,
            className,
            disabled,
            flipped,
            customValues,
            requestUrl,
            ...props
        },
        ref,
    ) => {
        const [defaultValue, setDefaultValue] = useState([]);
        const menuId = `${id}-menu`;
        const menuItems = customValues
            ? [...defaultValue, ...customValues]
            : defaultValue;
        const level = useLayer() + 1;
        const setPopUpPosition = useMenuPositioner(flipped);
        const { expanded, buttonProps, menuProps, buttonRef } =
            useMenuHandler(setPopUpPosition);
        const { setBusy } = usePageModalSpinner();
        const { addErrorMessage } = usePageMessages();

        useEffect(() => {
            setBusy(true);
            doGet(requestUrl || '/-/v3/dropdown_menu/data')
                .then((data) => {
                    const values = data?.dropdown_menu?.map((item) => ({
                        text: item?.text,
                        onClick: () => {
                            window.open(item?.url, '_blank').focus();
                        },
                    }));
                    setDefaultValue(values);
                })
                .catch((error) => addErrorMessage(error.message))
                .finally(() => setBusy(false));
        }, []);

        return (
            <>
                <IconButton
                    {...buttonProps}
                    {...props}
                    aria-controls={expanded ? menuId : null}
                    aria-expanded={expanded}
                    aria-haspopup='true'
                    className={`DropdownMenu${
                        className ? ` ${className}` : ''
                    }`}
                    data-layer={expanded ? level : null}
                    disabled={disabled || menuItems.length === 0}
                    icon={ChevronDown}
                    id={id}
                    ref={ref ? setRefs(ref, buttonRef) : buttonRef}
                />
                {expanded &&
                    createPortal(
                        <Layer className='DropdownMenu__popUp' level={level}>
                            <Menu
                                {...menuProps}
                                id={menuId}
                                aria-labelledby={id}>
                                {menuItems?.map((item, index) => (
                                    <Fragment key={index + item.text}>
                                        <MenuItem
                                            disable={item?.disable}
                                            onClick={item?.onClick}
                                            text={item.text}
                                        />
                                        {menuItems.length - 1 !== index && (
                                            <MenuItemDivider />
                                        )}
                                    </Fragment>
                                ))}
                            </Menu>
                        </Layer>,
                        document.body,
                    )}
            </>
        );
    },
);

DropdownMenu.displayName = 'DropdownMenu';

DropdownMenu.propTypes = {
    /** The component id. */
    id: PropTypes.string,
    /** The component class name(s). */
    className: PropTypes.string,
    /** The tooltip text to display. */
    tooltipText: PropTypes.string,
    /** The placement of the tooltip relative to the button. */
    tooltipPlacement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    /** The size of the button. */
    size: PropTypes.oneOf(['medium', 'large']),
    /** The button type. */
    type: PropTypes.oneOf(['primary', 'tertiary', 'ghost']),
    /** Whether the button is disabled. */
    disabled: PropTypes.bool,
    /** Whether the menu alignment should be flipped. */
    flipped: PropTypes.bool,
    // eslint-disable-next-line max-len
    /** Whether request called with a custom URL or use the default URL from Gateway at '/-/v3/dropdown_menu/data'*/
    requestUrl: PropTypes.string,
    /** The menu items. */
    customValues: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            onClick: PropTypes.func,
            disable: PropTypes.bool,
        }),
    ),
};

DropdownMenu.defaultProps = {
    size: 'medium',
    type: 'ghost',
};

export default DropdownMenu;
