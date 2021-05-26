import { Form, Input, Select } from 'antd'
import React from 'react'
import SingleImageUpload from '../SingleImageUpload'
import { mockCategoryList } from '../../mock-data';
import TagInput from '../TagInput/TagInput';
import TextArea from 'antd/lib/input/TextArea';

export default function CampaignBasicInfoForm({ form, initValues, onFinished, onFinishFailed }) {
  const categoryList = [...mockCategoryList];

  return (
    <Form
      form={form}
      initialValues={initValues}
      labelAlign="left"
      labelCol={{ span: 5 }}
      onFinish={onFinished}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name="thumbnail">
        <SingleImageUpload
          uploadText="Tải ảnh lên"
          initImageUrl={initValues.thumbnail}
          onImageChange={(img) => {
            // TODO: upload image to cloud & get url
            console.log(img);
            form.setFieldsValue({ thumbnail: initValues ? initValues.thumbnail : 'https://pbs.twimg.com/media/E0xmq8MXIAM4aTa?format=jpg&name=4096x4096' });
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
        <Input />
      </Form.Item>
      <Form.Item
        label="Danh mục"
        name="categoryId"
      >
        <Select>
          {categoryList.map(c => (
            <Select.Option key={c.id} value={c.id}>
              {c.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Thẻ"
        name="tags"
      >
        <TagInput
          initTags={initValues.tags}
          onChange={tags => form.setFieldsValue({ tags })}
        />
      </Form.Item>
      <Form.Item
        label="Mô tả"
        name="desc"
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        label="Website"
        name="website"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Facebook"
        name="facebook"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Twitter"
        name="twitter"
      >
        <Input />
      </Form.Item>
    </Form>
  )
}
