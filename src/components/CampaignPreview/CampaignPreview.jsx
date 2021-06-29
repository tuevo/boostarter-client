import { CheckCircleFilled, ClockCircleFilled, StarFilled } from '@ant-design/icons';
import { Avatar, Card, Progress, Tag } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import NumberFormat from 'react-number-format';
import { NavLink } from 'react-router-dom';
import { daysFromNow } from '../../utils/date-time';
import './CampaignPreview.scss';

const { Meta } = Card;

export default function CampaignPreview({ data, featured, from }) {
    const currentRaisePercent = Math.round(data.currentRaise / data.targetRaise * 100);
    const currentRaisePeriod = daysFromNow(data.endDate);

    if (featured) {
        return (
            <div
                className="featured-campaign-preview"
                style={{ backgroundImage: `url(${data.thumbnail})` }}
            >
                <div className="dark-cover">
                    <div className="footer">
                        <Title className="title" level={2}>
                            <NavLink to={`/campaign/${data.id}?tab=1${from ? `&from=${from}` : ''}`}>{data.title}</NavLink>
                        </Title>
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
                            <Title className="title" level={5}>
                                <NavLink to={`/campaign/${data.id}?tab=1${from ? `&from=${from}` : ''}`}>{data.title}</NavLink>
                            </Title>
                            <div className="subtitle">
                                <Tag color={data.status?.color}>{data.status?.name}</Tag>
                                <div className="rating">
                                    <span>{data.rating}</span>
                                    <StarFilled className="icon" />
                                </div>
                            </div>
                        </>
                    )}
                />
                <div className="footer">
                    <p className="desc">{data.desc}</p>
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
                        <Progress
                            percent={currentRaisePercent}
                            showInfo={false}
                            status="active"
                            strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }}
                        />
                        <div className="section-2">
                            <ClockCircleFilled className="icon" />
                            <NumberFormat
                                displayType="text"
                                value={currentRaisePeriod}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                prefix={'Còn '}
                                suffix={' ngày'}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
