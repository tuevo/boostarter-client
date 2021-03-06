import { PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Form, message, Modal, Select, Steps } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import htmlParse from 'html-react-parser';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { APP_PRIVACY } from '../../constants';
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
            title: 'Nh???p th??ng tin c?? b???n',
            content: (
                <CampaignBasicInfoForm
                    form={basicInfoForm}
                    onFinished={values => {
                        if (!values.thumbnail) {
                            message.error('Vui l??ng t???i b??a l??n');
                            return;
                        }
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
                        message.error('Vui l??ng ??i???n ?????y ????? th??ng tin b???t bu???c');
                    }}
                />
            ),
        },
        {
            title: 'K??? c??u chuy???n c???a b???n',
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
            title: '?????t m???c ti??u',
            content: (
                <Form
                    form={targetForm}
                    labelAlign="left"
                    labelCol={{ span: 4 }}
                    onFinish={values => {
                        const startDate = moment(values.startDate).toDate();
                        const endDate = moment(values.endDate).toDate();

                        if (endDate.getTime() < startDate.getTime()) {
                            message.error('Ng??y k???t th??c kh??ng h???p l???');
                            return;
                        }

                        setData({
                            ...data,
                            ...values,
                            startDate: startDate.toISOString(),
                            endDate: endDate.toISOString(),
                        });
                        next();
                    }}
                    onFinishFailed={() => {
                        message.error('Vui l??ng ??i???n ?????y ????? th??ng tin b???t bu???c');
                    }}
                    onFieldsChange={field => {
                        const name = field[0].name[0];
                        const value = field[0].value;
                        if (name === 'currency' && value) {
                            setSelectedCurrency(value);
                            disableRaiseTargetInput(false);
                            disableBtnOpenCreateDonationPackageModal(false);

                            switch (value) {
                                case 'VN??':
                                    setRaiseTargetInputPlaceholder('T???i thi???u 1.000.000, t???i ??a 100.000.000');
                                    setRaiseTargetInputRange({
                                        min: 1000000,
                                        max: 100000000
                                    });
                                    break;

                                case 'USD':
                                    setRaiseTargetInputPlaceholder('T???i thi???u 50, t???i ??a 5.000');
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
                        label="Ng??y b???t ?????u"
                        rules={[{
                            required: true,
                            message: 'Kh??ng ???????c b??? tr???ng'
                        }]}
                    >
                        <DatePicker
                            format={dateFormat}
                            disabledDate={(current) => current && current < moment().startOf('day')}
                            style={{ width: '100%' }}
                            placeholder="Ch???n ng??y"
                        />
                    </Form.Item>
                    <Form.Item
                        name="endDate"
                        label="Ng??y k???t th??c"
                        rules={[{
                            required: true,
                            message: 'Kh??ng ???????c b??? tr???ng'
                        }]}
                    >
                        <DatePicker
                            format={dateFormat}
                            disabledDate={(current) => current && current < moment().startOf('day')}
                            style={{ width: '100%' }}
                            placeholder="Ch???n ng??y"
                        />
                    </Form.Item>
                    <Form.Item
                        name="currency"
                        label="M???nh gi?? ti???n"
                        rules={[{
                            required: true,
                            message: 'Kh??ng ???????c b??? tr???ng'
                        }]}
                    >
                        <Select placeholder="Ch???n m???nh gi?? ti???n">
                            <Select.Option value="VN??">VN??</Select.Option>
                            <Select.Option value="USD">USD</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="targetRaise"
                        label="S??? ti???n"
                        rules={[{
                            required: true,
                            message: 'Kh??ng ???????c b??? tr???ng'
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
                    <Form.Item label="G??i quy??n g??p">
                        <Button
                            className="create-campaign-modal__btn-create-package"
                            icon={<PlusOutlined />}
                            onClick={() => setCreateDonationModalVisible(true)}
                            disabled={shouldDisableBtnOpenCreateDonationPackageModal}
                        >
                            T???o g??i
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
            title: 'Ho??n t???t',
            content: (
                <div className="create-campaign-modal__policy">
                    <div className="create-campaign-modal__policy__content">
                        {htmlParse(APP_PRIVACY)}
                    </div>
                    <div className="create-campaign-modal__policy__confirm">
                        <Checkbox checked={privacyChecked} onChange={e => checkPrivacy(e.target.checked)}>
                            T??i ?????ng ?? v???i <b>??i???u kho???n d???ch v??? v?? ch??nh s??ch b???o m???t</b>
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
                title="Kh???i t???o chi???n d???ch c?? nh??n"
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
                                Tr??? l???i
                            </Button>
                        )}
                    </div>
                    <div>
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => {
                                switch (current) {
                                    case 0:
                                        basicInfoForm.submit();
                                        break;

                                    case 1:
                                        if (!storyContent) {
                                            message.error('C??u chuy???n kh??ng ???????c b??? tr???ng');
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
                                Ti???p t???c
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button
                                type="primary"
                                disabled={!privacyChecked}
                                onClick={() => {
                                    message.success('Kh???i t???o chi???n d???ch th??nh c??ng!');
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
                title="C???p nh???t g??i quy??n g??p"
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
