import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, PageHeader } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CampaignPreview from '../../components/CampaignPreview';
import Container from '../../components/Container';
import CreateCampaignModal from '../../components/CreateCampaignModal';
import './PersonalCampaign.scss';

export default function PersonalCampaign() {
  const history = useHistory();
  const campaignList = useSelector(state => [...state.campaigns, ...state.campaigns.slice(0, 3)]);
  const [createCampaignVisible, setCreateCampaignVisible] = useState(false);

  return (
    <div className="personal-campaign">
      <Container>
        <Card>
          <PageHeader
            onBack={() => history.goBack()}
            title="Chiến dịch cá nhân"
            extra={[
              <Button
                icon={<PlusOutlined />}
                size="large"
                type="primary"
                className="personal-campaign__btn-create"
                onClick={() => setCreateCampaignVisible(true)}
              >
                Tạo chiến dịch
              </Button>
            ]}
          />
          <div className="personal-campaign__campaigns">
            {campaignList.map((c, i) => (
              <div key={i} className="animate__animated animate__zoomIn personal-campaign__campaigns__item" style={{ animationDelay: `${0.1 * i}s` }}>
                <CampaignPreview data={c} />
              </div>
            ))}
          </div>
        </Card>

      </Container>

      <CreateCampaignModal
        visible={createCampaignVisible}
        onClose={() => setCreateCampaignVisible(false)}
      />

    </div>
  )
}
