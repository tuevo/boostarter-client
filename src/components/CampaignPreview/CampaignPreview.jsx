import { CheckCircleFilled, ClockCircleFilled, StarFilled } from '@ant-design/icons';
import { Avatar, Card, Progress, Tag } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import './CampaignPreview.scss';
import NumberFormat from 'react-number-format';

const { Meta } = Card;

export default function CampaignPreview({ data, featured }) {
  const currentRaisePercent = Math.round(data.currentRaise / data.targetRaise * 100);

  if (featured) {
    return (
      <div
        className="featured-campaign-preview"
        style={{ backgroundImage: `url(${data.thumbnail})` }}
      >
        <div className="dark-cover">
          <div className="footer">
            <Title className="title" level={2}>{data.title}</Title>
            <Title className="raise" level={3}>
              <NumberFormat
                displayType="text"
                value={data.currentRaise}
                thousandSeparator={'.'}
                decimalSeparator={','}
                suffix={` ${data.currency}`}
              />
            </Title>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="campaign-preview">
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src={data.thumbnail}
          />
        }
      >
        <Meta
          avatar={
            <div className="owner-avatar">
              <Avatar src={data.owner.avatar} />
              <CheckCircleFilled className="famous-icon" />
              <div className="famous-icon-bg"></div>
            </div>
          }
          title={(
            <>
              <Title level={5}>{data.title}</Title>
              <div className="subtitle">
                <Tag color={data.status.color}>{data.status.name}</Tag>
                <div className="rating">
                  <span>{data.rating}</span>
                  <StarFilled className="icon" />
                </div>
              </div>
            </>
          )}
          description={data.desc}
        />
        <div className="footer">
          <p className="category">{data.category}</p>
          <div className="raise-info">
            <div className="section-1">
              <Title level={5} style={{ margin: 0 }}>
                <NumberFormat
                  displayType="text"
                  value={data.currentRaise}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  suffix={` ${data.currency}`}
                />
              </Title>
              <p className="current-raise-percent">
                {currentRaisePercent}%
              </p>
            </div>
            <Progress percent={currentRaisePercent} showInfo={false} status="active" />
            <div className="section-2">
              <ClockCircleFilled className="icon" />
              <span>{data.currentPeriod}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
