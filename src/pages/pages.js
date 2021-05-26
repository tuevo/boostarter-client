import { v4 } from 'uuid';
import CampaignDetail from './CampaignDetail/CampaignDetail';
import PersonalCampaign from './PersonalCampaign';

export const pages = [
  {
    id: v4(),
    component: CampaignDetail,
    title: 'Chi tiết chiến dịch',
    path: '/campaign/:id',
    exact: true,
  },
  {
    id: v4(),
    component: PersonalCampaign,
    title: 'Chiến dịch cá nhân',
    path: '/personal-campaigns',
    exact: true,
  }
];
