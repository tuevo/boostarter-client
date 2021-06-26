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
            }
        }
    },
);

const { reducer, actions } = campaign;
export const {
    addCampaign
} = actions;
export const campaignReducer = reducer;