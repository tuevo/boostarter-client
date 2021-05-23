import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import CampaignPreviewCarousel from '../../components/CampaignPreviewCarousel/CampaignPreviewCarousel';
import Container from '../../components/Container';
import CtaButton from '../../components/CtaButton';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import SingleCampaignPreviewCarousel from '../../components/SingleCampaignPreviewCarousel/SingleCampaignPreviewCarousel';
import { mockCampaign, mockCampaignList } from '../../mock-data/campaign';
import './Home.scss';

export default function Home() {
  return (
    <div className="home">
      <section className="banner" style={{ backgroundImage: 'url(https://pbs.twimg.com/media/E0xmq8MXIAM4aTa?format=jpg&name=4096x4096)' }}>
        <div className="dark-cover">
          <Container fluid>
            <div className="left">
              <div className="campaign">
                <Title className="title" level={1}>VÌ MIỀN TRUNG THÂN YÊU</Title>
                <p className="desc">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrup.
              </p>
              </div>
              <Button className="btn-view-campaign-detail" type="link">Xem chiến dịch</Button>
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
                  Boostarter là một website dành cho những người muốn gây quỹ từ cộng đồng bằng cách lan tỏa câu chuyện của họ đến với nhiều người hơn và thay mặt họ tiếp nhận sự đóng góp từ cộng đồng.
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
            <CampaignPreviewCarousel
              campaigns={mockCampaignList}
            />
          </div>
        </Container>
      </section>
      <section
        className="success-campaigns"
        style={{ backgroundImage: `url(${mockCampaign.thumbnail})` }}
      >
        <div className="dark-cover">
          <Container>
            <SectionTitle center success>
              Chiến dịch thành công
            </SectionTitle>
            <div className="carousel">
              <SingleCampaignPreviewCarousel
                campaigns={mockCampaignList}
              />
            </div>
          </Container>
        </div>
      </section>
    </div>
  )
}
