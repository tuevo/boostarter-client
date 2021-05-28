import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, PageHeader, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import NumberFormat from 'react-number-format';
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

  const pieChartData = {
    labels: ['Đã kết thúc', 'Đang chờ duyệt', 'Đang gây quỹ', 'Đã tạm dừng'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(68, 181, 67, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(68, 181, 67, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const lineChartData = {
    labels: ['28/05', '23/05', '24/05', '25/05', '26/05', '27/05', '28/05'],
    datasets: [
      {
        label: 'Số tiền',
        data: [800000, 1500000, 300000, 550000, 250000, 1000000, 500000],
        fill: true,
        lineTension: 0.3,
        backgroundColor: 'rgb(68, 181, 67, 0.1)',
        borderColor: 'rgba(68, 181, 67, 0.5)',
        pointBackgroundColor: 'rgb(68, 181, 67, 1)',
      },
    ],
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="personal-campaign">
      <div className="personal-campaign__header">
        <Container>
          <PageHeader
            onBack={() => history.goBack()}
            title="Chiến dịch cá nhân"
            extra={[
              <Button
                key="btn-create"
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
        </Container>
      </div>

      <div className="personal-campaign__content personal-campaign__content--statistics">
        <Container>
          <Row gutter={15}>
            <Col span={8}>
              <Card className="personal-campaign__card animate__animated animate__fadeInLeft">
                <div className="personal-campaign__card__title">
                  <NumberFormat
                    className="personal-campaign__card__number"
                    displayType="text"
                    value={38}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                  />
                  {' chiến dịch'}
                </div>
                <Doughnut data={pieChartData} />
              </Card>
            </Col>
            <Col span={16}>
              <Card className="personal-campaign__card animate__animated animate__fadeInRight">
                <div className="personal-campaign__card__title personal-campaign__card__title personal-campaign__card__title personal-campaign__card__title--extra">
                  <span>Tần suất nhận quyên góp</span>
                  <Select defaultValue={1}>
                    <Select.Option value={1}>7 ngày gần đây</Select.Option>
                    <Select.Option value={2}>1 tháng gần đây</Select.Option>
                  </Select>
                </div>
                <Line
                  data={lineChartData}
                  options={{
                    plugins: {
                      legend: {
                        display: false
                      }
                    }
                  }}
                  height={138}
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="personal-campaign__content">
        <Container>
          <Card className="personal-campaign__card animate__animated animate__fadeInUp">
            <div className="personal-campaign__card__title personal-campaign__card__title personal-campaign__card__title personal-campaign__card__title--extra">
              <span>Danh sách chiến dịch</span>
              <div>
                <Input className="search-input" size="large" placeholder="Tìm kiếm chiến dịch..." prefix={<SearchOutlined />} />
                <Select className="filter-select" defaultValue={1}>
                  <Select.Option value={1}>Tất cả</Select.Option>
                  <Select.Option value={2}>Đang chờ duyệt</Select.Option>
                  <Select.Option value={3}>Đang gây quỹ</Select.Option>
                  <Select.Option value={4}>Đã tạm dừng</Select.Option>
                  <Select.Option value={5}>Đã kết thúc</Select.Option>
                </Select>
              </div>
            </div>
            <div className="personal-campaign__campaigns">
              {campaignList.map((c, i) => (
                <div key={i} className="animate__animated animate__zoomIn personal-campaign__campaigns__item" style={{ animationDelay: `${0.1 * i}s` }}>
                  <CampaignPreview data={c} />
                </div>
              ))}
            </div>
            <div className="personal-campaign__btn-more-campaign">
              <Button type="primary" size="large">Xem thêm chiến dịch</Button>
            </div>
          </Card>
        </Container>
      </div>

      <CreateCampaignModal
        visible={createCampaignVisible}
        onClose={() => setCreateCampaignVisible(false)}
      />

    </div>
  )
}
