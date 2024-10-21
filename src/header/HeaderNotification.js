import AppShellIcon from './AppShellIcon';
import Notification from '@carbon/icons-react/es/Notification';
import './HeaderNotification.less';

const HeaderNotification = ({ className, buttonProps }) => {
    return (
        <div
            className={`HeaderNotification${className ? ` ${className}` : ''}`}>
            <button
                id='notificationButton'
                className='HeaderNotification__button'
                type='button'
                {...buttonProps}>
                <AppShellIcon icon={Notification} />
            </button>
        </div>
    );
};

export default HeaderNotification;
