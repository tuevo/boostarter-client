import { configureStore } from '@reduxjs/toolkit'
import { appReducer, campaignReducer, donationPackageReducer, feedbackReducer, postedStatusReducer, userReducer } from './reducers'

const rootReducer = {
    app: appReducer,
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