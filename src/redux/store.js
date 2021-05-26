import { configureStore } from '@reduxjs/toolkit'
import { campaignReducer, donationPackageReducer, feedbackReducer, postedStatusReducer, userReducer } from './reducers'

const rootReducer = {
  campaigns: campaignReducer,
  user: userReducer,
  feedbacks: feedbackReducer,
  postedStatuses: postedStatusReducer,
  donationPackages: donationPackageReducer,
}

const store = configureStore({
  reducer: rootReducer
});

export default store;