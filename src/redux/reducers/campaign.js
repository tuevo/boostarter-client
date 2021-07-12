import { createSlice } from '@reduxjs/toolkit';
import { CAMPAIGNS, saveCampaignsToLocalStorage } from '../../constants';
import { mockCampaignList } from '../../mock-data';

const campaigns = localStorage.getItem(CAMPAIGNS) ? JSON.parse(localStorage.getItem(CAMPAIGNS)) : mockCampaignList;

const campaign = createSlice(
    {
        name: 'campaigns',
        initialState: campaigns,
        reducers: {
            addCampaign: (state, action) => {
                state.push(action.payload);
                saveCampaignsToLocalStorage(state);
            },
            updateCampaign: (state, action) => {
                const index = state.findIndex((c) => c.id === action.payload.id);
                let newCampaigns = [...state];
                if (index > -1) {
                    newCampaigns = [
                        ...state.slice(0, index),
                        action.payload,
                        ...state.slice(index + 1),
                    ]
                }
                saveCampaignsToLocalStorage(newCampaigns);
                return newCampaigns;
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