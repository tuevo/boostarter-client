import { Button, Modal } from 'antd'
import React from 'react'
import './PrivacyModal.scss'
import htmlParse from 'html-react-parser';
import { APP_PRIVACY } from '../../constants';
import AppLogo from '../AppLogo';

export default function PrivacyModal({ visible, onClose }) {
    return (
        <Modal
            wrapClassName="app-privacy-modal"
            title={<AppLogo />}
            visible={visible}
            closable
            onCancel={() => onClose()}
            width={850}
            footer={<Button style={{ width: '100%' }} type="primary" size="large" onClick={() => onClose()}>Đã hiểu</Button>}
        >
            <div className="app-privacy-modal__content">
                {htmlParse(APP_PRIVACY)}
            </div>
        </Modal>
    )
}
