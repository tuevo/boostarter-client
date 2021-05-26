import { Avatar, List } from 'antd';
import React from 'react'
import './DonationLogItem.scss';
import { format } from 'timeago.js';
import { donationMethod } from '../../constants';
import NumberFormat from 'react-number-format';

export default function DonationLogItem({ data, donationPackages }) {
  let donationPackage;
  if (data.donationMethod === donationMethod.PACKAGE && donationPackages.length > 0) {
    donationPackage = donationPackages.find(p => p.id === data.packageId);
  }

  return (
    <div className="donation-log-item">
      <span className="donation-log-item__time">
        {format(new Date(data.createdAt), 'vi')}
      </span>
      <div className="donation-log-item__owner">
        <List.Item.Meta
          avatar={<Avatar src={data.avatar} size={30} />}
          title={data.fullName}
          description={
            <div>
              {'Đã quyên góp '}
              <b>
                {`${data.donationMethod === donationMethod.PACKAGE ? `Gói ${donationPackage.title} (` : ' '}`}
                <NumberFormat
                  displayType="text"
                  value={data.pricing}
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  suffix={` ${data.currency}${data.donationMethod === donationMethod.PACKAGE ? ')' : ''}`}
                />
              </b>
            </div>
          }
        />
      </div>
    </div>
  )
}
