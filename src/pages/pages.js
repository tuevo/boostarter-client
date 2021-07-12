import { v4 } from 'uuid';
import CampaignList from './CampaignList/CampaignList';
import FollowingCampaigns from './FollowingCampaigns/FollowingCampaigns';
import PersonalCampaign from './PersonalCampaign';

export const pages = [
    {
        id: v4(),
        component: PersonalCampaign,
        title: 'Chiến dịch cá nhân',
        path: '/personal-campaigns',
        exact: true,
    },
    {
        id: v4(),
        component: CampaignList,
        title: 'Tất cả chiến dịch',
        path: '/campaigns',
        exact: true,
    },
    {
        id: v4(),
        component: FollowingCampaigns,
        title: 'Chiến dịch theo dõi',
        path: '/following-campaigns',
        exact: true,
    }
];
