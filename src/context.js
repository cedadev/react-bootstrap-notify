import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';


const NotificationContext = createContext();


const NotificationProvider = ({ children }) => {
    // We maintain a next id and an array of notifications
    const [state, setState] = useState({ nextId: 0, data: [] });
    // Define functions for adding and removing notifications
    const addNotification = useCallback(
        notification => setState(state => ({
            nextId: state.nextId + 1,
            data: [...state.data, { ...notification, id: state.nextId }]
        })),
        []
    );
    const removeNotification = useCallback(
        id => setState(state => ({
            ...state,
            data: state.data.filter(n => n.id !== id)
        })),
        []
    );
    // Make the state that will be passed to the context provider
    const providerState = useMemo(
        () => ({
            notifications: state.data,
            addNotification,
            removeNotification
        }),
        [state.data, addNotification, removeNotification]
    );
    // Return the provider component configured with the current state
    return (
        <NotificationContext.Provider value={providerState}>
            {children}
        </NotificationContext.Provider>
    );
};


export const useNotifications = () => useContext(NotificationContext);


export default NotificationProvider;
