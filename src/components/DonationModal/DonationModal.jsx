import { Button, Divider, Input, message, Modal } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
import PackagePreview from '../PackagePreview';
import './DonationModal.scss';

export default function DonationModal({ visible, onClose, data, onSubmit }) {
  const [cash, setCash] = useState('');

  const submit = (option, pkg) => {
    if (option === 1 && !cash) {
      message.error('Vui lòng nhập số tiền');
      return;
    }

    if (option === 1) {
      onSubmit(option, cash);
    }

    if (option === 2) {
      onSubmit(option, pkg);
    }
  }

  return (
    <Modal
      wrapClassName="donation-modal"
      closable
      visible={visible}
      footer={null}
      onCancel={() => onClose()}
      width={600}
    >
      <div>
        <Title level={3}>Quyên góp cho chiến dịch này</Title>
        <Title level={5}>Nhập số tiền</Title>
        <div className="donation-modal__cash-input">
          <div style={{ display: 'flex' }}>
            <Input onKeyUp={e => setCash(e.target.value)} suffix={data.currency} size="large" placeholder={`Tối thiểu 10.000`} />
            <Button
              className="donation-modal__cash-input__btn-submit"
              type="primary"
              size="large"
              onClick={() => submit(1)}
            >
              Tiếp tục
          </Button>
          </div>
          <p className="donation-modal__cash-input__note">
            <span style={{ color: 'red' }}>*</span> Quyên góp bằng hình thức này sẽ không liên quan đến các <b>Gói quyên góp</b> của chiến dịch này.
          </p>
        </div>
        <Divider>Hoặc</Divider>
        <Title level={5}>Chọn gói quyên góp</Title>
        <div className="donation-modal__packages">
          {data.packages.map(p => (
            <div key={p.id} className="donation-modal__packages__item">
              <PackagePreview data={p} onClick={_data => submit(2, _data)} />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}