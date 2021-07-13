const prefix = '__boostarterClient__';
export const AUTH_USER = `${prefix}authUser`;
export const USERS = `${prefix}users`;
export const CAMPAIGNS = `${prefix}campaigns`;
export const NOTIFICATIONS = `${prefix}notifications`;
export const POSTED_STATUS = `${prefix}postedStatuses`;

export const saveUsersToLocalStorage = (users) => {
    localStorage.setItem(USERS, JSON.stringify(users));
}

export const saveCampaignsToLocalStorage = (campaigns) => {
    localStorage.setItem(CAMPAIGNS, JSON.stringify(campaigns));
}

export const saveNotificationsToLocalStorage = (notifications) => {
    localStorage.setItem(NOTIFICATIONS, JSON.stringify(notifications));
}

export const savePostedStatusesToLocalStorage = (postedStatuses) => {
    localStorage.setItem(POSTED_STATUS, JSON.stringify(postedStatuses));
}