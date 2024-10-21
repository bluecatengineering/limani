import './AppShellIcon.less';

const AppShellIcon = ({ icon: Icon }) => {
    return (
        <div className='AppShellIcon'>
            <Icon size={16} />
        </div>
    );
};

export default AppShellIcon;
