import { createSlice } from '@reduxjs/toolkit';
import { POSTED_STATUS, savePostedStatusesToLocalStorage } from '../../constants';
import { mockPostedStatusList } from '../../mock-data';

const postedStatuses = localStorage.getItem(POSTED_STATUS) ? JSON.parse(localStorage.getItem(POSTED_STATUS)) : mockPostedStatusList;

const postedStatus = createSlice(
    {
        name: 'postedStatuses',
        initialState: postedStatuses,
        reducers: {
            addPostedStatus: (state, action) => {
                state.unshift(action.payload);
                savePostedStatusesToLocalStorage(state);
            }
        }
    },
);

const { reducer, actions } = postedStatus;
export const {
    addPostedStatus
} = actions;
export const postedStatusReducer = reducer;