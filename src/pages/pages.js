import { v4 } from 'uuid';
import CampaignDetail from './CampaignDetail/CampaignDetail';

export const privatePages = [
  {
    id: v4(),
    component: CampaignDetail,
    title: 'Chi tiết chiến dịch',
    path: '/campaign/:campaignId',
    exact: true,
  }
];
