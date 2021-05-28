import { BellOutlined } from '@ant-design/icons';
import { Badge, Button } from 'antd';
import React from 'react';
import './NotificationMenu.scss';

export default function NotificationMenu() {
  return (
    <div className="app-notification-menu">
      <span className="avatar-item">
        <Badge count={1}>
          <Button icon={<BellOutlined />} shape="circle" style={{ border: 0 }} />
        </Badge>
      </span>
    </div>
  )
}
