import { Button, List, Menu, Modal } from 'antd';
import QueueAnim from 'rc-queue-anim';
import React, { useState } from 'react';
import AppLogo from '../AppLogo';
import './QRPaymentModal.scss';

export default function QRPaymentModal({ visible, onClose }) {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
    const [shouldShowQRCode, showQRCode] = useState(false);

    const paymentMethods = [
        {
            name: 'MoMo',
            value: '1',
            desc: 'Vui lòng cài đặt ứng dụng MoMo trước khi thanh toán',
            logo: 'https://upload.wikimedia.org/wikipedia/vi/archive/f/fe/20201011055543%21MoMo_Logo.png',
            qrCode: 'https://www.linkpicture.com/q/Screenshot-from-2021-07-04-17-07-12.png'
        },
        {
            name: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)',
            value: '2',
            desc: 'Vui lòng cài đặt ứng dụng VCB Digibank trước khi thanh toán',
            logo: 'https://www.vncex.com/assets/Upload/Bank/VCB/VCB.png',
            qrCode: 'https://www.linkpicture.com/q/Screenshot-from-2021-07-04-17-16-31.png'
        }
    ];

    const handleClose = () => {
        showQRCode(false);
        onClose();
    }

    return (
        <Modal
            wrapClassName="qr-payment-modal"
            closable
            onCancel={() => handleClose()}
            visible={visible}
            footer={null}
            width={600}
        >
            {shouldShowQRCode ? (
                <>
                    <div className="qr-payment-modal__content animate__animated animate__fadeIn">
                        <div className="qr-payment-modal__logo">
                            <AppLogo />
                        </div>
                        <div className="qr-payment-modal__qr-code-wrapper">
                            <img className="qr-payment-modal__qr-code" src={selectedPaymentMethod.qrCode} alt={selectedPaymentMethod.name} />
                            <p>Vui lòng quét mã QR trên để thanh toán</p>
                        </div>
                    </div>
                    <Button onClick={() => handleClose()} style={{ width: '100%' }} type="primary" size="large">Hoàn tất</Button>
                </>
            ) : (
                <>
                    <div className="qr-payment-modal__choose-payment-method">
                        <h4 className="qr-payment-modal__choose-payment-method__title">Vui lòng chọn phương thức thanh toán</h4>
                        <QueueAnim delay={300}>
                            <div key="menu">
                                <Menu onClick={e => {
                                    const index = paymentMethods.findIndex((m) => m.value === e.key);
                                    if (index > -1) {
                                        setSelectedPaymentMethod(paymentMethods[index]);
                                    }
                                }}>
                                    {paymentMethods.map((m) => (
                                        <Menu.Item key={m.value}>
                                            <List.Item.Meta
                                                avatar={<img className="payment-method__logo" src={m.logo} alt={m.value} />}
                                                title={m.name}
                                                description={m.desc}
                                            />
                                        </Menu.Item>
                                    ))}
                                </Menu>
                            </div>
                        </QueueAnim>
                    </div>
                    <Button
                        onClick={() => showQRCode(true)}
                        style={{ width: '100%' }}
                        type="primary"
                        size="large"
                        disabled={!selectedPaymentMethod}
                    >
                        Tiếp tục
                    </Button>
                </>
            )}
        </Modal>
    )
}
