import { BellOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, List, Tag, Empty } from 'antd';
import Title from 'antd/lib/typography/Title';
import htmlParse from 'html-react-parser';
import React from 'react';
import { format } from 'timeago.js';
import { userRole } from '../../constants';
import './NotificationMenu.scss';

export default function NotificationMenu({ notifications }) {
    return (
        <div className="app-notification-menu">
            <span className="avatar-item">
                <Badge count={notifications.length}>
                    <Dropdown
                        placement="bottomRight"
                        trigger={['click']}
                        overlay={(
                            <div className="app-notification-menu__container">
                                <Title level={5}>Thông báo</Title>
                                {notifications.length > 0 ? (
                                    <List className="app-notification-menu__notifications">
                                        {notifications.map((data) => (
                                            <List.Item key={data.id} style={{ paddingTop: 20 }}>
                                                <List.Item.Meta
                                                    avatar={<Avatar src={data.sender.avatar} size={45} />}
                                                    title={
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <div>
                                                                <span style={{ marginRight: 5 }}><b>{data.sender.fullName}</b></span>
                                                                {data.sender.role.value === userRole.ADMIN.value && (
                                                                    <Tag color="purple">{userRole.ADMIN.name}</Tag>
                                                                )}
                                                                {data.sender.isCampaignOwner && (
                                                                    <Tag color="processing">Chủ chiến dịch</Tag>
                                                                )}
                                                            </div>
                                                            <span style={{ color: 'rgba(0,0,0,0.45)' }}>{format(new Date(data.createdAt), 'vi')}</span>
                                                        </div>
                                                    }
                                                    description={<p style={{ whiteSpace: 'normal' }}>{htmlParse(data.content)}</p>}
                                                />
                                            </List.Item>
                                        ))}
                                    </List>
                                ) : (
                                    <div style={{ padding: '100px 0' }}>
                                        <Empty description="Chưa có thông báo nào." image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                    </div>
                                )}
                            </div>
                        )}
                    >
                        <Button icon={<BellOutlined />} shape="circle" style={{ border: 0 }} />
                    </Dropdown>

                </Badge>
            </span>
        </div>
    )
}
