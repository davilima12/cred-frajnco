import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Notification } from '@/context/NotificationProvider';
import { ExclamationIcon, CheckIcon, XIcon, RefreshIcon } from '@heroicons/react/solid';

export default function NotificationItem({ notification, setNotifications }: NotificationItemInput) {
    const toast = useRef<any>(null);

    useEffect(() => {
        if (notification.visible) {
            toast.current.show({
                severity: notification.type,
                summary: notification.title,
                detail: notification.name,
                life: notification.time || 3000,
            });

            // Fechar a notificação após o tempo especificado
            setTimeout(() => {
                setNotifications({ ...notification, visible: false });
            }, notification.time || 3000);
        }
    }, [notification]);

    return (
        <>
            <Toast ref={toast} />
        </>
    );
}

export type NotificationItemInput = {
    notification: Notification;
    setNotifications: any;
};
