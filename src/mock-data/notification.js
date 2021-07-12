import { mockUser1, mockUser2 } from "./user";

export const mockNotification1 = {
    id: 1,
    sender: mockUser2,
    receiver: mockUser1,
    content: `
        Chiến dịch <a href="/campaign/1">Vì Miền Trung Thân Yêu</a> của bạn đã được duyệt.
    `,
    createdAt: '2021-05-24T17:00:00.000Z',
}

export const mockNotification2 = {
    ...mockNotification1,
    id: 2,
    content: `
        Chiến dịch <a href="/campaign/2">Việt Sử Kiêu Hùng</a> của bạn đã được duyệt.
    `,
}

export const mockNotificationList = [
    mockNotification1,
    mockNotification2,
];