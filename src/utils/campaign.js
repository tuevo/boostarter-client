import { campaignStatus } from "../constants";

export const isPublicCampaign = (c) => ![
    campaignStatus.REVIEW.value, campaignStatus.DISAPPROVED.value, campaignStatus.REMOVED.value
].includes(c.status.value);