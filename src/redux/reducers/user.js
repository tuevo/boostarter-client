import { createSlice } from '@reduxjs/toolkit';

const user = createSlice(
  {
    name: 'user',
    initialState: {
      auth: null
    },
    reducers: {
      auth: (state, action) => {
        state.auth = action.payload;
      }
    }
  },
);

const { reducer, actions } = user;
export const { auth } = actions;
export const userReducer = reducer;