import { createSlice } from '@reduxjs/toolkit';
import { mockPackageList } from '../../mock-data';

const donationPackage = createSlice(
  {
    name: 'donationPackages',
    initialState: [...mockPackageList],
    reducers: {
      addDonationPackage: (state, action) => {
        state.unshift(action.payload);
      }
    }
  },
);

const { reducer, actions } = donationPackage;
export const {
  addDonationPackage
} = actions;
export const donationPackageReducer = reducer;