import { campaignStatus } from "../constants";
import { mockDonationLogList } from './donation-log';
import { mockFeedbackList } from "./feedback";
import { mockPackageList } from "./package";
import { mockPostedStatusList } from "./posted-status";
import { mockUser1 } from "./user";

export const newCampaign = {
    isPrivate: true,
    isFollowed: false,
    currentRaise: 0,
    status: campaignStatus.REVIEW,
    rating: 0,
    numberOfRatings: 0,
    postedStatuses: [],
    donationLogs: [],
    feedbacks: [],
}

export const mockCampaign1 = {
    id: 1,
    isPrivate: false,
    isFollowed: false,
    thumbnail: 'https://pbs.twimg.com/media/E0xmq8MXIAM4aTa?format=jpg&name=4096x4096',
    title: 'VÌ MIỀN TRUNG THÂN YÊU',
    desc: 'Nhìn lại toàn bộ đợt "lũ chồng lũ, bão chồng bão" trong suốt tháng 10 vừa qua trên dải đất miền Trung ruột thịt, để thấy rõ hơn những yêu cầu nhiệm vụ, cũng như bài học kinh nghiệm và biện pháp ứng phó nhằm giảm thiểu tối đa thiệt hại do thiên tai gây ra, hỗ trợ hiệu quả, giúp nhân dân khu vực bị ảnh hưởng sớm ổn định đời sống, khôi phục sản xuất.',
    categoryId: 2,
    tags: ['thiennguyen', 'huongvemientrung'],
    targetRaise: 16600000,
    currentRaise: 12500000,
    currentRaisePeriod: 'Còn 14 ngày',
    currency: 'VNĐ',
    startDate: '2021-05-24T17:00:00.000Z',
    endDate: '2021-06-08T17:00:00.000Z',
    status: campaignStatus.OPENED,
    rating: 4.5,
    numberOfRatings: 1250,
    story: `
    <p><b>
      Những ngày này, nhân dân cả nước cùng với Đảng, Chính phủ, các lực lượng quân đội, công an, các ngành chức năng đang nỗ lực, khẩn trương hỗ trợ các tỉnh, thành phố miền Trung khắc phục quả nặng nề do thiên tai gây ra.
    </b></p>
    <br>
    <img src="https://images.hcmcpv.org.vn/res/news/2020/11/01-11-2020-lu-chong-lu-bao-chong-bao-mien-trung-huy-dong-tong-luc-de-ung-pho-1F592CBF-details.jpg?vs=01112020084546" />
    <center><i>Thôn Hữu Tân, xã Tân Ninh, huyện Quảng Ninh (Quảng Bình) bị nước lũ cô lập hoàn toàn. (Ảnh: TTXVN)</i></center>
    <br>
    <p>
    Những ngày này, nhân dân cả nước cùng với Đảng, Chính phủ, các lực lượng quân đội, công an, các ngành chức năng đang nỗ lực, khẩn trương hỗ trợ các tỉnh, thành phố miền Trung khắc phục quả nặng nề do thiên tai gây ra.
    </p>
    <br>
    <p>
    Nhìn lại toàn bộ đợt "lũ chồng lũ, bão chồng bão" trong suốt tháng 10 vừa qua trên dải đất miền Trung ruột thịt, để thấy rõ hơn những yêu cầu nhiệm vụ, cũng như bài học kinh nghiệm và biện pháp ứng phó nhằm giảm thiểu tối đa thiệt hại do thiên tai gây ra, hỗ trợ hiệu quả, giúp nhân dân khu vực bị ảnh hưởng sớm ổn định đời sống, khôi phục sản xuất.
    </p>
  `,
    packages: mockPackageList,
    owner: mockUser1,
    website: 'https://tuevo-resume.herokuapp.com',
    facebook: 'https://fb.com/tuevo0312',
    feedbacks: mockFeedbackList,
    postedStatuses: mockPostedStatusList,
    donationLogs: mockDonationLogList,
    stander: {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Emblem_of_Vietnamese_Buddhist_Sangha.svg/1200px-Emblem_of_Vietnamese_Buddhist_Sangha.svg.png',
        name: 'Giáo hội Phật giáo Việt Nam',
        introduction: 'Giáo hội Phật giáo Việt Nam là tổ chức Phật giáo toàn quốc của Việt Nam, là đại diện Tăng, Ni, Phật tử Việt Nam trong và ngoài nước, là thành viên các tổ chức Phật giáo Quốc tế mà Giáo hội tham gia và là thành viên của Mặt trận Tổ quốc Việt Nam.',
        website: 'https://phatgiao.org.vn'
    },
}

export const mockCampaign2 = {
    ...mockCampaign1,
    id: 2,
    thumbnail: 'https://i.ibb.co/t4HR0Z8/tran-hung-daovuong.jpg',
    title: 'VIỆT SỬ KIÊU HÙNG',
    categoryId: 3,
    status: campaignStatus.OPENED,
}

export const mockCampaign3 = {
    ...mockCampaign1,
    id: 3,
    thumbnail: 'https://i.ibb.co/j8YrN02/1-58.jpg',
    title: 'BỮA CƠM TÌNH THƯƠNG',
    categoryId: 2,
    status: campaignStatus.REVIEW,
    isPrivate: true,
}

export const mockCampaign4 = {
    ...mockCampaign1,
    id: 4,
    thumbnail: 'https://i.ibb.co/kcB08q0/ong-hut-than-thien-moi-truong-4.jpg',
    title: 'ỐNG HÚT SẠCH',
    categoryId: 1,
    status: campaignStatus.PENDING,
}

export const mockCampaign5 = {
    ...mockCampaign1,
    id: 5,
    thumbnail: 'https://i.ibb.co/tXdmdP1/c6680b1f-96c5-47c9-8250-302bf94e6932-rw-1920.jpg',
    title: 'ẤN TỐNG KINH SÁCH',
    categoryId: 2,
    status: campaignStatus.CLOSED,
}

export const mockCampaign6 = {
    ...mockCampaign1,
    id: 6,
    thumbnail: 'https://i.ibb.co/kcB08q0/ong-hut-than-thien-moi-truong-4.jpg',
    title: 'ỐNG HÚT SẠCH',
    categoryId: 1,
    status: campaignStatus.PENDING,
}

export const mockCampaign7 = {
    ...mockCampaign1,
    id: 7,
    thumbnail: 'https://i.ibb.co/t4HR0Z8/tran-hung-daovuong.jpg',
    title: 'VIỆT SỬ KIÊU HÙNG',
    categoryId: 3,
    status: campaignStatus.OPENED,
}

export const mockCampaign8 = {
    ...mockCampaign1,
    id: 8,
    thumbnail: 'https://i.ibb.co/j8YrN02/1-58.jpg',
    title: 'BỮA CƠM TÌNH THƯƠNG',
    categoryId: 2,
    status: campaignStatus.REVIEW,
    isPrivate: true,
}

export const mockCampaignList = [
    mockCampaign1,
    mockCampaign2,
    mockCampaign3,
    mockCampaign4,
    mockCampaign5,
    mockCampaign6,
    mockCampaign7,
    mockCampaign8,
];