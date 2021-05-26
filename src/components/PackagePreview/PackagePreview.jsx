import { Card } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react'
import './PackagePreview.scss';
import NumberFormat from 'react-number-format';

export default function PackagePreview({ data, onClick }) {
  return (
    <Card className="package-preview" onClick={() => onClick && onClick(data)}>
      <img src={data.thumbnail} alt="" />
      <div className="package-preview__content">
        <Title level={5}>{data.title}</Title>
        <Title className="pricing" level={4}>
          <NumberFormat
            displayType="text"
            value={data.pricing}
            thousandSeparator={'.'}
            decimalSeparator={','}
            suffix={` ${data.currency}`}
          />
        </Title>
        <div className="desc">{data.desc}</div>
      </div>
    </Card>
  )
}
