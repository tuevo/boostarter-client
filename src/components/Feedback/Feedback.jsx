import { Avatar, Rate, Tag } from 'antd';
import React from 'react';
import './Feedback.scss';
import { format } from 'timeago.js';
import { CheckCircleFilled } from '@ant-design/icons';

export default function Feedback({ data }) {
  const size = 42;

  return (
    <div className="app-feedback">
      {data.isCampaignOwner ? (
        <div className="app-feedback__owner-avatar" style={{ width: size, height: size }}>
          <Avatar src={data.avatar} size={size} />
          <CheckCircleFilled className="famous-icon" />
          <div className="famous-icon-bg"></div>
        </div>
      ) : (
        <Avatar src={data.avatar} size={size} />
      )}
      <div className="app-feedback__content">
        <div className="app-feedback__content__title">
          <span className="full-name">{data.fullName}</span>
          <span className="time">{` • ${format(new Date(data.createdAt), 'vi')}`}</span>
          {data.isCampaignOwner && (<Tag color="processing">Chủ chiến dịch</Tag>)}
        </div>
        {!data.isCampaignOwner && (
          <Rate defaultValue={data.rating} allowHalf disabled style={{ fontSize: 16 }} />
        )}
        <p>{data.comment}</p>
      </div>
    </div>
  )
}
