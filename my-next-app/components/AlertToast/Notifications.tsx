import { NotificationProviderTypeReturn, useNotification } from '../../context/NotificationProvider';
import NotificationItem from './NotificationItem';

export default function Notifications() {
    const { notifications, setNotifications }: NotificationProviderTypeReturn = useNotification();

    return (
        <div
            className="notifications absolute top-0 right-0"
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 9999,
            }}
        >
            <NotificationItem
                notification={notifications}
                setNotifications={setNotifications}
            />
        </div>
    );
}
