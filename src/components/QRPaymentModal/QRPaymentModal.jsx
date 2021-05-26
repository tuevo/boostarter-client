import { Button, Modal } from 'antd';
import React from 'react';
import './QRPaymentModal.scss';
import AppLogo from '../AppLogo';

export default function QRPaymentModal({ visible, onClose }) {
  return (
    <Modal
      wrapClassName="qr-payment-modal"
      closable
      onCancel={() => onClose()}
      visible={visible}
      footer={null}
      width={600}
    >
      <div className="qr-payment-modal__content">
        <div className="qr-payment-modal__logo">
          <AppLogo />
        </div>
        <div className="qr-payment-modal__qr-code-wrapper">
          <img className="qr-payment-modal__qr-code" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="" />
          <p>Vui lòng quét mã QR trên để thanh toán</p>
        </div>
      </div>
      <Button onClick={() => onClose()} style={{ width: '100%' }} type="primary" size="large">Hoàn tất</Button>
    </Modal>
  )
}
