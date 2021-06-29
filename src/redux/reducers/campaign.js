import { createSlice } from '@reduxjs/toolkit'
import { v4 } from 'uuid';
import { mockCampaignList } from '../../mock-data';

const campaign = createSlice(
    {
        name: 'campaigns',
        initialState: [...mockCampaignList],
        reducers: {
            addCampaign: (state, action) => {
                state.unshift({
                    ...action.payload,
                    id: v4(),
                });
            },
            updateCampaign: (state, action) => {
                const index = state.findIndex((c) => c.id === action.payload.id);
                if (index > -1) {
                    return [
                        ...state.slice(0, index),
                        action.payload,
                        ...state.slice(index + 1),
                    ]
                }

                return state;
            }
        }
    },
);

const { reducer, actions } = campaign;
export const {
    addCampaign,
    updateCampaign,
} = actions;
export const campaignReducer = reducer;