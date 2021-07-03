import { EnvironmentFilled, FireOutlined, HeartOutlined, MailFilled, PhoneFilled, PoweroffOutlined, DownOutlined, RocketOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Drawer, Input, Layout, List, Menu, Row, Dropdown } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { AUTH_USER } from '../../constants';
import { auth, scrollToElement } from '../../redux';
import AppLogo from '../AppLogo';
import Container from '../Container';
import NotificationMenu from '../NotificationMenu/NotificationMenu';
import './AppLayout.scss';

const { Header, Content, Footer } = Layout;

const discoveryMenuItems = [
    {
        name: 'Công nghệ & Đổi mới',
        subItems: ['Y tế', 'Giáo dục', 'Môi trường', 'Thời trang']
    },
    {
        name: 'Thiện nguyện',
        subItems: ['Hướng về miền Trung', 'Giúp trẻ em vùng cao', 'Hỗ trợ người khuyết tật', 'Bảo vệ động vật']
    },
    {
        name: 'Sáng tạo nội dung',
        subItems: ['Tìm hiểu lịch sử', 'Phản ảnh xã hội', 'Hoạt động nghệ thuật', 'Nghiên cứu khoa học']
    },
]

const menu = (
    <div className="discovery-menu">
        <div className="discovery-menu__section">
            <Menu>
                <Menu.Item>
                    <NavLink to="/"><b>Tất cả chiến dịch</b></NavLink>
                </Menu.Item>
                <Menu.Item>
                    <NavLink to="/"><b>Top 10 chiến dịch nổi bật nhất</b></NavLink>
                </Menu.Item>
                <Menu.Item>
                    <NavLink to="/"><b>Chiến dịch đã thành công</b></NavLink>
                </Menu.Item>
            </Menu>
        </div>
        {discoveryMenuItems.map(item => (
            <div key={item.name} className="discovery-menu__section">
                <Menu>
                    <Menu.Item disabled>
                        <b>{item.name}</b>
                    </Menu.Item>
                    {item.subItems.map(subItem => (
                        <Menu.Item key={subItem}>
                            <NavLink to="/">{subItem}</NavLink>
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
        ))}
    </div>
);

export default function AppLayout({ children, location }) {
    const signInLocation = {
        pathname: '/sign-in',
        state: {
            from: `${location.pathname}${location.search}`
        }
    }
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user.auth);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const sidebarMenu = {
        1: [
            { key: '1', title: 'Chiến dịch cá nhân', icon: <RocketOutlined />, url: '/personal-campaigns' },
            { key: '2', title: 'Chiến dịch đang theo dõi', icon: <HeartOutlined />, url: '/' },
        ],
        2: [
            { key: '1', title: 'Chiến dịch đã quyên góp', icon: <FireOutlined />, url: '/' },
            { key: '2', title: 'Chiến dịch đang theo dõi', icon: <HeartOutlined />, url: '/' },
        ],
        3: [
            { key: '1', title: 'Tất cả chiến dịch', icon: <FireOutlined />, url: '/' },
            { key: '2', title: 'Chiến dịch đang theo dõi', icon: <HeartOutlined />, url: '/' },
        ],
    }

    const signOut = () => {
        localStorage.removeItem(AUTH_USER);
        dispatch(auth(null));
        history.push(signInLocation);
    }

    return (
        <Layout className="layout">
            <Header>
                <Menu className="app-header-menu" mode="horizontal" onClick={e => {
                    dispatch(scrollToElement(e.key));
                    history.push('/');
                }}>
                    <Menu.Item className="logo-wrapper" key="home">
                        <div className="logo">
                            <AppLogo />
                        </div>
                    </Menu.Item>
                    <Menu.Item>
                        <Dropdown overlay={menu}>
                            <div>
                                Khám phá <DownOutlined />
                            </div>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item key="featured-service">
                        Tính năng
                    </Menu.Item>
                    <Menu.Item key="featured-campaign">
                        Chiến dịch nổi bật
                    </Menu.Item>
                    <Menu.Item key="success-campaign">
                        Chiến dịch thành công
                    </Menu.Item>
                    <Menu.Item key="featured-category">
                        Lĩnh vực
                    </Menu.Item>
                    <Menu.Item key="featured-feedback">
                        Đánh giá
                    </Menu.Item>
                    <Menu.Item key="strategic-partner">
                        Đối tác
                    </Menu.Item>
                    <Menu.Item>
                        Hướng dẫn
                    </Menu.Item>
                </Menu>
                <div className="header-right">
                    <Input className="search-input" size="large" placeholder="Tìm kiếm..." prefix={<SearchOutlined />} />
                    {!user && (
                        <Button
                            className="header-right__btn btn-login"
                            size="large"
                            onClick={() => history.push(signInLocation)}
                        >
                            Đăng nhập
                        </Button>
                    )}
                    {!user && (
                        <Button
                            className="header-right__btn btn-register"
                            size="large"
                            type="primary"
                            onClick={() => history.push('/sign-up')}
                        >
                            Đăng ký
                        </Button>
                    )}
                    {user && (
                        <div className="user-notification">
                            <NotificationMenu />
                        </div>
                    )}
                    {user && (
                        <div className="user-menu" onClick={() => setSidebarVisible(true)}>
                            <List.Item.Meta
                                avatar={<Avatar src={user.avatar} size={50} />}
                                title={<span className="user-menu__full-name">{user.fullName}</span>}
                                description={<span className="user-menu__role">{user.role.name}</span>}
                            />
                        </div>

                    )}
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
                        © Bản quyền Boostarter.web.app 2021 - Boostarter Technology.
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
                                    <Menu.Item key={item.key} icon={item.icon}>
                                        <NavLink to={item.url}>{item.title}</NavLink>
                                    </Menu.Item>
                                ))}
                                <Menu.Item onClick={() => signOut()} icon={<PoweroffOutlined />}>Đăng xuất</Menu.Item>
                            </Menu>
                        </div>
                    </div>
                </Drawer>
            )}
        </Layout>
    )
}
