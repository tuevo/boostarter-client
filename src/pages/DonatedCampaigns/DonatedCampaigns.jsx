import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Input, PageHeader } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CampaignPreview from '../../components/CampaignPreview';
import Container from '../../components/Container';
import { useScrollTop } from '../../hooks';
import './DonatedCampaigns.scss';

export default function DonatedCampaigns(props) {
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
        <div className="donated-campaigns">
            <div className="donated-campaigns__header">
                <Container>
                    <PageHeader
                        onBack={() => history.goBack()}
                        title="Chiến dịch quyên góp"
                    />
                </Container>
            </div>

            <div className="donated-campaigns__content">
                <Container>
                    <Card className="donated-campaigns__card animate__animated animate__fadeInUp">
                        <div className="donated-campaigns__card__title donated-campaigns__card__title--extra">
                            <Input className="app-search-input" size="large" placeholder="Tìm kiếm chiến dịch..." prefix={<SearchOutlined />} />
                        </div>
                        <div className="donated-campaigns__campaigns">
                            {campaignList.map((c, i) => (
                                <div key={i} className="animate__animated animate__zoomIn donated-campaigns__campaigns__item" style={{ animationDelay: `${0.1 * i}s` }}>
                                    <CampaignPreview data={c} from="donated-campaignss" />
                                </div>
                            ))}
                        </div>
                        <div className="donated-campaigns__btn-more-campaign">
                            <Button type="primary" size="large">Xem thêm chiến dịch</Button>
                        </div>
                    </Card>
                </Container>
            </div>
        </div>
    )
}
