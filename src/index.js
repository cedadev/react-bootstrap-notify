import useStore from './store';
import Notifications from './Notifications';


/**
 * React hook that allows notifications to be sent.
 */
export const useNotifications = () => useStore().create;


// Export the React component for displaying notifications as the default export
export default Notifications;
