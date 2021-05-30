import { Form, Input, Modal } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import Editor from '../Editor/Editor';
import SingleImageUpload from '../SingleImageUpload';
import './CreateDonationPackage.scss';

export default function CreateDonationPackageModal({ visible, data, onClose, onSubmit }) {
  return (
    <Modal
      wrapClassName="create-donation-package-modal"
      title="Tạo gói quyên góp mới"
      visible={visible}
      closable
      onCancel={() => onClose()}
      onOk={() => onSubmit()}
      width={800}
      okText="Hoàn tất"
      cancelText="Hủy bỏ"
    >
      <Form
        labelAlign="left"
        labelCol={{ span: 4 }}
      >
        <div className="create-donation-package-modal__thumbnail-upload">
          <SingleImageUpload
            uploadText="Tải ảnh lên"
            onImageChange={img => { }}
          />
        </div>
        <Form.Item
          label="Tên gói"
          name="title"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số tiền"
          name="pricing"
        >
          <Input />
        </Form.Item>
        <Text>Chính sách tri ân</Text>
        <div className="create-donation-package-modal__desc-editor">
          <Editor />
        </div>
      </Form>
    </Modal>
  )
}
