export const userRole = {
    CAMPAIGN_OWNER: {
        name: 'Nhà vận động',
        value: 1
    },
    DONATOR: {
        name: 'Nhà quyên góp',
        value: 2
    },
    ADMIN: {
        name: 'Quản trị viên',
        value: 3
    }
}

export const mapUserRole = (value) => {
    switch (value) {
        case userRole.CAMPAIGN_OWNER.value:
            return userRole.CAMPAIGN_OWNER;
        case userRole.DONATOR.value:
            return userRole.DONATOR;
        case userRole.ADMIN.value:
            return userRole.ADMIN;
        default:
            return undefined;
    }
}