import { PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Form, message, Modal, Select, Steps } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import htmlParse from 'html-react-parser';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { newCampaign } from '../../mock-data';
import BetterInputNumber from '../BetterInputNumber';
import CampaignBasicInfoForm from '../CampaignBasicInfoForm';
import CreateDonationPackageModal from '../CreateDonationPackageModal';
import Editor from '../Editor/Editor';
import PackagePreview from '../PackagePreview';
import './CreateCampaignModal.scss';

const { Step } = Steps;
const dateFormat = 'DD-MM-YYYY';

const UpdateDonationPackageModal = (props) => (
    <CreateDonationPackageModal {...props} />
)

export default function CreateCampaignModal({ visible, onClose, onSubmit }) {
    const [current, setCurrent] = useState(0);
    const [basicInfoForm] = useForm();
    const [targetForm] = useForm();

    const user = useSelector(state => state.user.auth);

    const [storyContent, setStoryContent] = useState('');
    const [createDonationPackageModalVisible, setCreateDonationModalVisible] = useState(false);
    const [updateDonationPackageModalVisible, setUpdateDonationPackageModalVisible] = useState(false);
    const [shouldDisableRaiseTargetInput, disableRaiseTargetInput] = useState(true);
    const [raiseTargetInputPlaceholder, setRaiseTargetInputPlaceholder] = useState('');
    const [raiseTargetInputRange, setRaiseTargetInputRange] = useState({
        min: 0,
        max: 0,
    });
    const [selectedCurrency, setSelectedCurrency] = useState();
    const [selectedPackage, setSelectedPackage] = useState();
    const [shouldDisableBtnOpenCreateDonationPackageModal, disableBtnOpenCreateDonationPackageModal] = useState(true);
    const [privacyChecked, checkPrivacy] = useState(false);
    const [data, setData] = useState({
        packages: []
    });

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: 'Nhập thông tin cơ bản',
            content: (
                <CampaignBasicInfoForm
                    form={basicInfoForm}
                    onFinished={values => {
                        setData({
                            ...data,
                            ...values,
                            stander: {
                                logo: values.standerLogo,
                                name: values.standerName,
                                website: values.standerWebsite,
                                introduction: values.standerIntroduction,
                            }
                        });
                        next();
                    }}
                    onFinishFailed={() => {
                        message.error('Vui lòng điền đầy đủ thông tin bắt buộc');
                    }}
                />
            ),
        },
        {
            title: 'Kể câu chuyện của bạn',
            content: (
                <div className="create-campaign-modal__story-editor">
                    <Editor
                        content={storyContent}
                        onChange={(content) => setStoryContent(content)}
                    />
                </div>
            ),
        },
        {
            title: 'Đặt mục tiêu',
            content: (
                <Form
                    form={targetForm}
                    labelAlign="left"
                    labelCol={{ span: 4 }}
                    onFinish={values => {
                        setData({
                            ...data,
                            ...values,
                            startDate: moment(values.startDate).toDate().toISOString(),
                            endDate: moment(values.endDate).toDate().toISOString(),
                        });
                        next();
                    }}
                    onFinishFailed={() => {
                        message.error('Vui lòng điền đầy đủ thông tin bắt buộc');
                    }}
                    onFieldsChange={field => {
                        const name = field[0].name[0];
                        const value = field[0].value;
                        if (name === 'currency' && value) {
                            setSelectedCurrency(value);
                            disableRaiseTargetInput(false);
                            disableBtnOpenCreateDonationPackageModal(false);

                            switch (value) {
                                case 'VNĐ':
                                    setRaiseTargetInputPlaceholder('Tối thiểu 1.000.000, tối đa 100.000.000');
                                    setRaiseTargetInputRange({
                                        min: 1000000,
                                        max: 100000000
                                    });
                                    break;

                                case 'USD':
                                    setRaiseTargetInputPlaceholder('Tối thiểu 50, tối đa 5.000');
                                    setRaiseTargetInputRange({
                                        min: 50,
                                        max: 5000
                                    });
                                    break;

                                default:
                                    break;
                            }
                        }
                    }}
                >
                    <Form.Item
                        name="startDate"
                        label="Ngày bắt đầu"
                        rules={[{
                            required: true,
                            message: 'Không được bỏ trống'
                        }]}
                    >
                        <DatePicker
                            format={dateFormat}
                            disabledDate={(current) => current && current < moment().startOf('day')}
                            style={{ width: '100%' }}
                            placeholder="Chọn ngày"
                        />
                    </Form.Item>
                    <Form.Item
                        name="endDate"
                        label="Ngày kết thúc"
                        rules={[{
                            required: true,
                            message: 'Không được bỏ trống'
                        }]}
                    >
                        <DatePicker
                            format={dateFormat}
                            disabledDate={(current) => current && current < moment().startOf('day')}
                            style={{ width: '100%' }}
                            placeholder="Chọn ngày"
                        />
                    </Form.Item>
                    <Form.Item
                        name="currency"
                        label="Mệnh giá tiền"
                        rules={[{
                            required: true,
                            message: 'Không được bỏ trống'
                        }]}
                    >
                        <Select placeholder="Chọn mệnh giá tiền">
                            <Select.Option value="VNĐ">VNĐ</Select.Option>
                            <Select.Option value="USD">USD</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="targetRaise"
                        label="Số tiền"
                        rules={[{
                            required: true,
                            message: 'Không được bỏ trống'
                        }]}
                    >
                        <BetterInputNumber
                            placeholder={raiseTargetInputPlaceholder}
                            disabled={shouldDisableRaiseTargetInput}
                            min={raiseTargetInputRange.min}
                            max={raiseTargetInputRange.max}
                            addonAfter={selectedCurrency}
                        />
                    </Form.Item>
                    <Form.Item label="Gói quyên góp">
                        <Button
                            className="create-campaign-modal__btn-create-package"
                            icon={<PlusOutlined />}
                            onClick={() => setCreateDonationModalVisible(true)}
                            disabled={shouldDisableBtnOpenCreateDonationPackageModal}
                        >
                            Tạo gói
                        </Button>
                    </Form.Item>
                    <div className="create-campaign-modal__packages">
                        {data.packages.map((p) => (
                            <div key={p.id} className="create-campaign-modal__packages__item">
                                <PackagePreview
                                    data={p}
                                    onClick={packageData => setSelectedPackage({ ...packageData })}
                                />
                            </div>
                        ))}
                    </div>
                </Form>
            ),
        },
        {
            title: 'Hoàn tất',
            content: (
                <div className="create-campaign-modal__policy">
                    <div className="create-campaign-modal__policy__content">
                        {htmlParse(`
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
                        <Checkbox checked={privacyChecked} onChange={e => checkPrivacy(e.target.checked)}>
                            Tôi đồng ý với các <b>Điều khoản dịch vụ và chính sách bảo mật</b>
                        </Checkbox>
                    </div>
                </div>
            ),
        },
    ];

    const findPackageIndex = (packageData) => {
        return data.packages.findIndex((p) => p.id === packageData.id);
    }

    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        if (selectedPackage) {
            setUpdateDonationPackageModalVisible(true);
        }
    }, [selectedPackage]);

    useEffect(() => {
        if (!updateDonationPackageModalVisible) {
            setSelectedPackage(undefined);
        }
    }, [updateDonationPackageModalVisible]);

    return (
        <>
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
                            <Button type="primary" onClick={() => {
                                switch (current) {
                                    case 0:
                                        if (!basicInfoForm.getFieldValue('thumbnail')) {
                                            message.error('Vui lòng tải bìa lên');
                                            return;
                                        }

                                        basicInfoForm.submit();
                                        break;

                                    case 1:
                                        if (!storyContent) {
                                            message.error('Câu chuyện không được bỏ trống');
                                            return;
                                        }

                                        setData({ ...data, story: storyContent });
                                        next();
                                        break;

                                    case 2:
                                        targetForm.submit();
                                        break;

                                    default:
                                        break;
                                }
                            }}>
                                Tiếp tục
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button
                                type="primary"
                                disabled={!privacyChecked}
                                onClick={() => {
                                    message.success('Khởi tạo chiến dịch thành công!');
                                    onSubmit({
                                        ...newCampaign,
                                        ...data,
                                        owner: { ...user }
                                    });
                                }}
                            >
                                Xong
                            </Button>
                        )}
                    </div>
                </div>
            </Modal>

            <CreateDonationPackageModal
                data={{
                    currency: selectedCurrency
                }}
                visible={createDonationPackageModalVisible}
                onClose={() => setCreateDonationModalVisible(false)}
                onSubmit={packageData => {
                    setData({
                        ...data,
                        packages: [
                            ...data.packages,
                            {
                                ...packageData,
                                id: data.packages.length + 1,
                                currency: selectedCurrency,
                            }],
                    })
                    setCreateDonationModalVisible(false);
                }}
            />

            <UpdateDonationPackageModal
                title="Cập nhật gói quyên góp"
                data={{
                    ...selectedPackage,
                    currency: selectedCurrency
                }}
                visible={updateDonationPackageModalVisible}
                onClose={() => setUpdateDonationPackageModalVisible(false)}
                onSubmit={packageData => {
                    setUpdateDonationPackageModalVisible(false);
                    const index = findPackageIndex(packageData);
                    if (index > -1) {
                        const newPackage = { ...data.packages[index], ...packageData };
                        setData({
                            ...data,
                            packages: [
                                ...data.packages.slice(0, index),
                                newPackage,
                                ...data.packages.slice(index + 1)
                            ]
                        })
                    }
                }}
                onRemove={packageData => {
                    setUpdateDonationPackageModalVisible(false);
                    const index = findPackageIndex(packageData);
                    if (index > -1) {
                        setData({
                            ...data,
                            packages: [
                                ...data.packages.slice(0, index),
                                ...data.packages.slice(index + 1)
                            ]
                        })
                    }
                }}
            />
        </>
    )
}
