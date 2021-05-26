import { donationMethod } from "../constants";

export const mockDonationLog1 = {
  id: 1,
  avatar: 'https://i.ibb.co/wMrWZjf/thunguyen.jpg',
  fullName: 'Thu Nguyen',
  createdAt: '2021-05-24T17:00:00.000Z',
  donationMethod: donationMethod.CASH,
  pricing: 100000,
  currency: 'VNĐ',
}

export const mockDonationLog2 = {
  ...mockDonationLog1,
  id: 2,
  avatar: 'https://i.ibb.co/cbrx5yX/viettran.jpg',
  fullName: 'Viet Tran',
  donationMethod: donationMethod.PACKAGE,
  packageId: 3
}

export const mockDonationLog3 = {
  ...mockDonationLog1,
  id: 3,
  avatar: 'https://i.ibb.co/4S5VkHy/vienhuynh.jpg',
  fullName: 'Vien Huynh',
  donationMethod: donationMethod.PACKAGE,
  packageId: 4
}

export const mockDonationLogList = [
  mockDonationLog1,
  mockDonationLog2,
  mockDonationLog3,
]