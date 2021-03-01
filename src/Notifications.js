import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Toast from 'react-bootstrap/Toast';

import { useNotifications } from './context';


const Icons = {
    info: "fas fa-info-circle",
    success: "fas fa-check-circle",
    warning: "fas fa-exclamation-triangle",
    danger: "fas fa-exclamation-circle"
};


const Notification = ({ notification, onDismiss }) => {
    const iconClasses = Icons[notification.level];
    const [visible, setVisible] = useState(true);
    const handleClose = () => {
        // Hide the notification to trigger the fade
        setVisible(false);
        // Run the callback once the transition is done
        setTimeout(onDismiss, 1000);
    };
    return (
        <Toast
            className={`notification border-${notification.level}`}
            style={{ borderWidth: '2px' }}
            animation
            show={visible}
            onClose={handleClose}
            autohide={!!notification.duration}
            delay={notification.duration}
        >
            <Toast.Header className={`text-${notification.level} align-baseline`}>
                <i className={`mr-2 fa-lg ${iconClasses}`}></i>
                <strong className="mr-auto">{notification.title}</strong>
            </Toast.Header>
            <Toast.Body>{notification.message}</Toast.Body>
        </Toast>
    );
};


const Notifications = () => {
    // Get the notifications from the store
    const { notifications, removeNotification } = useNotifications();
    // Render using a portal so that we can sit over other elements
    const [container] = useState(() => document.createElement('div'));
    useEffect(() => {
        document.body.appendChild(container);
        return () => document.body.removeChild(container);
    }, [container]);
    return ReactDOM.createPortal(
        <div
            style={{ position: 'fixed', top: 0, right: 0, minWidth: '350px', zIndex: 1100 }}
            className="p-3"
        >
            {notifications.map(notification =>
                <Notification
                    key={notification.id}
                    notification={notification}
                    onDismiss={() => removeNotification(notification.id)}
                />
            )}
        </div>,
        container
    );
};


export default Notifications;
