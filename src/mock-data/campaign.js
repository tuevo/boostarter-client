import campaignStatus from "../constants/campaign-status";

export const mockCampaign1 = {
  id: 1,
  thumbnail: 'https://pbs.twimg.com/media/E0xmq8MXIAM4aTa?format=jpg&name=4096x4096',
  title: 'VÌ MIỀN TRUNG THÂN YÊU',
  desc: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores',
  category: 'THIỆN NGUYỆN',
  tags: ['THIỆN NGUYỆN', 'HƯỚNG VỀ MIỀN TRUNG'],
  targetRaise: 16600000,
  currentRaise: 12500000,
  currency: 'VNĐ',
  currentPeriod: 'Còn 15 ngày',
  status: campaignStatus.OPENED,
  rating: 4.5,
  numberOfRatings: 1250,
  story: 'story',
  donationPackages: [
    {
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVY0YhJwsiGFMZG41z08Qmzn9wZ_UkkQfDUw&usqp=CAU',
      title: 'QUÀ TRI ÂN + THƯ CẢM ƠN',
      pricing: 2000000,
      desc: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores. praesentium.',
    },
  ],
  owner: {
    avatar: 'https://i.ibb.co/F3nwvK8/tuevo.jpg',
    name: 'Tue Vo',
    isFamous: true,
    numberOfCampaigns: 28,
    location: 'TP. Hồ Chí Minh, Việt Nam',
  },
  contact: {
    website: 'https://tuevo-resume.herokuapp.com',
    facebook: 'https://fb.com/tuevo0312',
  },
  feedbacks: [
    {
      id: 1,
      avatar: 'https://i.ibb.co/wMrWZjf/thunguyen.jpg',
      name: 'Thu Nguyen',
      createdAt: '2021-06-23T18:30:00.000Z',
      isCampaignOwner: false,
      rating: 4.5,
      comment: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias. vero eos et accusamus et iusto odio dignissimos.'
    },
    {
      id: 2,
      avatar: 'https://i.ibb.co/cbrx5yX/viettran.jpg',
      name: 'Viet Tran',
      isCampaignOwner: false,
      createdAt: '2021-06-23T18:30:00.000Z',
      rating: 4.5,
      comment: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias. vero eos et accusamus et iusto odio dignissimos.'
    },
    {
      id: 3,
      avatar: 'https://i.ibb.co/F3nwvK8/tuevo.jpg',
      name: 'Tue Vo',
      isCampaignOwner: true,
      createdAt: '2021-06-23T18:30:00.000Z',
      comment: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias. vero eos et accusamus et iusto odio dignissimos.'
    },
    {
      id: 4,
      avatar: 'https://i.ibb.co/4S5VkHy/vienhuynh.jpg',
      name: 'Vien Huynh',
      isCampaignOwner: false,
      createdAt: '2021-06-23T18:30:00.000Z',
      rating: 4.5,
      comment: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias. vero eos et accusamus et iusto odio dignissimos.'
    },
  ],
  timelines: [
    {
      createdAt: '2021-06-23T18:30:00.000Z',
      content: 'Content',
    },
    {
      createdAt: '2021-06-23T18:30:00.000Z',
      content: 'Content',
    },
    {
      createdAt: '2021-06-23T18:30:00.000Z',
      content: 'Content',
    },
  ]
}

export const mockCampaign2 = {
  ...mockCampaign1,
  id: 2,
  thumbnail: 'https://i.ibb.co/t4HR0Z8/tran-hung-daovuong.jpg',
  title: 'VIỆT SỬ KIÊU HÙNG',
  category: 'SÁNG TẠO NỘI DUNG'
}

export const mockCampaign3 = {
  ...mockCampaign1,
  id: 3,
  thumbnail: 'https://i.ibb.co/j8YrN02/1-58.jpg',
  title: 'BỮA CƠM TÌNH THƯƠNG',
}

export const mockCampaign4 = {
  ...mockCampaign1,
  id: 4,
  thumbnail: 'https://i.ibb.co/kcB08q0/ong-hut-than-thien-moi-truong-4.jpg',
  title: 'ỐNG HÚT SẠCH',
  category: 'CÔNG NGHỆ & ĐỔI MỚI'
}

export const mockCampaignList = [
  mockCampaign1,
  mockCampaign2,
  mockCampaign3,
  mockCampaign4,
];