import { defaultUserAvatar, userRole } from "../constants";

export const newUser = {
    avatar: defaultUserAvatar,
    isFamous: false,
    numberOfCampaigns: 0,
    location: 'TP. Hồ Chí Minh, Việt Nam',
    bio: {}
}

export const mockUser1 = {
    id: 1,
    avatar: 'https://i.ibb.co/F3nwvK8/tuevo.jpg',
    fullName: 'Tue Vo',
    isFamous: true,
    numberOfCampaigns: 28,
    location: 'TP. Hồ Chí Minh, Việt Nam',
    role: userRole.CAMPAIGN_OWNER,
    bio: {
        role: 'CEO',
        organization: 'Quỹ từ thiện TueIT',
    },
    password: '123456',
    email: 'owner@gmail.com',
}

export const mockUser2 = {
    ...mockUser1,
    id: 2,
    avatar: 'https://i.ibb.co/wMrWZjf/thunguyen.jpg',
    fullName: 'Thu Nguyen',
    role: userRole.ADMIN,
    bio: {
        role: 'CEO',
        organization: 'Quỹ từ thiện ThuRapper'
    },
    email: 'admin@gmail.com',
}

export const mockUser3 = {
    ...mockUser1,
    id: 3,
    avatar: 'https://i.ibb.co/cbrx5yX/viettran.jpg',
    fullName: 'Viet Tran',
    role: userRole.DONATOR,
    bio: {
        role: 'CEO',
        organization: 'Quỹ từ thiện DuckyTran',
    },
    email: 'donator2@gmail.com',
}

export const mockUser4 = {
    ...mockUser1,
    id: 4,
    avatar: 'https://i.ibb.co/4S5VkHy/vienhuynh.jpg',
    fullName: 'Vien Huynh',
    role: userRole.DONATOR,
    bio: {
        role: 'CEO',
        organization: 'Quỹ từ thiện TIIT',
    },
    email: 'donator@gmail.com',
}

export const mockUserList = [
    mockUser1,
    mockUser2,
    mockUser3,
    mockUser4,
]
