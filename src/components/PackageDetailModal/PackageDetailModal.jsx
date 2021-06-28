import { Button, Modal } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import NumberFormat from 'react-number-format';
import ReadMoreLessText from '../ReadMoreLessText';
import './PackageDetailModal.scss';

export default function PackageDetailModal({ data, visible, onClose, onDonate, btnDonateVisible }) {
    return (
        <Modal
            wrapClassName="package-detail-modal"
            title="Thông tin chi tiết gói"
            visible={visible}
            closable
            onCancel={() => onClose()}
            width={600}
            footer={null}
        >
            <div className="package-detail-modal__header">
                <img src={data.thumbnail} alt="" />
                <div className="package-detail-modal__header__cover">
                    <div className="package-detail-modal__header__cover__footer">
                        <Title level={4}>{data.title}</Title>
                        <NumberFormat
                            className="package-detail-modal__pricing"
                            displayType="text"
                            value={data.pricing}
                            thousandSeparator="."
                            decimalSeparator=","
                            suffix={` ${data.currency}`}
                        />
                    </div>
                </div>
            </div>
            <div className="package-detail-modal__body">
                <ReadMoreLessText
                    lines={4}
                    text={data.desc}
                />
            </div>
            <div className="package-detail-modal__btn-donate">
                {btnDonateVisible && (
                    <Button
                        style={{ width: '100%' }}
                        size="large"
                        type="primary"
                        onClick={() => onDonate()}
                    >
                        Quyên góp
                    </Button>
                )}
            </div>
        </Modal>
    )
}
