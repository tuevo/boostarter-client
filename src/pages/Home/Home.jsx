import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useRef } from 'react';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import quoteIcon from '../../assets/images/quote-white.png';
import CampaignPreviewCarousel from '../../components/CampaignPreviewCarousel/CampaignPreviewCarousel';
import Container from '../../components/Container';
import CtaButton from '../../components/CtaButton';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import SingleCampaignPreviewCarousel from '../../components/SingleCampaignPreviewCarousel/SingleCampaignPreviewCarousel';
import { mockCategoryList, mockFeedbackList } from '../../mock-data';
import './Home.scss';

export default function Home() {
  const history = useHistory();
  const successCampaignSectionRef = useRef();
  const popularCampaignList = useSelector(state => state.campaigns);
  const successCampaignList = useSelector(state => state.campaigns.slice(1, 4));
  let activeSuccessCampaign = successCampaignList[0];

  const onSuccessCampaignCarouselChange = (index) => {
    if (index === -1)
      return;

    activeSuccessCampaign = successCampaignList[index];
    if (activeSuccessCampaign && successCampaignSectionRef.current) {
      successCampaignSectionRef.current.style.backgroundImage = `url(${activeSuccessCampaign.thumbnail})`;
    }
  }

  return (
    <div className="home animate__animated animate__fadeIn">
      <section
        className="banner"
        style={{ backgroundImage: 'url(https://pbs.twimg.com/media/E0xmq8MXIAM4aTa?format=jpg&name=4096x4096)' }}
      >
        <div className="dark-cover">
          <Container fluid>
            <div className="left">
              <div className="campaign">
                <Title className="title" level={1}>VÌ MIỀN TRUNG THÂN YÊU</Title>
                <p className="desc">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrup.
              </p>
              </div>
              <Button
                className="btn-view-campaign-detail"
                type="link"
                onClick={() => history.push('/campaign/1?tab=1&from=home')}
              >
                Xem chiến dịch
              </Button>
              <div className="slide-controls">
                <Button className="btn" icon={<LeftOutlined />} type="ghost" shape="circle" />
                <Button className="btn" icon={<RightOutlined />} type="ghost" shape="circle" />
                <span className="status">1/3</span>
              </div>
            </div>
            <div className="right">
              <div className="featured-content">
                <Title className="title" level={2}>{'Tầm nhìn & sứ mệnh'}</Title>
                <p className="desc">
                  <b>Boostarter</b> là một website dành cho những người muốn gây quỹ từ cộng đồng bằng cách lan tỏa câu chuyện của họ đến với nhiều người hơn và thay mặt họ tiếp nhận sự đóng góp từ cộng đồng.
                </p>
                <div className="buttons">
                  <CtaButton size="large">Đăng ký ngay</CtaButton>
                  <Button className="btn-more" size="large">Tìm hiểu thêm</Button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
      <section className="popular-campaigns">
        <Container>
          <SectionTitle center>Chiến dịch nổi bật</SectionTitle>
          <div className="carousel">
            <CampaignPreviewCarousel campaigns={popularCampaignList} from="home" />
          </div>
        </Container>
      </section>
      <section
        ref={successCampaignSectionRef}
        className="success-campaigns"
        style={{ backgroundImage: `url(${activeSuccessCampaign.thumbnail})` }}
      >
        <div className="dark-cover">
          <Container>
            <SectionTitle center success>
              Chiến dịch thành công
            </SectionTitle>
            <div className="carousel">
              <SingleCampaignPreviewCarousel
                campaigns={successCampaignList}
                from="home"
                onChange={index => onSuccessCampaignCarouselChange(index)}
              />
            </div>
          </Container>
        </div>
      </section>
      <section className="featured-categories">
        <Container>
          <SectionTitle center>
            Có thể bạn quan tâm
          </SectionTitle>
          <div className="categories">
            {mockCategoryList.map(c => (
              <div key={c.id} className="category" style={{ backgroundImage: `url(${c.thumbnail})` }}>
                <div className="category__dark-cover">
                  <div className="category__detail">
                    <Title className="category__name" level={3}>{c.name}</Title>
                    <Title className="category__statistics" level={4}>
                      <NumberFormat
                        displayType="text"
                        value={c.numberOfCampaigns}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        suffix={'+ chiến dịch'}
                      />
                    </Title>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="featured-feedbacks">
        <Container>
          <SectionTitle center>
            Đánh giá hàng đầu
          </SectionTitle>
          <div className="feedbacks">
            {mockFeedbackList.filter(f => !f.isCampaignOwner).map(f => (
              <div key={f.id} className="feedback">
                <div className="feedback__icon">
                  <img src={quoteIcon} alt="feedback icon" />
                </div>
                <Avatar src={f.avatar} size={80} />
                <p className="feedback__comment">
                  {f.comment}
                </p>
                <div className="feedback__footer">
                  <Title className="feedback__name" level={5}>{f.name}</Title>
                  <p className="feedback__bio">
                    {`${f.bio.role} tại `} <span className="feedback__bio__organization">{f.bio.organization}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="partners">
        <Container>
          <SectionTitle center>
            Đối tác của chúng tôi
          </SectionTitle>
          <div className="partners__list">
            <img src="https://i.ibb.co/ydFT0Dr/1-1.jpg" alt="1" />
            <img src="https://i.ibb.co/2jRvbsj/8.png" alt="8" />
            <img src="https://i.ibb.co/ZLzS7fk/4.jpg" alt="4" />
            <img src="https://i.ibb.co/kMPzxXR/5-1.jpg" alt="5-1" />
            <img src="https://i.ibb.co/0fj0QRM/3-1.jpg" alt="3-1" />
            <img src="https://i.ibb.co/RhWz3F5/2.png" alt="2" />
          </div>
        </Container>
      </section>
    </div>
  )
}
