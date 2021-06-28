import { Button, Divider, Input, message, Modal } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';
import BetterInputNumber from '../BetterInputNumber';
import PackagePreview from '../PackagePreview';
import './DonationModal.scss';

export default function DonationModal({ visible, onClose, data, onSubmit }) {
    const [cash, setCash] = useState('');
    const [cashInputPlaceholder, setCashInputPlaceholder] = useState('');
    const [cashInputRange, setCashInputRange] = useState({
        min: 0,
        max: 0,
    })

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

    useEffect(() => {
        switch (data.currency) {
            case 'VNĐ':
                setCashInputPlaceholder('Tối thiểu 20.000, tối đa 100.000.000');
                setCashInputRange({
                    min: 20000,
                    max: 100000000
                });
                break;

            case 'USD':
                setCashInputPlaceholder('Tối thiểu 1, tối đa 5.000');
                setCashInputRange({
                    min: 1,
                    max: 5000
                });
                break;

            default:
                break;
        }
    }, [data]);

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
                        <div style={{ flexGrow: 1 }}>
                            <BetterInputNumber
                                {...cashInputRange}
                                size="large"
                                addonAfter={data.currency}
                                onChange={value => setCash(value)}
                                placeholder={cashInputPlaceholder}
                            />
                        </div>
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
                <Divider className="donation-modal__divider">Hoặc</Divider>
                <Title level={5}>Chọn gói quyên góp</Title>
                <div className="donation-modal__packages">
                    {data.packages.map(p => (
                        <div key={p.id} className="donation-modal__packages__item">
                            <PackagePreview
                                data={p}
                                onClick={packageData => submit(2, packageData)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    )
}