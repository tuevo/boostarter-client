import { DownOutlined, EnvironmentFilled, MailFilled, PhoneFilled, SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Drawer, Dropdown, Input, Layout, List, Menu, Popover, Radio, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { mockUser1, mockUser2, mockUser4 } from '../../mock-data';
import { auth } from '../../redux';
import AppLogo from '../AppLogo';
import Container from '../Container';
import './AppLayout.scss';
import { FireOutlined, PoweroffOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item icon={<DownOutlined />} disabled>
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item disabled>
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    </Menu.Item>
    <Menu.Item danger>a danger item</Menu.Item>
  </Menu>
);

export default function AppLayout({ children }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.user.auth);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [authValue, setAuthValue] = useState(0);

  const sidebarMenu = {
    1: [
      { key: '1', title: 'Chiến dịch cá nhân', icon: <FireOutlined />, url: '/personal-campaigns' },
    ],
    2: [
      { key: '1', title: 'Chiến dịch đã quyên góp', icon: <FireOutlined />, url: '/' }
    ],
    3: [
      { key: '1', title: 'Tất cả chiến dịch', icon: <FireOutlined />, url: '/' }
    ],
  }

  const logout = () => {
    dispatch(auth(null));
    setAuthValue(0);
    history.goBack();
  }

  return (
    <Layout className="layout">
      <Header>
        <Menu mode="horizontal">
          <Menu.Item className="logo-wrapper">
            <div className="logo">
              <NavLink to="/">
                <AppLogo />
              </NavLink>
            </div>
          </Menu.Item>
          <Menu.Item>
            <Dropdown overlay={menu}>
              <div>
                Khám phá <DownOutlined />
              </div>
            </Dropdown>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/">Về chúng tôi</NavLink>
          </Menu.Item>
        </Menu>
        <div className="header-right">
          <Input className="search-input" size="large" placeholder="Tìm kiếm chiến dịch" prefix={<SearchOutlined />} />
          {!user && (<Button className="btn-register" size="large">Đăng ký</Button>)}
          <Popover
            placement="bottom"
            title={<span><b>Chế độ đăng nhập</b></span>}
            content={
              <Radio.Group
                style={{ display: 'flex', flexDirection: 'column' }}
                value={authValue}
                onChange={e => {
                  const { value } = e.target;
                  setAuthValue(value);

                  switch (value) {
                    case 0:
                      logout();
                      break;

                    case 1:
                      dispatch(auth(mockUser1));
                      break;

                    case 2:
                      dispatch(auth(mockUser4))
                      break;

                    case 3:
                      dispatch(auth(mockUser2));
                      break;

                    default:
                      break;
                  }
                }}
              >
                <Radio value={0}>Chưa đăng nhập</Radio>
                <Radio value={1}>Người vận động</Radio>
                <Radio value={2}>Người quyên góp</Radio>
                <Radio value={3}>Quản trị viên</Radio>
              </Radio.Group>
            }
            trigger="click"
          >
            {!user && (<Button className="btn-login" size="large">Đăng nhập</Button>)}
            {user && (
              <div
                className="user-menu"
                onClick={() => setSidebarVisible(true)}
              >
                <List.Item.Meta
                  avatar={<Avatar src={user.avatar} size={50} />}
                  title={<span className="user-menu__full-name">{user.fullName}</span>}
                  description={<span className="user-menu__role">{user.role.name}</span>}
                />
              </div>

            )}
          </Popover>
        </div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        {children}
      </Content>
      <Footer className="app-footer">
        <Container>
          <Row style={{ width: '100%' }}>
            <Col span={11}>
              <div className="left">
                <AppLogo />
                <p>
                  Giấy phép số 02/2018/DA-HDTS-MXH do Bộ Thông tin và Truyền thông cấp ngày 01 tháng 06 năm 2018
                    <br /><br />
                  <b>Người chịu trách nhiệm nội dung:</b>
                  <br />
                    Thượng toạ Thích Đức Thiện - Phó Chủ tịch Hội đồng trị sự Giáo hội Phật giáo Việt Nam (GHPGVN), Tổng Thư ký Hội đồng Trị sự GHPGVN.
                    <br /><br />
                    CÔNG TY CỔ PHẦN BOOSTARTER TECHNOLOGY MST: 0109011923
                  </p>
              </div>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <div className="right">
                <Title level={4}>Liên hệ</Title>
                <ul>
                  <li>
                    <PhoneFilled />
                    <span>+84 934 666 360</span>
                  </li>
                  <li>
                    <MailFilled />
                    <span>contact@boostarter.vn</span>
                  </li>
                  <li>
                    <EnvironmentFilled />
                    <span>
                      73 Quán Sứ, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội, Việt Nam
                    </span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <div className="copyright">
            © Bản quyền Boostarter.vn 2021 - Boostarter Technology.
          </div>
        </Container>
      </Footer>

      {user && (
        <Drawer
          closable
          visible={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
          width={350}
        >
          <div className="app-sidebar">
            <div className="app-sidebar__avatar">
              <Avatar src={user.avatar} size={90} />
              <Title level={4}>{user.fullName}</Title>
              <Text>{user.role.name}</Text>
            </div>
            <div className="app-sidebar__menu">
              <Menu onClick={() => setSidebarVisible(false)}>
                {sidebarMenu[user.role.value].map(item => (
                  <Menu.Item key={item.id} icon={item.icon}>
                    <NavLink to={item.url}>{item.title}</NavLink>
                  </Menu.Item>
                ))}
                <Menu.Item onClick={() => logout()} icon={<PoweroffOutlined />}>Đăng xuất</Menu.Item>
              </Menu>
            </div>
          </div>
        </Drawer>
      )}
    </Layout>
  )
}
