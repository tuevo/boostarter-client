import { CheckCircleFilled, CheckOutlined, CloseOutlined, CommentOutlined, ContainerOutlined, DeleteFilled, EditFilled, ExclamationCircleOutlined, FacebookFilled, HeartFilled, HeartOutlined, HistoryOutlined, PaperClipOutlined, PlusOutlined, RocketFilled, StopOutlined, TeamOutlined, TwitterSquareFilled } from '@ant-design/icons';
import { Avatar, Button, Col, Divider, Drawer, Form, Input, List, Menu, message, Modal, Progress, Rate, Row, Tag, Timeline, Tooltip } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import Title from 'antd/lib/typography/Title';
import htmlParse from 'html-react-parser';
import queryString from 'query-string';
import QueueAnim from 'rc-queue-anim';
import React, { useEffect, useRef, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import CampaignBasicInfoForm from '../../components/CampaignBasicInfoForm/CampaignBasicInfoForm';
import CampaignPreviewCarousel from '../../components/CampaignPreviewCarousel';
import Container from '../../components/Container';
import CreateDonationPackageModal from '../../components/CreateDonationPackageModal';
import DonationLogItem from '../../components/DonationLogItem';
import DonationModal from '../../components/DonationModal/DonationModal';
import Feedback from '../../components/Feedback/Feedback';
import NotFound from '../../components/NotFound';
import PackageDetailModal from '../../components/PackageDetailModal/PackageDetailModal';
import PackagePreview from '../../components/PackagePreview';
import PostedStatus from '../../components/PostedStatus';
import PostStatusModal from '../../components/PostStatusModal/PostStatusModal';
import QRPaymentModal from '../../components/QRPaymentModal';
import SectionTitle from '../../components/SectionTitle';
import StoryEditingModal from '../../components/StoryEditingModal';
import { campaignStatus, defaultUserAvatar, getCampaignStatusIcon, userRole } from '../../constants';
import { mockUser2 } from '../../mock-data';
import { addFeedback, addNotification, addPostedStatus, updateCampaign } from '../../redux';
import { isPublicCampaign } from '../../utils';
import { daysFromNow } from '../../utils/date-time';
import './CampaignDetail.scss';

const UpdateDonationPackageModal = (props) => (
    <CreateDonationPackageModal {...props} />
)

export default function CampaignDetail(props) {
    const { id } = useParams();
    const signInLocation = useRef();
    let queryParams = queryString.parse(props.location.search);

    const dispatch = useDispatch();
    const history = useHistory();
    const storyRef = useRef();
    const commentTextAreaRef = useRef();

    const user = useSelector(state => state.user.auth);
    const campaignList = useSelector(state => state.campaigns);
    const postedStatusList = useSelector(state => state.postedStatuses);
    const feedbackList = useSelector(state => state.feedbacks);
    const relatedCampaignList = campaignList.filter(c => c.id !== +id).filter(isPublicCampaign);

    const [data, setData] = useState();
    const [selectedMenuKey, setSelectedMenuKey] = useState(queryParams['tab'] || '1');
    const [donationLogVisible, setDonationLogVisible] = useState(false);

    const [editingCampaignVisible, setEditingCampaignVisible] = useState(false);
    const [editingCampaignForm] = useForm();
    const [submitEditingCampaignLoading, setSubmitEditingCampaignFormLoading] = useState(false);

    const [btnFollowSelectable, setBtnFollowSelectable] = useState();

    const [addCommentForm] = useForm();

    const [donationModalVisible, setDonationModalVisible] = useState(false);
    const [qRPaymentModalVisible, setQRPaymentModalVisible] = useState(false);

    const [createDonationPackageModalVisible, setCreateDonationPackageModalVisible] = useState(false);
    const [updateDonationPackageModalVisible, setUpdateDonationPackageModalVisible] = useState(false);
    const [donationPackageDetailModalVisible, setDonationPackageDetailModalVisible] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState();

    const [postStatusModalVisible, setPostStatusModalVisible] = useState(false);
    const [storyEditorVisible, setStoryEditorVisible] = useState(false);

    const [confirmPendingCampaignForm] = useForm();
    const [confirmDisapproveCampaignForm] = useForm();
    const [confirmRemoveCampaignForm] = useForm();

    const [currentRaisePeriod, setCurrentRaisePeriod] = useState();
    const [currentRaisePercent, setCurrentRaisePercent] = useState();

    const [donationAllowed, setDonationAllowed] = useState(false);
    const [donationDisabled, setDonationDisabled] = useState(false);

    const handleClickMenu = (key) => {
        setSelectedMenuKey(key);
        history.replace(`/campaign/${id}?tab=${key}`);
    };

    const handleEditingCampaignFormFinished = (values) => {
        setSubmitEditingCampaignFormLoading(true);
        setTimeout(() => {
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
            setEditingCampaignVisible(false);
            message.success('Cập nhật thông tin chiến dịch thành công!');
        }, 1000);
        setSubmitEditingCampaignFormLoading(false);
    }

    const handleEditingCampaignFormFinishFailed = () => {
        message.error('Đã có lỗi xảy ra! Vui lòng kiểm tra lại thông tin.');
    }

    const handleAddCommentFormFinished = (values) => {
        if (!user) {
            history.push(signInLocation.current);
            return;
        }

        const { comment } = values;
        if (!comment) {
            return;
        }

        const newFeedback = {
            id: v4(),
            createdAt: new Date().toISOString(),
            rating: 4.5,
            isCampaignOwner: user.id ? user.id === data.owner.id : false,
            isAdmin: user.role.value === userRole.ADMIN.value,
            comment,
            ...user
        };

        dispatch(addFeedback(newFeedback));
        addCommentForm.resetFields();
    }

    const findPackageIndex = (packageData) => {
        return data.packages.findIndex((p) => p.id === packageData.id);
    }

    const onClickBtnPendingCampaign = () => {
        Modal.confirm({
            title: 'Vui lòng cho biết lý do',
            icon: <ExclamationCircleOutlined />,
            content: (
                <>
                    <Form
                        style={{ marginTop: 20 }}
                        form={confirmPendingCampaignForm}
                        onFinish={values => {
                            setData({
                                ...data,
                                status: campaignStatus.PENDING,
                                pendingReason: values.reason,
                            });
                            message.success('Tạm dừng chiến dịch thành công');
                        }}
                        onFinishFailed={() => {
                            message.error('Vui lòng điền đầy đủ thông tin');
                            onClickBtnPendingCampaign();
                        }}
                    >
                        <Form.Item name="reason" rules={[{ required: true }]}>
                            <Input.TextArea rows={5} placeholder="Không quá 200 ký tự" />
                        </Form.Item>
                    </Form>
                </>
            ),
            width: 500,
            maskClosable: true,
            okText: 'Đồng ý',
            cancelText: 'Hủy bỏ',
            onOk: () => confirmPendingCampaignForm.submit(),
        })
    }

    const onClickBtnDisapproveCampaign = () => {
        Modal.confirm({
            title: 'Vui lòng cho biết lý do',
            icon: <ExclamationCircleOutlined />,
            content: (
                <>
                    <Form
                        style={{ marginTop: 20 }}
                        form={confirmDisapproveCampaignForm}
                        onFinish={values => {
                            setData({
                                ...data,
                                status: campaignStatus.DISAPPROVED,
                            });
                            dispatch(addNotification({
                                id: v4(),
                                sender: { ...user, isCampaignOwner: true },
                                receiver: data.owner,
                                content: `
                                    Chiến dịch <a href="/campaign/${data.id}?tab=1">${data.title}</a> của bạn đã bị từ chối duyệt! Lý do: ${values.reason}
                                `,
                                createdAt: new Date().toISOString(),
                            }));
                            message.success('Từ chối chiến dịch thành công!');
                        }}
                        onFinishFailed={() => {
                            message.error('Vui lòng điền đầy đủ thông tin');
                            onClickBtnDisapproveCampaign();
                        }}
                    >
                        <Form.Item name="reason" rules={[{ required: true }]}>
                            <Input.TextArea rows={5} placeholder="Không quá 200 ký tự" />
                        </Form.Item>
                    </Form>
                </>
            ),
            width: 500,
            maskClosable: true,
            okText: 'Đồng ý',
            cancelText: 'Hủy bỏ',
            onOk: () => confirmDisapproveCampaignForm.submit(),
        })
    }

    const onClickBtnRemoveCampaign = () => {
        Modal.confirm({
            title: 'Vui lòng cho biết lý do',
            icon: <ExclamationCircleOutlined />,
            content: (
                <>
                    <Form
                        style={{ marginTop: 20 }}
                        form={confirmRemoveCampaignForm}
                        onFinish={values => {
                            setData({
                                ...data,
                                status: campaignStatus.REMOVED,
                            });
                            dispatch(addNotification({
                                id: v4(),
                                sender: { ...user, isCampaignOwner: true },
                                receiver: data.owner,
                                content: `
                                    Chiến dịch <a href="/campaign/${data.id}?tab=1">${data.title}</a> của bạn đã bị gỡ bỏ! Lý do: ${values.reason}
                                `,
                                createdAt: new Date().toISOString(),
                            }));
                            message.success('Gỡ bỏ chiến dịch thành công!');
                            history.push('/not-found');
                        }}
                        onFinishFailed={() => {
                            message.error('Vui lòng điền đầy đủ thông tin');
                            onClickBtnRemoveCampaign();
                        }}
                    >
                        <Form.Item name="reason" rules={[{ required: true }]}>
                            <Input.TextArea rows={5} placeholder="Không quá 200 ký tự" />
                        </Form.Item>
                    </Form>
                </>
            ),
            width: 500,
            maskClosable: true,
            okText: 'Đồng ý',
            cancelText: 'Hủy bỏ',
            onOk: () => confirmRemoveCampaignForm.submit(),
        })
    }

    useEffect(() => {
        let url = `${props.location.pathname}${props.location.search}`;

        if (['home', 'personal-campaigns', 'campaign'].includes(queryParams['from'])) {
            window.scrollTo(0, 0);
            delete queryParams['from'];
            url = `${props.location.pathname}?${queryString.stringify(queryParams)}`;
            history.push(url);
        }

        if (!queryParams['tab']) {
            queryParams['tab'] = '1';
            url = `${props.location.pathname}?${queryString.stringify(queryParams)}`;
            history.replace(url);
        }

        signInLocation.current = {
            pathname: '/sign-in',
            state: {
                from: url
            }
        };
    }, [props.location.search]);

    useEffect(() => {
        setData(campaignList.find(c => c.id === +id));
    }, [id]);

    useEffect(() => {
        if (selectedPackage) {
            if (user?.id === data.owner.id && data.status.value !== campaignStatus.CLOSED.value) {
                setUpdateDonationPackageModalVisible(true);
            } else {
                setDonationPackageDetailModalVisible(true);
            }
        }
    }, [selectedPackage, data, user]);

    useEffect(() => {
        if (data) {
            console.log(data);
            setBtnFollowSelectable(data.isFollowed || false);
            setCurrentRaisePeriod(daysFromNow(data.endDate));
            setCurrentRaisePercent(Math.round(data.currentRaise / data.targetRaise * 100));
            dispatch(updateCampaign(data));

            if (!user || (user && user.role.value === userRole.DONATOR.value)) {
                setDonationAllowed(true);
                setDonationDisabled(data.status.value === campaignStatus.PENDING.value);
            }
        }
    }, [data, user, dispatch]);

    if (!data) {
        return <NotFound />;
    }

    return (
        <div className="campaign-detail">
            <section className="campaign-detail__header">
                <Container>
                    <Row style={{ width: '100%' }}>
                        <Col span={12}>
                            <div className="campaign-detail__header__left">
                                <img className="animate__animated animate__fadeIn" src={data.thumbnail} alt="" />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="campaign-detail__header__right">
                                <div className="toolbar">
                                    <div className="toolbar__status">
                                        {data.status.value !== campaignStatus.PENDING.value ? (
                                            <Tag color={data.status.color} icon={getCampaignStatusIcon(data.status.value)}>{data.status.name}</Tag>
                                        ) : (
                                            <Tooltip title="Nhấn để biết lý do tạm dừng">
                                                <Tag
                                                    style={{ cursor: 'pointer' }}
                                                    color={data.status.color}
                                                    icon={getCampaignStatusIcon(data.status.value)}
                                                    onClick={() => {
                                                        Modal.info({
                                                            title: 'Lý do tạm dừng chiến dịch này',
                                                            content: data.pendingReason,
                                                            maskClosable: true,
                                                            okText: 'Đã hiểu'
                                                        })
                                                    }}
                                                >
                                                    {data.status.name}
                                                </Tag>
                                            </Tooltip>
                                        )}
                                    </div>
                                    <div className="toolbar__controls">
                                        {user && user.role.value === userRole.ADMIN.value && (
                                            <>
                                                {data.status.value === campaignStatus.REVIEW.value && (
                                                    <>
                                                        <Button
                                                            className="toolbar__controls__btn-accept"
                                                            icon={<CheckOutlined />}
                                                            type="primary"
                                                            onClick={() => {
                                                                setData({
                                                                    ...data,
                                                                    status: campaignStatus.OPENED,
                                                                });
                                                                dispatch(addNotification({
                                                                    id: v4(),
                                                                    sender: { ...user, isCampaignOwner: true },
                                                                    receiver: data.owner,
                                                                    content: `
                                                                        Chiến dịch <a href="/campaign/${data.id}?tab=1">${data.title}</a> của bạn đã được duyệt.
                                                                    `,
                                                                    createdAt: new Date().toISOString(),
                                                                }));
                                                                message.success('Duyệt chiến dịch thành công');
                                                            }}
                                                        >
                                                            Duyệt
                                                        </Button>
                                                        <Button
                                                            icon={<CloseOutlined />}
                                                            onClick={() => onClickBtnDisapproveCampaign()}
                                                        >
                                                            Từ chối
                                                        </Button>
                                                    </>
                                                )}

                                                {data.status.value !== campaignStatus.REVIEW.value
                                                    && data.status.value !== campaignStatus.DISAPPROVED.value && (
                                                        <Button
                                                            icon={<DeleteFilled />}
                                                            danger
                                                            onClick={() => onClickBtnRemoveCampaign()}
                                                        >
                                                            Gỡ bỏ
                                                        </Button>
                                                    )}
                                            </>
                                        )}
                                        {user && user.id === data.owner.id && (
                                            <>
                                                {data.status.value === campaignStatus.OPENED.value && (
                                                    <Button
                                                        icon={<StopOutlined />}
                                                        ghost danger
                                                        onClick={() => onClickBtnPendingCampaign()}
                                                    >
                                                        Tạm dừng
                                                    </Button>
                                                )}
                                                {data.status.value === campaignStatus.PENDING.value && (
                                                    <Button
                                                        className="toolbar__controls__btn-restart"
                                                        icon={<RocketFilled />}
                                                        type="primary"
                                                        onClick={() => {
                                                            setData({
                                                                ...data,
                                                                status: campaignStatus.OPENED,
                                                            });
                                                            dispatch(addNotification({
                                                                id: v4(),
                                                                sender: { ...user, isCampaignOwner: true },
                                                                receiver: mockUser2,
                                                                content: `
                                                                    Chiến dịch <a href="/campaign/${data.id}?tab=1">${data.title}</a> đã được khởi động lại.
                                                                `,
                                                                createdAt: new Date().toISOString(),
                                                            }));
                                                            message.success('Khởi động chiến dịch thành công');
                                                        }}
                                                    >
                                                        Khởi động lại
                                                    </Button>
                                                )}
                                                {data.status.value === campaignStatus.DISAPPROVED.value && (
                                                    <Button
                                                        className="toolbar__controls__btn-restart"
                                                        icon={<CheckOutlined />}
                                                        type="primary"
                                                        onClick={() => {
                                                            setData({
                                                                ...data,
                                                                status: campaignStatus.REVIEW,
                                                            });
                                                            dispatch(addNotification({
                                                                id: v4(),
                                                                sender: { ...user, isCampaignOwner: true },
                                                                receiver: mockUser2,
                                                                content: `
                                                                    Vui lòng duyệt lại chiến dịch <a href="/campaign/${data.id}?tab=1">${data.title}</a> cho tôi.
                                                                `,
                                                                createdAt: new Date().toISOString(),
                                                            }));
                                                            message.success('Yêu cầu duyệt lại chiến dịch thành công');
                                                        }}
                                                    >
                                                        Yêu cầu duyệt lại
                                                    </Button>
                                                )}
                                                <Button
                                                    className="toolbar__controls__btn-edit"
                                                    icon={<EditFilled />}
                                                    onClick={() => setEditingCampaignVisible(true)}
                                                    disabled={data.status.value === campaignStatus.CLOSED.value}
                                                >
                                                    Chỉnh sửa
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <Title className="title">{data.title}</Title>
                                <p className="desc">{data.desc}</p>
                                <div className="featured-info">
                                    <div className="featured-info__owner">
                                        <List.Item.Meta
                                            avatar={<Avatar src={data.owner.avatar} size={50} />}
                                            title={
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <span className="featured-info__owner__name">{data.owner.fullName}</span>
                                                    <CheckCircleFilled className="featured-info__owner__popular-icon" />
                                                </div>
                                            }
                                            description={
                                                <div>
                                                    <NumberFormat
                                                        displayType="text"
                                                        value={data.owner.numberOfCampaigns}
                                                        thousandSeparator={'.'}
                                                        decimalSeparator={','}
                                                        suffix={' chiến dịch'}
                                                    />
                                                    {` | ${data.owner.location}`}
                                                </div>
                                            }
                                        />
                                    </div>
                                    <div className="featured-info__rating">
                                        <Rate
                                            className="featured-info__rating__stars"
                                            defaultValue={data.rating}
                                            allowHalf
                                        />
                                        <NumberFormat
                                            className="featured-info__rating__text"
                                            displayType="text"
                                            value={data.numberOfRatings}
                                            thousandSeparator={'.'}
                                            decimalSeparator={','}
                                            suffix={' lượt đánh giá'}
                                        />
                                    </div>
                                </div>
                                <div className="raise-info">
                                    <div className="raise-info__section">
                                        <Title level={4}>
                                            <NumberFormat
                                                displayType="text"
                                                value={data.currentRaise}
                                                thousandSeparator={'.'}
                                                decimalSeparator={','}
                                                suffix={` ${data.currency}`}
                                            />
                                        </Title>
                                        <Button
                                            type="link"
                                            onClick={() => setDonationLogVisible(true)}
                                        >
                                            Lịch sử nhận quyên góp
                                        </Button>
                                    </div>
                                    <Progress
                                        percent={currentRaisePercent}
                                        showInfo={false}
                                        status="active"
                                        strokeColor={{
                                            '0%': '#108ee9',
                                            '100%': '#87d068',
                                        }}
                                    />
                                    <div className="raise-info__section">
                                        <div>
                                            {`${currentRaisePercent}% của `}
                                            <NumberFormat
                                                displayType="text"
                                                value={data.targetRaise}
                                                thousandSeparator={'.'}
                                                decimalSeparator={','}
                                                suffix={` ${data.currency}`}
                                            />
                                        </div>
                                        <div>
                                            <NumberFormat
                                                displayType="text"
                                                value={currentRaisePeriod}
                                                thousandSeparator={'.'}
                                                decimalSeparator={','}
                                                prefix={'Còn '}
                                                suffix={' ngày'}
                                            />
                                        </div>
                                    </div>
                                    <div className="raise-info__section bottom">
                                        <div className="raise-info__section__buttons">
                                            {donationAllowed && (
                                                <Button
                                                    className="btn-donate"
                                                    type="primary"
                                                    size="large"
                                                    disabled={donationDisabled}
                                                    onClick={() => {
                                                        if (!user) {
                                                            history.push(signInLocation.current);
                                                            return;
                                                        }

                                                        setDonationModalVisible(true);
                                                    }}
                                                >
                                                    Quyên góp
                                                </Button>
                                            )}
                                            {(!user || (user && user.id !== data.owner.id)) && (
                                                <Button
                                                    className="btn-follow"
                                                    type="primary"
                                                    size="large"
                                                    icon={btnFollowSelectable ? <HeartFilled /> : <HeartOutlined />}
                                                    onClick={() => {
                                                        if (!user) {
                                                            history.push(signInLocation.current);
                                                            return;
                                                        }

                                                        setBtnFollowSelectable(!btnFollowSelectable);
                                                        message.success(!btnFollowSelectable ? 'Đã thêm vào Danh sách chiến dịch theo dõi' : 'Đã xóa khỏi Danh sách chiến dịch theo dõi');
                                                    }}
                                                >
                                                    Theo dõi
                                                </Button>
                                            )}
                                            {user && user.id === data.owner.id && (
                                                <Button
                                                    className="btn-follow"
                                                    type="primary"
                                                    size="large"
                                                    icon={<RocketFilled />}
                                                    onClick={() => history.push('/personal-campaigns')}
                                                >
                                                    Quản lý chiến dịch cá nhân
                                                </Button>
                                            )}
                                        </div>
                                        <div className="raise-info__section__social-media">
                                            <Button icon={<FacebookFilled />} shape="circle" onClick={() => data.facebook ? window.location.href = data.facebook : false} />
                                            <Button icon={<TwitterSquareFilled />} shape="circle" onClick={() => data.twitter ? window.location.href = data.twitter : false} />
                                            <Button icon={<PaperClipOutlined />} shape="circle" onClick={() => data.website ? window.location.href = data.website : false} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Divider />
            <section className="campaign-detail__body">
                <Container>
                    <Row style={{ width: '100%' }}>
                        <Col span={12}>
                            <div className="campaign-detail__body__left">
                                <Menu onClick={(e) => handleClickMenu(e.key)} selectedKeys={[selectedMenuKey]} mode="horizontal">
                                    <Menu.Item key="1" icon={<ContainerOutlined />}>
                                        Câu chuyện
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<HistoryOutlined />}>
                                        {`Dòng thời gian (${postedStatusList.length})`}
                                    </Menu.Item>
                                    <Menu.Item key="3" icon={<CommentOutlined />}>
                                        {`Phản hồi (${feedbackList.length})`}
                                    </Menu.Item>
                                    <Menu.Item key="4" icon={<TeamOutlined />}>
                                        Tổ chức đại diện
                                    </Menu.Item>
                                </Menu>
                                <div className="campaign-detail__body__left__content" style={{ minHeight: storyRef.current ? storyRef.current.clientHeight : 800 }}>
                                    {selectedMenuKey === '1' && (
                                        <QueueAnim delay={25}>
                                            <div ref={storyRef} key="story" className="tab-content tab-content--story">
                                                <div className="btn-edit-story-wrapper">
                                                    {user && user.id === data.owner.id && (
                                                        <Button
                                                            icon={<EditFilled />}
                                                            size="small"
                                                            onClick={() => setStoryEditorVisible(true)}
                                                            disabled={data.status.value === campaignStatus.CLOSED.value}
                                                        >
                                                            Chỉnh sửa
                                                        </Button>
                                                    )}
                                                </div>
                                                {htmlParse(data.story)}
                                            </div>
                                        </QueueAnim>
                                    )}
                                    {selectedMenuKey === '2' && (
                                        <QueueAnim delay={25}>
                                            <div key="timeline" className="tab-content tab-content--timeline">
                                                {user && user.id === data.owner.id && (
                                                    <Button
                                                        className="btn-add-new-timeline"
                                                        size="large"
                                                        onClick={() => setPostStatusModalVisible(true)}
                                                        ghost
                                                        type="primary"
                                                        disabled={data.status.value === campaignStatus.CLOSED.value}
                                                    >
                                                        TRẠNG THÁI MỚI
                                                    </Button>
                                                )}
                                                <div className="posted-statuses">
                                                    {postedStatusList.map(s => (
                                                        <div key={s.id} className="posted-statuses__item">
                                                            <PostedStatus data={s} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </QueueAnim>
                                    )}
                                    {selectedMenuKey === '3' && (
                                        <QueueAnim delay={25}>
                                            <div key="feedbacks" className="tab-content tab-content--feedback">
                                                <div className="comment-input">
                                                    <Avatar src={user ? user.avatar : defaultUserAvatar} size={50} />
                                                    <Form
                                                        form={addCommentForm}
                                                        onFinish={handleAddCommentFormFinished}
                                                    >
                                                        <Form.Item name="comment">
                                                            <TextArea
                                                                ref={commentTextAreaRef}
                                                                rows={4}
                                                                placeholder={user ? `${user.fullName}, bạn nghĩ gì về chiến dịch này?` : 'Bạn nghĩ gì về chiến dịch này?'}
                                                                onKeyUp={e => {
                                                                    if (e.keyCode === 13) {
                                                                        addCommentForm.submit();

                                                                        if (commentTextAreaRef.current) {
                                                                            commentTextAreaRef.current.focus();
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </Form.Item>
                                                        <Button
                                                            type="primary"
                                                            onClick={() => addCommentForm.submit()}
                                                        >
                                                            Gửi bình luận
                                                        </Button>
                                                    </Form>
                                                </div>
                                                <div className="feedbacks">
                                                    {feedbackList.map(f => (
                                                        <QueueAnim delay={50} key={f.id}>
                                                            <div className="feedbacks__item" key={f.id}>
                                                                <Feedback data={f} />
                                                            </div>
                                                        </QueueAnim>
                                                    ))}
                                                </div>
                                            </div>
                                        </QueueAnim>
                                    )}
                                    {selectedMenuKey === '4' && (
                                        <QueueAnim delay={25}>
                                            <div key="stander" className="tab-content tab-content--stander">
                                                <div className="tab-content--stander__left">
                                                    <img src={data.stander.logo} alt={data.stander.name} />
                                                </div>
                                                <div className="tab-content--stander__right">
                                                    <Title level={3}>{data.stander.name}</Title>
                                                    <p>{data.stander.introduction}</p>
                                                    <p>Website: <a href={data.stander.website} target="_blank" rel="noopener noreferrer">{data.stander.website}</a></p>
                                                </div>
                                            </div>
                                        </QueueAnim>
                                    )}
                                </div>
                                <div className="tags">
                                    {data.tags.map((t, i) => (
                                        <Tag key={i}>{`#${t}`}</Tag>
                                    ))}
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="campaign-detail__body__right">
                                <div className="inner">
                                    <div className="title">
                                        <Title level={4}>Gói quyên góp</Title>
                                        {user && user.id === data.owner.id && (
                                            <Tooltip title="Tạo gói mới" placement="right">
                                                <Button
                                                    type="primary"
                                                    icon={<PlusOutlined />}
                                                    shape="circle"
                                                    onClick={() => setCreateDonationPackageModalVisible(true)}
                                                    disabled={data.status.value === campaignStatus.CLOSED.value}
                                                />
                                            </Tooltip>
                                        )}
                                    </div>
                                    <div className="packages">
                                        {data.packages.map(p => (
                                            <div className="packages__item" key={p.id}>
                                                <PackagePreview
                                                    data={p}
                                                    onClick={(packageData) => {
                                                        setSelectedPackage({ ...packageData });
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Divider />
            <section className="campaign-detail__suggestion">
                <Container>
                    <SectionTitle level={3}>Có thể bạn quan tâm</SectionTitle>
                    <div className="carousel">
                        <CampaignPreviewCarousel campaigns={relatedCampaignList} from="campaign" />
                    </div>
                </Container>
            </section>

            <Drawer
                title={data.title}
                width={350}
                visible={donationLogVisible}
                closable
                onClose={() => setDonationLogVisible(false)}
            >
                <Timeline>
                    {data.donationLogs.map(l => (
                        <Timeline.Item key={l.id}>
                            <DonationLogItem data={l} donationPackages={data.packages} />
                        </Timeline.Item>
                    ))}
                </Timeline>
            </Drawer>

            <Drawer
                title="Chỉnh sửa thông tin chiến dịch"
                width={800}
                visible={editingCampaignVisible}
                closable
                onClose={() => setEditingCampaignVisible(false)}
            >
                <CampaignBasicInfoForm
                    form={editingCampaignForm}
                    initValues={{
                        ...data,
                        standerLogo: data.stander.logo,
                        standerName: data.stander.name,
                        standerWebsite: data.stander.website,
                        standerIntroduction: data.stander.introduction,
                    }}
                    onFinished={handleEditingCampaignFormFinished}
                    onFinishFailed={handleEditingCampaignFormFinishFailed}
                />
                <Button
                    style={{ width: '100%' }}
                    type="primary"
                    size="large"
                    loading={submitEditingCampaignLoading}
                    onClick={() => editingCampaignForm.submit()}
                >
                    Cập nhật thông tin chiến dịch
                </Button>
            </Drawer>

            <DonationModal
                visible={donationModalVisible}
                onClose={() => setDonationModalVisible(false)}
                data={data}
                onSubmit={(option, packageData) => {
                    setDonationModalVisible(false);

                    switch (option) {
                        case 1:
                            setQRPaymentModalVisible(true);
                            break;

                        case 2:
                            setDonationPackageDetailModalVisible(true);
                            setSelectedPackage(packageData);
                            break;

                        default:
                            break;
                    }
                }}
            />

            <QRPaymentModal
                visible={qRPaymentModalVisible}
                onClose={() => setQRPaymentModalVisible(false)}
            />

            <CreateDonationPackageModal
                visible={createDonationPackageModalVisible}
                data={{
                    concurrency: data.concurrency,
                }}
                onClose={() => setCreateDonationPackageModalVisible(false)}
                onSubmit={() => setCreateDonationPackageModalVisible(false)}
            />

            <PostStatusModal
                visible={postStatusModalVisible}
                onClose={() => setPostStatusModalVisible(false)}
                onSubmit={(content, fileList) => {
                    dispatch(addPostedStatus({
                        id: v4(),
                        createdAt: new Date().toISOString(),
                        location: 'TP.Hồ Chí Minh, Việt Nam',
                        content,
                        mediaFiles: fileList,
                    }));
                    setPostStatusModalVisible(false);
                }}
            />

            <StoryEditingModal
                visible={storyEditorVisible}
                initContent={data.story}
                onClose={() => setStoryEditorVisible(false)}
                onSubmit={(story) => {
                    setStoryEditorVisible(false);
                    setData({
                        ...data,
                        status: campaignStatus.REVIEW,
                        story
                    });
                    dispatch(addNotification({
                        id: v4(),
                        sender: { ...user, isCampaignOwner: true },
                        receiver: mockUser2,
                        content: `
                            Vui lòng duyệt <b>Câu chuyện</b> của chiến dịch <a href="/campaign/${data.id}?tab=1">${data.title}</a> cho tôi.
                        `,
                        createdAt: new Date().toISOString(),
                    }));
                    message.success('Câu chuyện cập nhật sẽ được chuyển đến Quản trị viên để kiểm duyệt');
                }}
            />

            <UpdateDonationPackageModal
                title="Cập nhật gói quyên góp"
                data={{
                    ...selectedPackage,
                    currency: data.currency,
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

            <PackageDetailModal
                data={{
                    ...selectedPackage,
                    currency: data.currency,
                }}
                visible={donationPackageDetailModalVisible}
                onClose={() => {
                    setDonationPackageDetailModalVisible(false);
                }}
                onDonate={() => {
                    if (!user) {
                        history.push(signInLocation.current);
                        return;
                    }
                    setDonationPackageDetailModalVisible(false);
                    setQRPaymentModalVisible(true);
                }}
                donationAllowed={donationAllowed}
                donationDisabled={donationDisabled}
            />

        </div>
    )
}
