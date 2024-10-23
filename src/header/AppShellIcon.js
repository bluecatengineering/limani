import './AppShellIcon.less';
import { useTooltip } from '@bluecateng/pelagos';
import PropTypes from 'prop-types';

const AppShellIcon = ({
    icon: Icon,
    tooltipText,
    tooltipPlacement = 'right',
    hideTooltip,
}) => {
    const tooltipRef = useTooltip(tooltipText, tooltipPlacement);

    return (
        <div
            key={hideTooltip}
            className='AppShellIcon'
            ref={!hideTooltip ? tooltipRef : null}>
            <Icon size={16} />
        </div>
    );
};

AppShellIcon.propTypes = {
    /** The component class name(s). */
    icon: PropTypes.object,

    /** Tooltip text value. */
    tooltipText: PropTypes.string,

    /** Tooltip position*/
    tooltipPlacement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),

    /** To hide the tooltip text*/
    hideTooltip: PropTypes.bool,
};

export default AppShellIcon;
