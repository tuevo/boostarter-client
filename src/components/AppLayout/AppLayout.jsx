import { Layout, Menu, Dropdown, Input } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import AppLogo from '../AppLogo';
import './AppLayout.scss';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';

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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input className="search-input" size="large" placeholder="Tìm kiếm chiến dịch" prefix={<SearchOutlined />} />
          <Menu mode="horizontal">
            <Menu.Item>Đăng ký</Menu.Item>
            <Menu.Item>Đăng nhập</Menu.Item>
          </Menu>
        </div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}
