import { createSlice } from '@reduxjs/toolkit';
import { NOTIFICATIONS, saveNotificationsToLocalStorage } from '../../constants';
import { mockNotificationList } from '../../mock-data';

const notifications = localStorage.getItem(NOTIFICATIONS) ? JSON.parse(localStorage.getItem(NOTIFICATIONS)) : mockNotificationList;

const notification = createSlice(
    {
        name: 'notifications',
        initialState: notifications,
        reducers: {
            addNotification: (state, action) => {
                state.unshift(action.payload);
                saveNotificationsToLocalStorage(state);
            }
        }
    },
);

const { reducer, actions } = notification;
export const {
    addNotification
} = actions;
export const notificationReducer = reducer;