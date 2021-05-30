import { createSlice } from '@reduxjs/toolkit';
import { AUTH_USER } from '../../constants';

const authUser = localStorage.getItem(AUTH_USER);

const user = createSlice(
  {
    name: 'user',
    initialState: {
      auth: authUser ? JSON.parse(authUser) : null
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