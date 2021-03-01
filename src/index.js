import NotificationProvider, { useNotifications } from './context';
import Notifications from './Notifications';


// The hook that we export only provides the the addNotification function
const useAddNotification = () => useNotifications().addNotification;


// Export the React component for displaying notifications as the default export
export default Notifications;

// Export the provider and hook
export {
    NotificationProvider,
    useAddNotification as useNotifications
};
