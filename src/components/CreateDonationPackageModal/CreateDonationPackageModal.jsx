import { Button, Form, Input, message, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import BetterInputNumber from '../BetterInputNumber';
import Editor from '../Editor/Editor';
import SingleImageUpload from '../SingleImageUpload';
import './CreateDonationPackage.scss';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { defaultDonationPackageThumbnail } from '../../constants/default';

export default function CreateDonationPackageModal({ data, visible, onClose, onSubmit, title, onRemove }) {
    const [desc, setDesc] = useState();
    const [form] = useForm();

    useEffect(() => {
        form.resetFields();
        setDesc(data.desc);
    }, [data]);

    const pricingInputProps = {
        ...data.currency ? (() => {
            switch (data.currency) {
                case 'VNĐ':
                    return {
                        placeholder: 'Tối thiểu 20.000, tối đa 100.000.000',
                        addonAfter: data.currency,
                        min: 20000,
                        max: 100000000
                    };
                case 'USD':
                    return {
                        placeholder: 'Tối thiểu 1, tối đa 5.000',
                        addonAfter: data.currency,
                        min: 1,
                        max: 5000,
                    }

                default:
                    return {};
            }
        })() : {}
    };

    return (
        <Modal
            wrapClassName="create-donation-package-modal"
            title={title || 'Tạo gói quyên góp mới'}
            visible={visible}
            closable
            onCancel={() => onClose()}
            width={800}
            okText="Hoàn tất"
            cancelText="Hủy bỏ"
            footer={(
                <div style={{ width: '100%', height: 32 }}>
                    {data.id && (
                        <div style={{ float: 'left' }}>
                            <Button
                                ghost
                                danger
                                onClick={() => {
                                    Modal.confirm({
                                        title: 'Xác nhận',
                                        icon: <ExclamationCircleOutlined />,
                                        content: 'Bạn thật sự muốn xóa gói này?',
                                        okText: 'Đồng ý',
                                        cancelText: 'Hủy bỏ',
                                        onOk: () => onRemove(data),
                                    })
                                }}
                            >
                                Xóa
                            </Button>
                        </div>
                    )}
                    <div style={{ float: 'right' }}>
                        <Button onClick={() => onClose()}>Hủy bỏ</Button>
                        <Button
                            type="primary"
                            onClick={() => {
                                if (!form.getFieldValue('thumbnail')) {
                                    message.error('Vui lòng tải bìa lên');
                                    return;
                                }

                                if (!desc) {
                                    message.error('Vui lòng điền chính sách tri ân');
                                    return;
                                }

                                form.setFieldsValue({ desc, id: data.id });
                                form.submit();
                            }}
                        >
                            Hoàn tất
                        </Button>
                    </div>
                </div>
            )}
        >
            <Form
                form={form}
                initialValues={data}
                labelAlign="left"
                labelCol={{ span: 4 }}
                onFinish={values => onSubmit(values)}
                onFinishFailed={() => {
                    message.error('Vui lòng điền đầy đủ thông tin bắt buộc');
                }}
            >
                <Form.Item name="thumbnail">
                    <div className="create-donation-package-modal__thumbnail-upload">
                        <SingleImageUpload
                            {...data.thumbnail ? { initImageUrl: data.thumbnail } : {}}
                            uploadText="Tải ảnh lên"
                            onImageChange={img => {
                                // TODO: upload image to cloud & get url
                                console.log(img);
                                form.setFieldsValue({ thumbnail: defaultDonationPackageThumbnail });
                            }}
                        />
                    </div>
                </Form.Item>
                <Form.Item name="id" hidden />
                <Form.Item
                    label="Tên gói"
                    name="title"
                    rules={[{
                        required: true,
                        message: 'Không được bỏ trống'
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Số tiền"
                    name="pricing"
                    rules={[{
                        required: true,
                        message: 'Không được bỏ trống'
                    }]}
                >
                    <BetterInputNumber {...pricingInputProps} />
                </Form.Item>
                <Form.Item label="Chính sách tri ân" required style={{ marginBottom: 10 }} />
                <Form.Item name="desc">
                    <div className="create-donation-package-modal__desc-editor">
                        <Editor
                            content={desc}
                            onChange={newDesc => setDesc(newDesc)}
                        />
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}
