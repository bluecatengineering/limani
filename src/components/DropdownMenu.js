import { t } from '@bluecateng/l10n.macro';
import {
    Button,
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
                    const values = [];
                    data?.dropdown_menu?.forEach((item) => {
                        values.push({
                            text: t`${item?.text}`,
                            onClick: () => {
                                window.open(item?.url, '_blank').focus();
                            },
                        });
                    });
                    setDefaultValue(values);
                })
                .catch((error) => addErrorMessage(error.message))
                .finally(() => setBusy(false));
        }, []);

        return (
            <>
                <Button
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
                                            key={index + item.text}
                                            onClick={item?.onClick}
                                            text={item.text}
                                        />
                                        {menuItems.length - 1 !== index && (
                                            <MenuItemDivider key={index} />
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
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /** The button type. */
    type: PropTypes.oneOf(['primary', 'tertiary', 'ghost']),
    /** Whether the button is disabled. */
    disabled: PropTypes.bool,
    /** Whether the menu alignment should be flipped. */
    flipped: PropTypes.bool,
    /** Whether request called with a URL
     * or default URL at '/-/v3/dropdown_menu/data'*/
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
    size: 'small',
    type: 'ghost',
};

export default DropdownMenu;
