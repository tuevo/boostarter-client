import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import quoteIcon from '../../assets/images/quote-white.png';
import AppLoading from '../../components/AppLoading/AppLoading';
import CampaignPreviewCarousel from '../../components/CampaignPreviewCarousel/CampaignPreviewCarousel';
import Container from '../../components/Container';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import SingleCampaignPreviewCarousel from '../../components/SingleCampaignPreviewCarousel/SingleCampaignPreviewCarousel';
import { APP_MISSION, APP_NAME, featuredServices } from '../../constants';
import { useScrollTop } from '../../hooks';
import { mockCampaign1, mockCategoryList, mockFeedbackList } from '../../mock-data';
import { scrollToElement, setAppLoading } from '../../redux';
import './Home.scss';

export default function Home() {
    useScrollTop();
    const history = useHistory();
    const dispatch = useDispatch();

    const app = useSelector(state => state.app);
    const user = useSelector(state => state.user.auth);

    const featuredServiceRef = useRef(null);
    const featuredCampaignRef = useRef(null);
    const successCampaignRef = useRef(null);
    const featuredCategoryRef = useRef(null);
    const featuredFeedbackRef = useRef(null);
    const strategicPartnerRef = useRef(null);

    const popularCampaignList = useSelector(state => state.campaigns);
    const featuredCampaign = popularCampaignList.find((c) => c.id === mockCampaign1.id);

    const successCampaignList = useSelector(state => state.campaigns.slice(1, 4));
    let activeSuccessCampaign = successCampaignList[0];

    const onSuccessCampaignCarouselChange = (index) => {
        if (index === -1)
            return;

        activeSuccessCampaign = successCampaignList[index];
        if (activeSuccessCampaign && successCampaignRef.current) {
            successCampaignRef.current.style.backgroundImage = `url(${activeSuccessCampaign.thumbnail})`;
        }
    }

    useLayoutEffect(() => {
        setTimeout(() => {
            dispatch(setAppLoading(false));
        }, 1000);
    }, [dispatch]);

    useEffect(() => {
        switch (app.elementIdToScroll) {
            case 'home':
                window.scrollTo({ top: 0 });
                break;
            case 'featured-service':
                if (featuredServiceRef.current) {
                    window.scrollTo({ top: featuredServiceRef.current.offsetTop - (featuredServiceRef.current.clientHeight / 2) });
                }
                break;
            case 'featured-campaign':
                if (featuredCampaignRef.current) {
                    window.scrollTo({ top: featuredCampaignRef.current.offsetTop - (featuredCampaignRef.current.clientHeight / 12) });
                }
                break;
            case 'success-campaign':
                if (successCampaignRef.current) {
                    window.scrollTo({ top: successCampaignRef.current.offsetTop - (successCampaignRef.current.clientHeight / 10) });
                }
                break;
            case 'featured-category':
                if (featuredCategoryRef.current) {
                    window.scrollTo({ top: featuredCategoryRef.current.offsetTop - (featuredCategoryRef.current.clientHeight / 25) });
                }
                break;
            case 'featured-feedback':
                if (featuredFeedbackRef.current) {
                    window.scrollTo({ top: featuredFeedbackRef.current.offsetTop - (featuredFeedbackRef.current.clientHeight / 7) });
                }
                break;
            case 'strategic-partner':
                if (strategicPartnerRef.current) {
                    window.scrollTo({ top: strategicPartnerRef.current.offsetTop - (strategicPartnerRef.current.clientHeight / 2) });
                }
                break;

            default:
                break;
        }

        dispatch(scrollToElement(null));
    }, [app.elementIdToScroll]);

    if (app.loading) {
        return <AppLoading />
    }

    return (
        <div className="home animate__animated animate__fadeIn">
            <section
                className="banner"
                style={{ backgroundImage: `url(${featuredCampaign.thumbnail})` }}
            >
                <div className="dark-cover">
                    <Container fluid>
                        <div className="left">
                            <div className="campaign">
                                <Title className="title" level={1}>{featuredCampaign.title}</Title>
                                <p className="desc">{featuredCampaign.desc}</p>
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
                                    <b>{APP_NAME}</b> {APP_MISSION}
                                </p>
                                <div className="buttons">
                                    {!user && (
                                        <Button
                                            className="featured-content__btn-register"
                                            size="large"
                                            type="primary"
                                            onClick={() => history.push('/sign-up')}
                                        >
                                            Trải nghiệm ngay
                                        </Button>
                                    )}
                                    <Button className="featured-content__btn-more" size="large">Tìm hiểu thêm</Button>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </section>
            <section className="featured-services" ref={featuredServiceRef}>
                <Container>
                    <div className="service-list">
                        {featuredServices.map((s, i) => (
                            <div key={i} className="featured-service">
                                <FontAwesomeIcon icon={s.icon} size="6x" className="featured-service__icon" />
                                <Title level={4}>{s.name}</Title>
                                <p>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
            <section className="popular-campaigns" ref={featuredCampaignRef}>
                <Container>
                    <SectionTitle center>Chiến dịch nổi bật</SectionTitle>
                    <div className="carousel">
                        <CampaignPreviewCarousel campaigns={popularCampaignList} from="home" />
                    </div>
                </Container>
            </section>
            <section
                ref={successCampaignRef}
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
            <section className="featured-categories" ref={featuredCategoryRef}>
                <Container>
                    <SectionTitle center>
                        Lĩnh vực bạn quan tâm
                    </SectionTitle>
                    <div className="categories">
                        {mockCategoryList.map(c => (
                            <div key={c.id} className="category">
                                <img src={c.thumbnail} alt="" />
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
            <section className="featured-feedbacks" ref={featuredFeedbackRef}>
                <Container>
                    <SectionTitle center>
                        Đánh giá hàng đầu
                    </SectionTitle>
                    <div className="feedbacks">
                        {mockFeedbackList.slice(0, 3).map(f => (
                            <div key={f.id} className="feedback">
                                <div className="feedback__icon">
                                    <img src={quoteIcon} alt="feedback icon" />
                                </div>
                                <Avatar src={f.avatar} size={80} />
                                <p className="feedback__comment">
                                    {f.comment}
                                </p>
                                <div className="feedback__footer">
                                    <Title className="feedback__name" level={5}>{f.fullName}</Title>
                                    <p className="feedback__bio">
                                        {`${f.bio.role} tại `} <span className="feedback__bio__organization">{f.bio.organization}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
            <section className="partners" ref={strategicPartnerRef}>
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
