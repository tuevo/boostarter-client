import { createSlice } from '@reduxjs/toolkit'
import { mockCampaignList } from '../../mock-data';

const campaign = createSlice(
  {
    name: 'campaigns',
    initialState: [...mockCampaignList],
    reducers: {
      addCampaign: (state, action) => {
        state.unshift(action.payload);
      }
    }
  },
);

const { reducer, actions } = campaign;
export const {
  addCampaign
} = actions;
export const campaignReducer = reducer;