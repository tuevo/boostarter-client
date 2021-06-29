const prefix = '__boostarterClient__';
export const AUTH_USER = `${prefix}authUser`;
export const USERS = `${prefix}users`;

export const saveUsersToLocalStorage = (users) => {
    if (users) {
        localStorage.setItem(USERS, JSON.stringify(users));
    }
}