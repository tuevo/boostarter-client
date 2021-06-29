import { LoadingOutlined, CheckCircleFilled, StopOutlined, CloseCircleFilled } from '@ant-design/icons';

export const campaignStatus = {
    REVIEW: {
        name: 'Đang chờ duyệt',
        value: 1,
        color: 'processing',
        icon: <LoadingOutlined />
    },
    OPENED: {
        name: 'Đang gây quỹ',
        value: 2,
        color: 'green',
        icon: <CheckCircleFilled />
    },
    PENDING: {
        name: 'Tạm dừng',
        value: 3,
        color: 'orange',
        icon: <StopOutlined />
    },
    CLOSED: {
        name: 'Đã kết thúc',
        value: 4,
        color: 'red',
        icon: <CloseCircleFilled />
    }
}