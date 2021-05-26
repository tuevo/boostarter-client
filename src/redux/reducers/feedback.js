import { createSlice } from '@reduxjs/toolkit';
import { mockFeedbackList } from '../../mock-data';

const feedback = createSlice(
  {
    name: 'feedbacks',
    initialState: [...mockFeedbackList],
    reducers: {
      addFeedback: (state, action) => {
        state.unshift(action.payload);
      }
    }
  },
);

const { reducer, actions } = feedback;
export const {
  addFeedback
} = actions;
export const feedbackReducer = reducer;