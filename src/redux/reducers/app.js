import { createSlice } from '@reduxjs/toolkit'

const app = createSlice(
    {
        name: 'app',
        initialState: {
            loading: true,
            elementIdToScroll: null,
        },
        reducers: {
            setAppLoading: (state, action) => {
                state.loading = action.payload;
            },
            scrollToElement: (state, action) => {
                state.elementIdToScroll = action.payload;
            }
        }
    },
);

const { reducer, actions } = app;
export const {
    setAppLoading,
    scrollToElement,
} = actions;
export const appReducer = reducer;