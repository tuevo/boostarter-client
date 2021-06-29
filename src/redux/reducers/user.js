import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { AUTH_USER, saveUsersToLocalStorage, USERS } from '../../constants';
import { mockUserList } from '../../mock-data';

const authUser = localStorage.getItem(AUTH_USER);
const users = localStorage.getItem(USERS) ? JSON.parse(localStorage.getItem(USERS)) : mockUserList;

const user = createSlice(
    {
        name: 'user',
        initialState: {
            auth: authUser ? JSON.parse(authUser) : null,
            users,
        },
        reducers: {
            auth: (state, action) => {
                state.auth = action.payload;
            },
            addUser: (state, action) => {
                state.users.push({ ...action.payload, id: v4() });
                saveUsersToLocalStorage(state.users);
            },
            updateUser: (state, action) => {
                const index = state.users.findIndex((u) => u.id === action.payload.id);
                if (index > -1) {
                    state.users = [
                        ...state.users.slice(0, index),
                        action.payload,
                        ...state.users.slice(index + 1)
                    ];
                }
                saveUsersToLocalStorage(state.users);
            }
        }
    },
);

const { reducer, actions } = user;
export const { auth, addUser, updateUser } = actions;
export const userReducer = reducer;