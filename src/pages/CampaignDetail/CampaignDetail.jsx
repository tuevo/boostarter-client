import { CheckCircleFilled, CheckOutlined, CommentOutlined, ContainerOutlined, DeleteFilled, EditFilled, FacebookFilled, HeartFilled, HeartOutlined, HistoryOutlined, PaperClipOutlined, PlusOutlined, TwitterSquareFilled } from '@ant-design/icons';
import { Avatar, Button, Col, Divider, Drawer, Form, List, Menu, message, Progress, Rate, Row, Tag, Timeline, Tooltip } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import Title from 'antd/lib/typography/Title';
import parse from 'html-react-parser';
import queryString from 'query-string';
import QueueAnim from 'rc-queue-anim';
import React, { useRef, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import CampaignBasicInfoForm from '../../components/CampaignBasicInfoForm/CampaignBasicInfoForm';
import CampaignPreviewCarousel from '../../components/CampaignPreviewCarousel';
import Container from '../../components/Container';
import DonationLogItem from '../../components/DonationLogItem';
import DonationModal from '../../components/DonationModal/DonationModal';
import Feedback from '../../components/Feedback/Feedback';
import PackagePreview from '../../components/PackagePreview';
import PostedStatus from '../../components/PostedStatus';
import QRPaymentModal from '../../components/QRPaymentModal';
import SectionTitle from '../../components/SectionTitle';
import { addFeedback } from '../../redux';
import { daysFromNow } from '../../utils/date-time';
import './CampaignDetail.scss';

export default function CampaignDetail(props) {
  const { id } = useParams();

  const queryParams = queryString.parse(props.location.search);
  if (queryParams['from'] === 'home') {
    window.scrollTo(0, 0);
  }

  const dispatch = useDispatch();
  const history = useHistory();
  const storyRef = useRef();

  const user = useSelector(state => state.user.auth);
  const campaignList = useSelector(state => state.campaigns);
  const postedStatusList = useSelector(state => state.postedStatuses);
  const feedbackList = useSelector(state => state.feedbacks);
  const donationPackageList = useSelector(state => state.donationPackages);
  const relatedCampaignList = campaignList.filter(c => c.id !== +id);

  const [data, setData] = useState(campaignList.find(c => c.id === +id));
  const [selectedMenuKey, setSelectedMenuKey] = useState(queryParams['tab']);
  const [donationLogVisible, setDonationLogVisible] = useState(false);

  const [editingCampaignVisible, setEditingCampaignVisible] = useState(false);
  const [editingCampaignForm] = useForm();
  const [submitEditingCampaignLoading, setSubmitEditingCampaignFormLoading] = useState(false);

  const [btnFollowSelectable, setBtnFollowSelectable] = useState(data.isFollowed || false);

  const [addCommentForm] = useForm();

  const [donationModalVisible, setDonationModalVisible] = useState(false);
  const [qRPaymentModalVisible, setQRPaymentModalVisible] = useState(false);

  const currentRaisePeriod = daysFromNow(data.endDate);
  const currentRaisePercent = Math.round(data.currentRaise / data.targetRaise * 100);

  const handleClickMenu = (key) => {
    setSelectedMenuKey(key);
    history.push(`/campaign/${id}?tab=${key}`);
  };

  const handleEditingCampaignFormFinished = (values) => {
    setSubmitEditingCampaignFormLoading(true);
    console.log(values);

    setTimeout(() => {
      setData({ ...data, ...values });
      setSubmitEditingCampaignFormLoading(false);
      setEditingCampaignVisible(false);
      message.success('Cập nhật thông tin chiến dịch thành công!');
    }, 1000);
  }

  const handleEditingCampaignFormFinishFailed = () => {
    message.error('Đã có lỗi xảy ra! Vui lòng kiểm tra lại thông tin.');
  }

  const handleAddCommentFormFinished = (values) => {
    if (!user.id)
      return;

    const newFeedback = {
      id: v4(),
      createdAt: new Date().toISOString(),
      rating: 4.5,
      isCampaignOwner: user.id ? user.id === data.owner.id : false,
      comment: values['comment'],
      ...user
    };
    dispatch(addFeedback(newFeedback));
    addCommentForm.resetFields();
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
                    <Tag color={data.status.color}>{data.status.name}</Tag>
                  </div>
                  <div className="toolbar__controls">
                    <Button
                      className="toolbar__controls__btn-accept"
                      icon={<CheckOutlined />}
                      type="primary"
                      onClick={() => message.success('Duyệt chiến dịch thành công')}
                    >
                      Duyệt
                    </Button>
                    <Button icon={<DeleteFilled />} danger>Gỡ bỏ</Button>
                    <Button
                      className="toolbar__controls__btn-edit"
                      icon={<EditFilled />}
                      onClick={() => setEditingCampaignVisible(true)}
                    >
                      Chỉnh sửa
                    </Button>
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
                  <Progress percent={currentRaisePercent} showInfo={false} status="active" />
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
                      <Button
                        type="primary"
                        size="large"
                        onClick={() => setDonationModalVisible(true)}
                      >
                        Quyên góp
                      </Button>
                      <Button
                        className="btn-follow"
                        type="primary"
                        size="large"
                        icon={btnFollowSelectable ? <HeartFilled /> : <HeartOutlined />}
                        onClick={() => {
                          setBtnFollowSelectable(!btnFollowSelectable);
                          message.success(!btnFollowSelectable ? 'Đã thêm vào Danh sách chiến dịch theo dõi' : 'Đã xóa khỏi Danh sách chiến dịch theo dõi')
                        }}
                      >
                        Theo dõi
                      </Button>
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
                </Menu>
                <div className="campaign-detail__body__left__content" style={{ minHeight: storyRef.current ? storyRef.current.clientHeight : 800 }}>
                  {selectedMenuKey === '1' && (
                    <QueueAnim delay={25}>
                      <div ref={storyRef} key="story" className="tab-content tab-content--story">
                        <div className="btn-edit-story-wrapper">
                          <Button icon={<EditFilled />} size="small">Chỉnh sửa</Button>
                        </div>
                        {parse(data.story)}
                      </div>
                    </QueueAnim>
                  )}
                  {selectedMenuKey === '2' && (
                    <QueueAnim delay={25}>
                      <div key="timeline" className="tab-content tab-content--timeline">
                        <Button className="btn-add-new-timeline" size="large">TRẠNG THÁI MỚI</Button>
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
                          <Avatar src={user ? user.avatar : 'https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'} size={50} />
                          <Form
                            form={addCommentForm}
                            onFinish={handleAddCommentFormFinished}
                          >
                            <Form.Item name="comment">
                              <TextArea rows={4} placeholder={user ? `${user.fullName}, bạn nghĩ gì về chiến dịch này?` : 'Bạn nghĩ gì về chiến dịch này?'} />
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
                    <Tooltip title="Tạo gói mới" placement="right">
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        shape="circle"
                      />
                    </Tooltip>
                  </div>
                  <div className="packages">
                    {donationPackageList.map(p => (
                      <div className="packages__item" key={p.id}>
                        <PackagePreview data={p} onClick={(_data) => setQRPaymentModalVisible(true)} />
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
            <CampaignPreviewCarousel campaigns={relatedCampaignList} />
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
              <DonationLogItem data={l} donationPackages={donationPackageList} />
            </Timeline.Item>
          ))}
        </Timeline>
      </Drawer>

      <Drawer
        title="Chỉnh sửa thông tin chiến dịch"
        width={600}
        visible={editingCampaignVisible}
        closable
        onClose={() => setEditingCampaignVisible(false)}
      >
        <CampaignBasicInfoForm
          form={editingCampaignForm}
          initValues={{ ...data }}
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
        onSubmit={(option, _data) => {
          setDonationModalVisible(false);
          setQRPaymentModalVisible(true);
        }}
      />

      <QRPaymentModal
        visible={qRPaymentModalVisible}
        onClose={() => setQRPaymentModalVisible(false)}
      />

    </div>
  )
}
