import { Modal, Steps, Button, message, Form, DatePicker, Select, Input, Checkbox } from 'antd';
import React, { useState } from 'react';
import './CreateCampaignModal.scss';
import CampaignBasicInfoForm from '../CampaignBasicInfoForm';
import { useForm } from 'antd/lib/form/Form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { PlusOutlined } from '@ant-design/icons';
import parse from 'html-react-parser';

const { Step } = Steps;

export default function CreateCampaignModal({ visible, onClose, onSubmit }) {
  const [current, setCurrent] = useState(0);
  const [basicInfoForm] = useForm();
  const [story, setStory] = useState('');

  const handleStoryChange = (value) => {
    setStory(value);
  }

  const steps = [
    {
      title: 'Nhập thông tin cơ bản',
      content: (
        <CampaignBasicInfoForm
          form={basicInfoForm}
          onFinished={values => {
            console.log(values);
          }}
          onFinishFailed={() => {

          }}
        />
      ),
    },
    {
      title: 'Kể câu chuyện của bạn',
      content: (
        <ReactQuill theme="snow" value={story} onChange={handleStoryChange} style={{ height: 500 }} />
      ),
    },
    {
      title: 'Đặt mục tiêu',
      content: (
        <Form
          labelAlign="left"
          labelCol={{ span: 4 }}
        >
          <Form.Item label="Ngày bắt đầu">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Ngày kết thúc">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Mệnh giá tiền">
            <Select defaultValue="VNĐ">
              <Select.Option value="VNĐ">VNĐ</Select.Option>
              <Select.Option value="USD">USD</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Số tiền">
            <Input />
          </Form.Item>
          <Form.Item label="Gói quyên góp">
            <Button className="create-campaign-modal__btn-create-package" icon={<PlusOutlined />}>Tạo gói</Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Hoàn tất',
      content: (
        <div className="create-campaign-modal__policy">
          <div className="create-campaign-modal__policy__content">
            {parse(`
                <h2>Điều khoản dịch vụ và chính sách bảo mật</h2>
                <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.
                </p>
                <h4>1. Điều khoản</h4>
                <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.
                </p>
                <h4>2. Giấy phép sử dụng</h4>
                <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.
                </p>
              `)}
          </div>
          <div className="create-campaign-modal__policy__confirm">
            <Checkbox>Tôi đồng ý với các <b>Điều khoản dịch vụ và chính sách bảo mật</b></Checkbox>
          </div>
        </div>
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Modal
      wrapClassName="create-campaign-modal"
      title="Khởi tạo chiến dịch cá nhân"
      visible={visible}
      closable
      onCancel={() => onClose()}
      width={1000}
      footer={null}
    >
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        <div>
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Trở lại
            </Button>
          )}
        </div>
        <div>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Tiếp tục
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => {
              message.success('Khởi tạo chiến dịch thành công!');
              onClose();
            }}>
              Xong
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}
