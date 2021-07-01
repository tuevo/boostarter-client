import { createSlice } from '@reduxjs/toolkit';
import { CAMPAIGNS, saveCampaignsToLocalStorage } from '../../constants';
import { mockCampaignList } from '../../mock-data';
import { randomNumberNotInArray } from '../../utils';

const campaigns = localStorage.getItem(CAMPAIGNS) ? JSON.parse(localStorage.getItem(CAMPAIGNS)) : mockCampaignList;

const campaign = createSlice(
    {
        name: 'campaigns',
        initialState: campaigns,
        reducers: {
            addCampaign: (state, action) => {
                const newId = randomNumberNotInArray(state.map((c) => c.id));
                state.push({
                    ...action.payload,
                    id: newId,
                });
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