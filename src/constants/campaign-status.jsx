import { LoadingOutlined, CheckCircleFilled, StopOutlined, CloseCircleFilled } from '@ant-design/icons';

export const campaignStatus = {
    REVIEW: {
        name: 'Đang chờ duyệt',
        value: 1,
        color: 'processing',
    },
    OPENED: {
        name: 'Đang gây quỹ',
        value: 2,
        color: 'green',
    },
    PENDING: {
        name: 'Tạm dừng',
        value: 3,
        color: 'orange',
    },
    CLOSED: {
        name: 'Đã kết thúc',
        value: 4,
        color: 'red',
    }
}

export const getCampaignStatusIcon = (value) => {
    switch (value) {
        case campaignStatus.REVIEW.value:
            return <LoadingOutlined />;

        case campaignStatus.OPENED.value:
            return <CheckCircleFilled />;

        case campaignStatus.CLOSED.value:
            return <CloseCircleFilled />;

        case campaignStatus.PENDING.value:
            return <StopOutlined />;

        default:
            return <></>;
    }
}