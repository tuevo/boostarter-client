const prefix = '__boostarterClient__';
export const AUTH_USER = `${prefix}authUser`;
export const USERS = `${prefix}users`;
export const CAMPAIGNS = `${prefix}campaigns`;

export const saveUsersToLocalStorage = (users) => {
    localStorage.setItem(USERS, JSON.stringify(users));
}

export const saveCampaignsToLocalStorage = (campaigns) => {
    localStorage.setItem(CAMPAIGNS, JSON.stringify(campaigns));
}