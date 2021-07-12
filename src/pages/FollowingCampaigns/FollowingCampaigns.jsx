import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Input, PageHeader } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CampaignPreview from '../../components/CampaignPreview';
import Container from '../../components/Container';
import { useScrollTop } from '../../hooks';
import './FollowingCampaigns.scss';

export default function FollowingCampaigns(props) {
    useScrollTop();
    const history = useHistory();
    const user = useSelector(state => state.user.auth);
    const campaignList = useSelector(state => state.campaigns);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!user) {
        return history.push({
            pathname: '/sign-in',
            state: {
                from: `${props.location.pathname}${props.location.search}`
            }
        });
    }

    return (
        <div className="following-campaigns">
            <div className="following-campaigns__header">
                <Container>
                    <PageHeader
                        onBack={() => history.goBack()}
                        title="Chiến dịch theo dõi"
                    />
                </Container>
            </div>

            <div className="following-campaigns__content">
                <Container>
                    <Card className="following-campaigns__card animate__animated animate__fadeInUp">
                        <div className="following-campaigns__card__title following-campaigns__card__title--extra">
                            <Input className="app-search-input" size="large" placeholder="Tìm kiếm chiến dịch..." prefix={<SearchOutlined />} />
                        </div>
                        <div className="following-campaigns__campaigns">
                            {campaignList.map((c, i) => (
                                <div key={i} className="animate__animated animate__zoomIn following-campaigns__campaigns__item" style={{ animationDelay: `${0.1 * i}s` }}>
                                    <CampaignPreview data={c} from="following-campaignss" />
                                </div>
                            ))}
                        </div>
                        <div className="following-campaigns__btn-more-campaign">
                            <Button type="primary" size="large">Xem thêm chiến dịch</Button>
                        </div>
                    </Card>
                </Container>
            </div>
        </div>
    )
}
