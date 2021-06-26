import { createSlice } from '@reduxjs/toolkit'

const app = createSlice(
    {
        name: 'campaigns',
        initialState: {
            loading: true,
        },
        reducers: {
            setAppLoading: (state, action) => {
                state.loading = action.payload;
            }
        }
    },
);

const { reducer, actions } = app;
export const {
    setAppLoading
} = actions;
export const appReducer = reducer;