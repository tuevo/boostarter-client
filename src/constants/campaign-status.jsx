import { LoadingOutlined, CheckCircleFilled, StopOutlined, CloseCircleFilled, DeleteFilled } from '@ant-design/icons';

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
    },
    DISAPPROVED: {
        name: 'Bị từ chối',
        value: 5,
        color: 'red',
    },
    REMOVED: {
        name: 'Đã bị gỡ bỏ',
        value: 6,
        color: 'red',
    },
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

        case campaignStatus.DISAPPROVED.value:
            return <StopOutlined />;

        case campaignStatus.REMOVED.value:
            return <DeleteFilled />;

        default:
            return <></>;
    }
}