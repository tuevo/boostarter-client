import { v4 } from 'uuid';
import PersonalCampaign from './PersonalCampaign';

export const pages = [
  {
    id: v4(),
    component: PersonalCampaign,
    title: 'Chiến dịch cá nhân',
    path: '/personal-campaigns',
    exact: true,
  }
];
