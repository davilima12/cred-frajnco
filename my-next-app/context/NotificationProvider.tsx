
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Notification = {
    name: string;
    title: string;
    type: 'success' | 'warn' | 'error';
    visible: boolean;
    time?: number;
};

export type NotificationProviderTypeReturn = {
    notifications: Notification;
    setNotifications: any;
    addToast: (title: string, name: string, type: string, time?: number) => void;
};

export const NOTIFICATION_TYPES = {
    WARNING: 'warn',
    SUCCESS: 'success',
    ERROR: 'error',
};

const VALID_NOTIFICATION_TYPES = [
    NOTIFICATION_TYPES.WARNING,
    NOTIFICATION_TYPES.SUCCESS,
    NOTIFICATION_TYPES.ERROR,
];

type NotificationContextType = {
    notifications: Notification;
    setNotifications: React.Dispatch<React.SetStateAction<Notification>>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification>({
        name: '',
        title: '',
        type: 'success',
        visible: false,
    });

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification(): NotificationProviderTypeReturn {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotification deve estar dentro do Provider');

    const { notifications, setNotifications } = context;

    function addToast(title: string, name: string, type: any, time?: number): void {
        if (!VALID_NOTIFICATION_TYPES.includes(type)) {
            throw new Error("Notification type inválido.");
        }

        setNotifications({ title, name, type, visible: true, time });
    }

    return {
        notifications,
        addToast,
        setNotifications,
    };
}
