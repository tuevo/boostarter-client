import { createSlice } from '@reduxjs/toolkit';
import { mockPostedStatusList } from '../../mock-data';

const postedStatus = createSlice(
  {
    name: 'postedStatuses',
    initialState: [...mockPostedStatusList],
    reducers: {
      addPostedStatus: (state, action) => {
        state.unshift(action.payload);
      }
    }
  },
);

const { reducer, actions } = postedStatus;
export const {
  addPostedStatus
} = actions;
export const postedStatusReducer = reducer;