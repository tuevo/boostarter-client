import { Col, Form, Input, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { defaultCampaignThumbnail } from '../../constants';
import { mockCategoryList } from '../../mock-data';
import { AvatarUpload } from '../AvatarUpload/AvatarUpload';
import SingleImageUpload from '../SingleImageUpload';
import TagInput from '../TagInput/TagInput';

export default function CampaignBasicInfoForm({ form, initValues, onFinished, onFinishFailed, onFieldsChange }) {
    const categoryList = [...mockCategoryList];

    return (
        <Form
            form={form}
            initialValues={initValues}
            labelAlign="left"
            labelCol={{ span: 4 }}
            onFinish={values => onFinished({
                ...values,
                tags: values.tags || [],
            })}
            onFinishFailed={onFinishFailed}
            onFieldsChange={onFieldsChange}
        >
            <Form.Item name="thumbnail">
                <SingleImageUpload
                    uploadText="Tải ảnh lên"
                    initImageUrl={initValues?.thumbnail}
                    onImageChange={(img) => {
                        // TODO: upload image to cloud & get url
                        console.log(img);
                        form.setFieldsValue({ thumbnail: initValues ? initValues.thumbnail : defaultCampaignThumbnail });
                    }}
                />
            </Form.Item>
            <Form.Item
                label="Tên chiến dịch"
                name="title"
                rules={[{
                    required: true,
                    message: 'Không được bỏ trống'
                }]}
            >
                <Input placeholder="Không quá 50 ký tự" />
            </Form.Item>
            <Form.Item
                label="Danh mục"
                name="categoryId"
                rules={[{
                    required: true,
                    message: 'Không được bỏ trống'
                }]}
            >
                <Select placeholder="Chọn danh mục">
                    {categoryList.map(c => (
                        <Select.Option key={c.id} value={c.id}>
                            {c.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Mô tả"
                name="desc"
                rules={[{
                    required: true,
                    message: 'Không được bỏ trống'
                }]}
            >
                <TextArea rows={4} placeholder="Không quá 250 ký tự" />
            </Form.Item>
            <Form.Item
                label="Thẻ"
                name="tags"
            >
                <TagInput
                    initTags={initValues ? initValues.tags : []}
                    onChange={tags => form.setFieldsValue({ tags })}
                />
            </Form.Item>
            <p className="ant-form-item-label">Tổ chức đại diện</p>
            <Row style={{ paddingBottom: 10 }}>
                <Col span={4}>
                    <Form.Item name="standerLogo">
                        <AvatarUpload
                            initImageUrl={initValues?.standerLogo}
                            uploadText="Biểu tượng"
                            tooltipText="Tải ảnh lên"
                            onChangeImage={(img) => {
                                // TODO: upload image to cloud & get url
                                console.log(img);
                                form.setFieldsValue({ standerLogo: img });
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col span={20}>
                    <Form.Item name="standerName">
                        <Input placeholder="Tên tổ chức (Không quá 50 ký tự)" />
                    </Form.Item>
                    <Form.Item name="standerWebsite">
                        <Input placeholder="Website tổ chức (VD: https://boostarter.web.app)" />
                    </Form.Item>
                    <Form.Item name="standerIntroduction">
                        <TextArea rows={4} placeholder="Giới thiệu tổ chức (Không quá 250 ký tự)" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                label="Website"
                name="website"
            >
                <Input placeholder="VD: https://boostarter.web.app" />
            </Form.Item>
            <Form.Item
                label="Facebook"
                name="facebook"
            >
                <Input placeholder="VD: https://fb.com/boostarter" />
            </Form.Item>
            <Form.Item
                label="Twitter"
                name="twitter"
            >
                <Input placeholder="VD: https://twitter.com/boostarter" />
            </Form.Item>
        </Form>
    )
}
